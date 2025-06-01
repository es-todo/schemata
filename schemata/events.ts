import { nullable, obj, optional, type schemata, str } from "../src/types.ts";

export const event_type: schemata = {
  user_registered: obj({
    user_id: str,
    username: str,
    realname: nullable(str),
    email: str,
    password: str,
  }),
  user_realname_changed: obj({
    user_id: str,
    new_realname: nullable(str),
  }),
  user_username_changed: obj({
    user_id: str,
    new_username: str,
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
