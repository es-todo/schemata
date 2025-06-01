export type command_type =
  | {
      type: "register";
      data: {
        user_id: string;
        username: string;
        realname: string | null;
        email: string;
        password: string;
      };
    }
  | { type: "change_username"; data: { new_username: string } }
  | { type: "change_realname"; data: { new_realname: string | null } }
  | { type: "change_email"; data: { new_email: string } }
  | { type: "ping"; data: {} }
  | { type: "create_board"; data: { board_id: string; board_name: string } }
  | { type: "rename_board"; data: { board_id: string; board_name: string } };

function parse_1(x: any) {
  if (typeof x === "string") {
    return x;
  } else {
    throw new Error("not a string:" + x);
  }
}

function parse_2(x: any) {
  if (x === null) return null;
  return parse_1(x);
}

function parse_0(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      username: parse_1(x.username),
      realname: parse_2(x.realname),
      email: parse_1(x.email),
      password: parse_1(x.password),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_3(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      new_username: parse_1(x.new_username),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_4(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      new_realname: parse_2(x.new_realname),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_5(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      new_email: parse_1(x.new_email),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_6(x: any) {
  if (typeof x === "object" && x !== null) {
    return {};
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_7(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      board_id: parse_1(x.board_id),
      board_name: parse_1(x.board_name),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

export function parse_command_type(x: any): command_type {
  switch (x.type) {
    case "register":
      return { type: "register", data: parse_0(x.data) };
    case "change_username":
      return { type: "change_username", data: parse_3(x.data) };
    case "change_realname":
      return { type: "change_realname", data: parse_4(x.data) };
    case "change_email":
      return { type: "change_email", data: parse_5(x.data) };
    case "ping":
      return { type: "ping", data: parse_6(x.data) };
    case "create_board":
      return { type: "create_board", data: parse_7(x.data) };
    case "rename_board":
      return { type: "rename_board", data: parse_7(x.data) };
    default:
      throw new Error("not a command_type:" + x);
  }
}
