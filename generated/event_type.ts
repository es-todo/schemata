export type event_type =
  | {
      type: "user_registered";
      data: { user_id: string; email: string; salted_hash: string };
    }
  | { type: "user_email_changed"; data: { user_id: string; new_email: string } }
  | { type: "ping"; data: {} };

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
      salted_hash: parse_1(x.salted_hash),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_2(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      new_email: parse_1(x.new_email),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_3(x: any) {
  if (typeof x === "object" && x !== null) {
    return {};
  } else {
    throw new Error("not a event_type: " + x);
  }
}

export function parse_event_type(x: any): event_type {
  switch (x.type) {
    case "user_registered":
      return { type: "user_registered", data: parse_0(x.data) };
    case "user_email_changed":
      return { type: "user_email_changed", data: parse_2(x.data) };
    case "ping":
      return { type: "ping", data: parse_3(x.data) };
    default:
      throw new Error("not a event_type:" + x);
  }
}
