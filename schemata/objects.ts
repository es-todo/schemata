import { obj, type schemata, str, num, arr } from "../src/types.ts";

export const object_type: schemata = {
  email: obj({
    user_id: str,
  }),
  user: obj({
    email: str,
  }),
  credentials: obj({
    password: str,
  }),
  counter: obj({
    count: num,
  }),
  user_boards: arr(str),
  board: obj({
    user_id: str,
    name: str,
  }),
};
