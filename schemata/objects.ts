import { obj, type schemata, str, num, arr, nullable } from "../src/types.ts";

export const object_type: schemata = {
  email: obj({
    user_id: str,
  }),
  username: obj({
    user_id: str,
  }),
  user: obj({
    username: str,
    email: str,
    realname: nullable(str),
  }),
  credentials: obj({
    password: str,
  }),
  counter: obj({
    count: num,
  }),
  user_boards: obj({
    list: arr(str),
  }),
  board: obj({
    user_id: str,
    name: str,
  }),
  users_ll: obj({
    next: nullable(str),
  }),
};
