export type object_type =
  | { type: "email"; data: { user_id: string } }
  | { type: "user"; data: { email: string } }
  | { type: "credentials"; data: { password: string } }
  | { type: "counter"; data: { count: number } };

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
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_2(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      email: parse_1(x.email),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_3(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      password: parse_1(x.password),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_5(x: any) {
  if (typeof x === "number") {
    return x;
  } else {
    throw new Error("not a number:" + x);
  }
}

function parse_4(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      count: parse_5(x.count),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

export function parse_object_type(x: any): object_type {
  switch (x.type) {
    case "email":
      return { type: "email", data: parse_0(x.data) };
    case "user":
      return { type: "user", data: parse_2(x.data) };
    case "credentials":
      return { type: "credentials", data: parse_3(x.data) };
    case "counter":
      return { type: "counter", data: parse_4(x.data) };
    default:
      throw new Error("not a object_type:" + x);
  }
}
