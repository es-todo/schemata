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
  | {
      type: "change_user_roles";
      data: {
        user_id: string;
        roles: Array<"admin" | "automation" | "profile-management">;
      };
    }
  | {
      type: "change_username";
      data: { user_id: string | undefined; new_username: string };
    }
  | {
      type: "change_realname";
      data: { user_id: string | undefined; new_realname: string | null };
    }
  | {
      type: "change_email";
      data: {
        user_id: string | undefined;
        message_id: string;
        new_email: string;
      };
    }
  | { type: "receive_email_confirmation_code"; data: { code: string } }
  | {
      type: "dequeue_email_message";
      data: {
        message_id: string;
        status:
          | { success: true }
          | { success: false; reason: string | undefined };
      };
    }
  | {
      type: "request_password_reset_code";
      data: { message_id: string; email_or_username: string };
    }
  | {
      type: "reset_password_with_code";
      data: { code: string; new_password: string };
    }
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

function parse_6(x: any) {
  if (x === "profile-management") return x;
  throw new Error("not a constant_string_profile-management:" + x);
}

function parse_7(x: any) {
  if (x === "automation") return x;
  throw new Error("not a constant_string_automation:" + x);
}

function parse_8(x: any) {
  if (x === "admin") return x;
  throw new Error("not a constant_string_admin:" + x);
}

function parse_5(x: any) {
  try {
    return parse_8(x);
  } catch (_err) {
    try {
      return parse_7(x);
    } catch (_err) {
      try {
        return parse_6(x);
      } catch (_err) {
        throw new Error("invalid oneof");
      }
    }
  }
}

function parse_4(x: any) {
  if (Array.isArray(x)) {
    return x.map(parse_5);
  } else {
    throw new Error("not an array: " + x);
  }
}

function parse_3(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      roles: parse_4(x.roles),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_10(x: any) {
  if (x === undefined) return undefined;
  return parse_1(x);
}

function parse_9(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_10(x.user_id),
      new_username: parse_1(x.new_username),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_11(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_10(x.user_id),
      new_realname: parse_2(x.new_realname),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_12(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_10(x.user_id),
      message_id: parse_1(x.message_id),
      new_email: parse_1(x.new_email),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_13(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_17(x: any) {
  if (x === false) return x;
  throw new Error("not a constant_boolean_false:" + x);
}

function parse_16(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      success: parse_17(x.success),
      reason: parse_10(x.reason),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_19(x: any) {
  if (x === true) return x;
  throw new Error("not a constant_boolean_true:" + x);
}

function parse_18(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      success: parse_19(x.success),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_15(x: any) {
  try {
    return parse_18(x);
  } catch (_err) {
    try {
      return parse_16(x);
    } catch (_err) {
      throw new Error("invalid oneof");
    }
  }
}

function parse_14(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      message_id: parse_1(x.message_id),
      status: parse_15(x.status),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_20(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      message_id: parse_1(x.message_id),
      email_or_username: parse_1(x.email_or_username),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_21(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      code: parse_1(x.code),
      new_password: parse_1(x.new_password),
    };
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_22(x: any) {
  if (typeof x === "object" && x !== null) {
    return {};
  } else {
    throw new Error("not a command_type: " + x);
  }
}

function parse_23(x: any) {
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
    case "change_user_roles":
      return { type: "change_user_roles", data: parse_3(x.data) };
    case "change_username":
      return { type: "change_username", data: parse_9(x.data) };
    case "change_realname":
      return { type: "change_realname", data: parse_11(x.data) };
    case "change_email":
      return { type: "change_email", data: parse_12(x.data) };
    case "receive_email_confirmation_code":
      return {
        type: "receive_email_confirmation_code",
        data: parse_13(x.data),
      };
    case "dequeue_email_message":
      return { type: "dequeue_email_message", data: parse_14(x.data) };
    case "request_password_reset_code":
      return { type: "request_password_reset_code", data: parse_20(x.data) };
    case "reset_password_with_code":
      return { type: "reset_password_with_code", data: parse_21(x.data) };
    case "ping":
      return { type: "ping", data: parse_22(x.data) };
    case "create_board":
      return { type: "create_board", data: parse_23(x.data) };
    case "rename_board":
      return { type: "rename_board", data: parse_23(x.data) };
    default:
      throw new Error("not a command_type:" + x);
  }
}
