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
        return "boolean";
      case "array":
        return `Array<${generate_type(schemata.element)}>`;
      case "object":
        return `{ ${Object.entries(schemata.entries)
          .map(([key, val]) => `${key}: ${generate_type(val)}`)
          .join(", ")} }`;
      case "nullable":
        return `(${generate_type(schemata.object)}) | null`;
      case "optional":
        return `(${generate_type(schemata.object)}) | undefined`;
      case "constant":
        return JSON.stringify(schemata.constant);
      case "oneof":
        return schemata.options
          .map(generate_type)
          .map((x) => `(${x})`)
          .join(" | ");
      default:
        const invalid: never = schemata;
        throw invalid;
    }
  }
  function generate_schemata(schemata: schemata): string {
    return Object.entries(schemata)
      .map(
        ([name, schemata]) =>
          `{ type: "${name}", data: ${generate_type(schemata)} }`
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

  function gen_constant_checker(constant: string | number | boolean) {
    const type = `constant_${typeof constant}_${constant}`;
    const x = checkers[type];
    if (x) {
      return x.name;
    } else {
      const i = counter++;
      const fname = `parse_${i}`;
      const code = `
        function ${fname}(x: any) {
          if (x === ${JSON.stringify(constant)}) return x;
          throw new Error("not a ${type}:" + x);
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

  function gen_array_checker(element: object_schemata) {
    const type = JSON.stringify([element]);
    const x = checkers[type];
    if (x) {
      return x.name;
    } else {
      const i = counter++;
      const fname = `parse_${i}`;
      const code = `
        function ${fname}(x: any) {
          if (Array.isArray(x)) {
            return x.map(${gen_checker(element)});
          } else {
            throw new Error("not an array: " + x);
          }
        }
      `;
      checkers[type] = { name: fname, code };
      return fname;
    }
  }

  function gen_nullable_checker(object: object_schemata) {
    const type = `nullable(${JSON.stringify(object)})`;
    const x = checkers[type];
    if (x) {
      return x.name;
    } else {
      const i = counter++;
      const fname = `parse_${i}`;
      const code = `
        function ${fname}(x: any) {
          if (x === null) return null;
          return ${gen_checker(object)}(x);
        }
      `;
      checkers[type] = { name: fname, code };
      return fname;
    }
  }

  function gen_optional_checker(object: object_schemata) {
    const type = `optional(${JSON.stringify(object)})`;
    const x = checkers[type];
    if (x) {
      return x.name;
    } else {
      const i = counter++;
      const fname = `parse_${i}`;
      const code = `
        function ${fname}(x: any) {
          if (x === undefined) return undefined;
          return ${gen_checker(object)}(x);
        }
      `;
      checkers[type] = { name: fname, code };
      return fname;
    }
  }

  function gen_one_of_checker(options: object_schemata[]) {
    const type = `oneof(${JSON.stringify(options)})`;
    const x = checkers[type];
    if (x) {
      return x.name;
    } else {
      const i = counter++;
      const fname = `parse_${i}`;
      const body = options.reduceRight<string>((ac, option) => {
        return `
          try { 
            return ${gen_checker(option)}(x);
          } catch (_err) {
            ${ac}
          }
          `;
      }, `throw new Error("invalid oneof");`);
      const code = `
        function ${fname}(x: any) {
          ${body}
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
      case "array":
        return gen_array_checker(schemata.element);
      case "nullable":
        return gen_nullable_checker(schemata.object);
      case "optional":
        return gen_optional_checker(schemata.object);
      case "constant":
        return gen_constant_checker(schemata.constant);
      case "oneof":
        return gen_one_of_checker(schemata.options);
      default:
        const invalid: never = schemata;
        throw invalid;
    }
  }

  function generate_case(name: string, schemata: object_schemata): string {
    return `case "${name}":
        return { type: "${name}", data: ${gen_checker(schemata)}(x.data) };`;
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
