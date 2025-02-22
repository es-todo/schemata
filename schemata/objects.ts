import { obj, type schemata, str } from "../src/types";

export const object_type: schemata = {
  user: obj({
    email: str,
    salted_hash: str,
  }),
};
