import {
  arr,
  c,
  nullable,
  obj,
  oneof,
  type schemata,
  str,
} from "../src/types.ts";
import { user_roles } from "./user-roles.ts";

export const command_type: schemata = {
  register: obj({
    user_id: str,
    username: str,
    realname: nullable(str),
    email: str,
    password: str,
  }),
  change_user_roles: obj({
    user_id: str,
    roles: arr(oneof(user_roles.map(c))),
  }),
  change_username: obj({
    new_username: str,
  }),
  change_realname: obj({
    new_realname: nullable(str),
  }),
  change_email: obj({
    new_email: str,
  }),
  receive_email_confirmation_code: obj({
    code: str,
  }),
  dequeue_email_message: obj({
    message_id: str,
  }),
  ping: obj({}),
  create_board: obj({
    board_id: str,
    board_name: str,
  }),
  rename_board: obj({
    board_id: str,
    board_name: str,
  }),
};
