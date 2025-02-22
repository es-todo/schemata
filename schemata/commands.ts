import { obj, type schemata, str } from "../src/types.ts";

export const command_type: schemata = {
  register: obj({
    email: str,
    salted_hash: str,
  }),
};
