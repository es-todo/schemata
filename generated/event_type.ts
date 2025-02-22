export type event_type = {
  type: "user_registered";
  value: { email: string; salted_hash: string };
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
      email: parse_1(x.email),
      salted_hash: parse_1(x.salted_hash),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

export function parse_event_type(x: any): event_type {
  switch (x.type) {
    case "user_registered":
      return { type: "user_registered", value: parse_0(x.value) };
    default:
      throw new Error("not a event_type:" + x);
  }
}
