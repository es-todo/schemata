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
import { photo_property } from "./photo-properly.ts";
import { user_roles } from "./user-roles.ts";

export const command_type: schemata = {
  register: obj({
    user_id: str,
    username: str,
    realname: nullable(str),
    email: str,
    password: nullable(str),
  }),
  change_user_roles: obj({
    user_id: str,
    roles: arr(oneof(user_roles.map(c))),
  }),
  change_username: obj({
    user_id: optional(str),
    new_username: str,
  }),
  change_realname: obj({
    user_id: optional(str),
    new_realname: nullable(str),
  }),
  change_email: obj({
    user_id: optional(str),
    old_email_message_id: str, // to be used for tracking the email messages
    new_email_message_id: str, // sent to the old and new emails
    new_email: str,
  }),
  receive_email_confirmation_code: obj({
    code: str,
  }),
  dequeue_email_message: obj({
    message_id: str,
    status: oneof([
      obj({ success: c(true) }),
      obj({ success: c(false), reason: optional(str) }),
    ]),
  }),
  request_password_reset_code: obj({
    message_id: str, // for tracking on webapp
    email_or_username: str,
  }),
  reset_password_with_code: obj({
    code: str,
    new_password: str,
  }),
  update_user_profile_photo: obj({
    user_id: optional(str),
    photo: nullable(photo_property),
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
