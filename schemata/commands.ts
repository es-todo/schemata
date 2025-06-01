import { nullable, obj, optional, type schemata, str } from "../src/types.ts";

export const command_type: schemata = {
  register: obj({
    user_id: str,
    username: str,
    realname: nullable(str),
    email: str,
    password: str,
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
