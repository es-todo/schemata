import {
  arr,
  c,
  nullable,
  obj,
  oneof,
  optional,
  type schemata,
  str,
} from "../src/types.ts";
import { user_roles } from "./user-roles.ts";

export const event_type: schemata = {
  user_registered: obj({
    user_id: str,
    username: str,
    realname: nullable(str),
    email: str,
    password: str,
  }),
  user_roles_changed: obj({
    user_id: str,
    roles: arr(oneof(user_roles.map(c))),
  }),
  user_realname_changed: obj({
    user_id: str,
    new_realname: nullable(str),
  }),
  user_username_changed: obj({
    user_id: str,
    new_username: str,
  }),
  password_reset_code_generated: obj({
    user_id: str,
    code: str,
  }),
  password_reset_code_used: obj({
    code: str,
  }),
  user_password_changed: obj({
    user_id: str,
    password: str,
  }),
  email_confirmation_code_generated: obj({
    user_id: str,
    email: str,
    code: str,
  }),
  email_confirmation_code_received: obj({
    code: str,
  }),
  email_message_enqueued: obj({
    message_id: str,
    email: str,
    user_id: str,
    content: oneof([
      obj({ type: c("welcome_email"), code: str }),
      obj({ type: c("reset_password_email"), code: str }),
      obj({ type: c("confirm_email_email"), code: str }),
    ]),
  }),
  email_message_dequeued: obj({
    message_id: str,
    status: oneof([
      obj({ success: c(true) }),
      obj({ success: c(false), reason: optional(str) }),
    ]),
  }),
  user_email_changed: obj({
    user_id: str,
    new_email: str,
  }),
  ping: obj({}),
  board_created: obj({
    board_id: str,
    user_id: str,
    board_name: str,
  }),
  board_renamed: obj({
    board_id: str,
    board_name: str,
  }),
};
