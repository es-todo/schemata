import { obj, type schemata, str } from "../src/types";

export const command_type: schemata = {
  register: obj({
    email: str,
    salted_hash: str,
  }),
};
