export type object_schemata =
  | { type: "number" }
  | { type: "string" }
  | { type: "boolean" }
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
