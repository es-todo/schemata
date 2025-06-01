export type object_type =
  | { type: "email"; data: { user_id: string } }
  | { type: "username"; data: { user_id: string } }
  | {
      type: "user";
      data: { username: string; email: string; realname: string | null };
    }
  | { type: "credentials"; data: { password: string } }
  | { type: "counter"; data: { count: number } }
  | { type: "user_boards"; data: { list: Array<string> } }
  | { type: "board"; data: { user_id: string; name: string } }
  | { type: "users_ll"; data: { next: string | null } };

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

function parse_3(x: any) {
  if (x === null) return null;
  return parse_1(x);
}

function parse_2(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      username: parse_1(x.username),
      email: parse_1(x.email),
      realname: parse_3(x.realname),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_4(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      password: parse_1(x.password),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_6(x: any) {
  if (typeof x === "number") {
    return x;
  } else {
    throw new Error("not a number:" + x);
  }
}

function parse_5(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      count: parse_6(x.count),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_8(x: any) {
  if (Array.isArray(x)) {
    return x.map(parse_1);
  } else {
    throw new Error("not an array: " + x);
  }
}

function parse_7(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      list: parse_8(x.list),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_9(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      name: parse_1(x.name),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_10(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      next: parse_3(x.next),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

export function parse_object_type(x: any): object_type {
  switch (x.type) {
    case "email":
      return { type: "email", data: parse_0(x.data) };
    case "username":
      return { type: "username", data: parse_0(x.data) };
    case "user":
      return { type: "user", data: parse_2(x.data) };
    case "credentials":
      return { type: "credentials", data: parse_4(x.data) };
    case "counter":
      return { type: "counter", data: parse_5(x.data) };
    case "user_boards":
      return { type: "user_boards", data: parse_7(x.data) };
    case "board":
      return { type: "board", data: parse_9(x.data) };
    case "users_ll":
      return { type: "users_ll", data: parse_10(x.data) };
    default:
      throw new Error("not a object_type:" + x);
  }
}
