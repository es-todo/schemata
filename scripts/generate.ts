#!/usr/bin/env node

import { command_type } from "../schemata/commands.ts";
import { event_type } from "../schemata/events.ts";
import { object_type } from "../schemata/objects.ts";
import { type object_schemata, type schemata } from "../src/types.ts";
import fs from "node:fs/promises";
import prettier from "prettier";

function generate_type_string(name: string, schemata: schemata): string {
  function generate_type(schemata: object_schemata): string {
    switch (schemata.type) {
      case "string":
        return "string";
      case "number":
        return "number";
      case "boolean":
        return "bool";
      case "array":
        return `Array<${generate_type(schemata.element)}>`;
      case "object":
        return `{ ${Object.entries(schemata.entries)
          .map(([key, val]) => `${key}: ${generate_type(val)}`)
          .join(", ")} }`;
    }
  }
  function generate_schemata(schemata: schemata): string {
    return Object.entries(schemata)
      .map(
        ([name, schemata]) =>
          `{ type: "${name}", value: ${generate_type(schemata)} }`
      )
      .join(" | ");
  }
  return `export type ${name} = ${generate_schemata(schemata)};\n`;
}

function generate_checker_string(name: string, schemata: schemata): string {
  const checkers: Record<string, { name: string; code: string }> = {};
  let counter = 0;
  function gen_basic_checker(type: string) {
    const x = checkers[type];
    if (x) {
      return x.name;
    } else {
      const i = counter++;
      const fname = `parse_${i}`;
      const code = `
        function ${fname}(x: any) {
          if (typeof x === "${type}") {
            return x;
          } else {
            throw new Error("not a ${type}:" + x);
          }
        }
      `;
      checkers[type] = { name: fname, code };
      return fname;
    }
  }
  function gen_object_checker(entries: Record<string, object_schemata>) {
    const type = JSON.stringify(entries);
    const x = checkers[type];
    if (x) {
      return x.name;
    } else {
      const i = counter++;
      const fname = `parse_${i}`;
      const code = `
        function ${fname}(x: any) {
          if (typeof x === "object" && x !== null) {
            return {
              ${Object.entries(entries)
                .map(([key, val]) => `"${key}": ${gen_checker(val)}(x.${key}),`)
                .join("\n")}
            };
          } else {
            throw new Error("not a ${name}: " + x);
          }
        }
      `;
      checkers[type] = { name: fname, code };
      return fname;
    }
  }

  function gen_checker(schemata: object_schemata): string {
    switch (schemata.type) {
      case "string":
        return gen_basic_checker("string");
      case "number":
        return gen_basic_checker("number");
      case "boolean":
        return gen_basic_checker("boolean");
      case "object":
        return gen_object_checker(schemata.entries);
      default:
        throw new Error(`not yet for ${schemata.type}`);
    }
  }
  function generate_case(name: string, schemata: object_schemata): string {
    return `case "${name}":
        return { type: "${name}", value: ${gen_checker(schemata)}(x.value) };`;
  }
  const f = `
    export function parse_${name}(x: any): ${name}  {
      switch (x.type) {
        ${Object.entries(schemata)
          .map(([key, val]) => generate_case(key, val))
          .join("\n")}
        default:
          throw new Error("not a ${name}:" + x);
      }
    }
  `;
  return `
    ${Object.values(checkers)
      .map((x) => x.code)
      .join("\n")}
    ${f}
  `;
}

async function generate(name: string, schemata: schemata, filename: string) {
  const typestr = generate_type_string(name, schemata);
  const checkerstr = generate_checker_string(name, schemata);
  const source = `${typestr} ${checkerstr}`;
  const pretty = await prettier.format(source, {
    parser: "typescript",
  });
  await fs.writeFile(filename, pretty);
}

const entries = {
  command_type,
  event_type,
  object_type,
};

Promise.all(
  Object.entries(entries).map(([name, schemata]) =>
    generate(name, schemata, `./generated/${name}.ts`)
  )
).then(() => console.log("done!"));
