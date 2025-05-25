export type event_type =
  | {
      type: "user_registered";
      data: { user_id: string; email: string; password: string };
    }
  | { type: "user_name_changed"; data: { user_id: string; new_name: string } }
  | { type: "user_email_changed"; data: { user_id: string; new_email: string } }
  | { type: "ping"; data: {} }
  | {
      type: "board_created";
      data: { board_id: string; user_id: string; board_name: string };
    }
  | { type: "board_renamed"; data: { board_id: string; board_name: string } };

function parse_1(x: any) {
  if (typeof x === "string") {
    return x;
  } else {
    throw new Error("not a string:" + x);
  }
}

function parse_0(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      email: parse_1(x.email),
      password: parse_1(x.password),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_2(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      new_name: parse_1(x.new_name),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_3(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      new_email: parse_1(x.new_email),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_4(x: any) {
  if (typeof x === "object" && x !== null) {
    return {};
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_5(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      board_id: parse_1(x.board_id),
      user_id: parse_1(x.user_id),
      board_name: parse_1(x.board_name),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_6(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      board_id: parse_1(x.board_id),
      board_name: parse_1(x.board_name),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

export function parse_event_type(x: any): event_type {
  switch (x.type) {
    case "user_registered":
      return { type: "user_registered", data: parse_0(x.data) };
    case "user_name_changed":
      return { type: "user_name_changed", data: parse_2(x.data) };
    case "user_email_changed":
      return { type: "user_email_changed", data: parse_3(x.data) };
    case "ping":
      return { type: "ping", data: parse_4(x.data) };
    case "board_created":
      return { type: "board_created", data: parse_5(x.data) };
    case "board_renamed":
      return { type: "board_renamed", data: parse_6(x.data) };
    default:
      throw new Error("not a event_type:" + x);
  }
}
