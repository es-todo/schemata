import {
  obj,
  type schemata,
  str,
  num,
  arr,
  nullable,
  oneof,
  c,
  bool,
  optional,
} from "../src/types.ts";
import { email_content } from "./email-content.ts";
import { user_roles } from "./user-roles.ts";

export const object_type: schemata = {
  // key: email
  email: obj({
    user_id: str,
    confirmed: bool,
  }),
  username: obj({
    user_id: str,
  }),
  // when a user changes their username, we still want to map the old
  // username to the user, until somebody claims the new username.
  username_redirect: obj({
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
  // key: code
  email_confirmation_code: obj({
    user_id: str,
    email: str,
    received: bool,
  }),
  // key: code
  password_reset_code: obj({
    user_id: str,
    used: bool,
  }),
  // key: message_id
  email_message: obj({
    email: str,
    user_id: str,
    content: email_content,
  }),
  // key: message_id
  email_message_delivery_status: obj({
    status: oneof([
      obj({ type: c("queued") }),
      obj({ type: c("sent") }),
      obj({ type: c("failed"), reason: optional(str) }),
    ]),
  }),
  // key: message_id | "*"
  email_message_queue_entry: obj({
    prev: str,
    next: str,
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
