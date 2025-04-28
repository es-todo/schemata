import { obj, type schemata, str, num } from "../src/types.ts";

export const object_type: schemata = {
  email: obj({
    user_id: str,
  }),
  user: obj({
    email: str,
    salted_hash: str,
  }),
  counter: obj({
    count: num,
  }),
};
