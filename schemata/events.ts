import { obj, type schemata, str } from "../src/types.ts";

export const event_type: schemata = {
  user_registered: obj({
    user_id: str,
    email: str,
    salted_hash: str,
  }),
};
