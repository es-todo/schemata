import { arr, obj, type schemata, str } from "../src/types.ts";

export const event_type: schemata = {
  user_registered: obj({
    user_id: str,
    email: str,
    password: str,
  }),
  user_name_changed: obj({
    user_id: str,
    new_name: str,
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
