export type event_type =
  | {
      type: "user_registered";
      data: {
        user_id: string;
        username: string;
        realname: string | null;
        email: string;
        password: string;
      };
    }
  | {
      type: "user_roles_changed";
      data: {
        user_id: string;
        roles: Array<"admin" | "automation" | "user-management">;
      };
    }
  | {
      type: "user_realname_changed";
      data: { user_id: string; new_realname: string | null };
    }
  | {
      type: "user_username_changed";
      data: { user_id: string; new_username: string };
    }
  | {
      type: "password_reset_code_generated";
      data: { user_id: string; code: string };
    }
  | {
      type: "email_confirmation_code_generated";
      data: { user_id: string; email: string; code: string };
    }
  | {
      type: "email_message_queued";
      data: {
        message_id: string;
        email: string;
        content:
          | { type: "welcome_email" }
          | { type: "reset_password_email" }
          | { type: "confirm_email_email" };
      };
    }
  | { type: "email_message_dequeued"; data: { message_id: string } }
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
    throw new Error("not a event_type: " + x);
  }
}

function parse_6(x: any) {
  if (x === "user-management") return x;
  throw new Error("not a constant_string_user-management:" + x);
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
    throw new Error("not a event_type: " + x);
  }
}

function parse_9(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      new_realname: parse_2(x.new_realname),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_10(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      new_username: parse_1(x.new_username),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_11(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_12(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      email: parse_1(x.email),
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_16(x: any) {
  if (x === "confirm_email_email") return x;
  throw new Error("not a constant_string_confirm_email_email:" + x);
}

function parse_15(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_16(x.type),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_18(x: any) {
  if (x === "reset_password_email") return x;
  throw new Error("not a constant_string_reset_password_email:" + x);
}

function parse_17(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_18(x.type),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_20(x: any) {
  if (x === "welcome_email") return x;
  throw new Error("not a constant_string_welcome_email:" + x);
}

function parse_19(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_20(x.type),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_14(x: any) {
  try {
    return parse_19(x);
  } catch (_err) {
    try {
      return parse_17(x);
    } catch (_err) {
      try {
        return parse_15(x);
      } catch (_err) {
        throw new Error("invalid oneof");
      }
    }
  }
}

function parse_13(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      message_id: parse_1(x.message_id),
      email: parse_1(x.email),
      content: parse_14(x.content),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_21(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      message_id: parse_1(x.message_id),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_22(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      new_email: parse_1(x.new_email),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_23(x: any) {
  if (typeof x === "object" && x !== null) {
    return {};
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_24(x: any) {
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

function parse_25(x: any) {
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
    case "user_roles_changed":
      return { type: "user_roles_changed", data: parse_3(x.data) };
    case "user_realname_changed":
      return { type: "user_realname_changed", data: parse_9(x.data) };
    case "user_username_changed":
      return { type: "user_username_changed", data: parse_10(x.data) };
    case "password_reset_code_generated":
      return { type: "password_reset_code_generated", data: parse_11(x.data) };
    case "email_confirmation_code_generated":
      return {
        type: "email_confirmation_code_generated",
        data: parse_12(x.data),
      };
    case "email_message_queued":
      return { type: "email_message_queued", data: parse_13(x.data) };
    case "email_message_dequeued":
      return { type: "email_message_dequeued", data: parse_21(x.data) };
    case "user_email_changed":
      return { type: "user_email_changed", data: parse_22(x.data) };
    case "ping":
      return { type: "ping", data: parse_23(x.data) };
    case "board_created":
      return { type: "board_created", data: parse_24(x.data) };
    case "board_renamed":
      return { type: "board_renamed", data: parse_25(x.data) };
    default:
      throw new Error("not a event_type:" + x);
  }
}
