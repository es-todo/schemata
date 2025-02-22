export type object_type = {
  type: "user";
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
    throw new Error("not a object_type: " + x);
  }
}

export function parse_object_type(x: any): object_type {
  switch (x.type) {
    case "user":
      return { type: "user", value: parse_0(x.value) };
    default:
      throw new Error("not a object_type:" + x);
  }
}
