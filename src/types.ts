export type object_schemata =
  | { type: "number" }
  | { type: "string" }
  | { type: "boolean" }
  | { type: "constant"; constant: string | number }
  | { type: "oneof"; options: object_schemata[] }
  | { type: "nullable"; object: object_schemata }
  | { type: "optional"; object: object_schemata }
  | { type: "array"; element: object_schemata }
  | { type: "object"; entries: Record<string, object_schemata> };

export type schemata = Record<string, object_schemata>;

export const obj: (
  entries: Record<string, object_schemata>
) => object_schemata = (entries) => ({ type: "object", entries });

export const str: object_schemata = { type: "string" };

export const num: object_schemata = { type: "number" };

export const arr: (element: object_schemata) => object_schemata = (
  element
) => ({ type: "array", element });

export const nullable: (object: object_schemata) => object_schemata = (
  object
) => ({ type: "nullable", object });

export const optional: (object: object_schemata) => object_schemata = (
  object
) => ({ type: "optional", object });

export const c: (constant: string | number) => object_schemata = (
  constant
) => ({ type: "constant", constant });

export const oneof: (options: object_schemata[]) => object_schemata = (
  options
) => ({ type: "oneof", options });
