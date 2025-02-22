export type command_type = {
  type: "register";
  value: { user_id: string; email: string; salted_hash: string };
};

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
    throw new Error("not a command_type: " + x);
  }
}

export function parse_command_type(x: any): command_type {
  switch (x.type) {
    case "register":
      return { type: "register", value: parse_0(x.value) };
    default:
      throw new Error("not a command_type:" + x);
  }
}
