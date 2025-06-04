import {
  obj,
  type schemata,
  str,
  num,
  arr,
  nullable,
  oneof,
  c,
} from "../src/types.ts";
import { user_roles } from "./user-roles.ts";

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
  user_roles: obj({
    roles: arr(oneof(user_roles.map(c))),
  }),
  role_users: obj({
    user_ids: arr(str),
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
