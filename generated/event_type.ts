export type event_type =
  | {
      type: "user_registered";
      data: {
        user_id: string;
        username: string;
        realname: string | null;
        email: string;
        password: string | null;
      };
    }
  | {
      type: "user_roles_changed";
      data: {
        user_id: string;
        roles: Array<"admin" | "automation" | "profile-management">;
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
  | { type: "password_reset_code_used"; data: { code: string } }
  | {
      type: "user_password_changed";
      data: { user_id: string; password: string };
    }
  | {
      type: "email_confirmation_code_generated";
      data: { user_id: string; email: string; code: string };
    }
  | { type: "email_confirmation_code_received"; data: { code: string } }
  | {
      type: "email_message_enqueued";
      data: {
        message_id: string;
        email: string;
        user_id: string;
        content:
          | { type: "welcome_email"; code: string }
          | { type: "reset_password_email"; code: string }
          | { type: "confirm_email_email"; code: string }
          | { type: "account_email_changed_email"; new_email: string }
          | { type: "username_changed_email"; old_username: string }
          | { type: "manual_onboarding_email"; code: string };
      };
    }
  | {
      type: "email_message_dequeued";
      data: {
        message_id: string;
        status:
          | { success: true }
          | { success: false; reason: string | undefined };
      };
    }
  | { type: "user_email_changed"; data: { user_id: string; new_email: string } }
  | {
      type: "user_profile_photo_updated";
      data: {
        user_id: string;
        photo: {
          photo_id: string;
          transformations: Array<
            | { type: "rotate"; angle: number }
            | {
                type: "extract";
                top: number;
                left: number;
                width: number;
                height: number;
              }
            | { type: "crop-cover"; width: number; height: number }
          >;
        } | null;
      };
    }
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
      password: parse_2(x.password),
    };
  } else {
    throw new Error("not a event_type: " + x);
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
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_13(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      password: parse_1(x.password),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_14(x: any) {
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

function parse_18(x: any) {
  if (x === "manual_onboarding_email") return x;
  throw new Error("not a constant_string_manual_onboarding_email:" + x);
}

function parse_17(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_18(x.type),
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_20(x: any) {
  if (x === "username_changed_email") return x;
  throw new Error("not a constant_string_username_changed_email:" + x);
}

function parse_19(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_20(x.type),
      old_username: parse_1(x.old_username),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_22(x: any) {
  if (x === "account_email_changed_email") return x;
  throw new Error("not a constant_string_account_email_changed_email:" + x);
}

function parse_21(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_22(x.type),
      new_email: parse_1(x.new_email),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_24(x: any) {
  if (x === "confirm_email_email") return x;
  throw new Error("not a constant_string_confirm_email_email:" + x);
}

function parse_23(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_24(x.type),
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_26(x: any) {
  if (x === "reset_password_email") return x;
  throw new Error("not a constant_string_reset_password_email:" + x);
}

function parse_25(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_26(x.type),
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_28(x: any) {
  if (x === "welcome_email") return x;
  throw new Error("not a constant_string_welcome_email:" + x);
}

function parse_27(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_28(x.type),
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_16(x: any) {
  try {
    return parse_27(x);
  } catch (_err) {
    try {
      return parse_25(x);
    } catch (_err) {
      try {
        return parse_23(x);
      } catch (_err) {
        try {
          return parse_21(x);
        } catch (_err) {
          try {
            return parse_19(x);
          } catch (_err) {
            try {
              return parse_17(x);
            } catch (_err) {
              throw new Error("invalid oneof");
            }
          }
        }
      }
    }
  }
}

function parse_15(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      message_id: parse_1(x.message_id),
      email: parse_1(x.email),
      user_id: parse_1(x.user_id),
      content: parse_16(x.content),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_32(x: any) {
  if (x === false) return x;
  throw new Error("not a constant_boolean_false:" + x);
}

function parse_33(x: any) {
  if (x === undefined) return undefined;
  return parse_1(x);
}

function parse_31(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      success: parse_32(x.success),
      reason: parse_33(x.reason),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_35(x: any) {
  if (x === true) return x;
  throw new Error("not a constant_boolean_true:" + x);
}

function parse_34(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      success: parse_35(x.success),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_30(x: any) {
  try {
    return parse_34(x);
  } catch (_err) {
    try {
      return parse_31(x);
    } catch (_err) {
      throw new Error("invalid oneof");
    }
  }
}

function parse_29(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      message_id: parse_1(x.message_id),
      status: parse_30(x.status),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_36(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      new_email: parse_1(x.new_email),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_43(x: any) {
  if (x === "crop-cover") return x;
  throw new Error("not a constant_string_crop-cover:" + x);
}

function parse_44(x: any) {
  if (typeof x === "number") {
    return x;
  } else {
    throw new Error("not a number:" + x);
  }
}

function parse_42(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_43(x.type),
      width: parse_44(x.width),
      height: parse_44(x.height),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_46(x: any) {
  if (x === "extract") return x;
  throw new Error("not a constant_string_extract:" + x);
}

function parse_45(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_46(x.type),
      top: parse_44(x.top),
      left: parse_44(x.left),
      width: parse_44(x.width),
      height: parse_44(x.height),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_48(x: any) {
  if (x === "rotate") return x;
  throw new Error("not a constant_string_rotate:" + x);
}

function parse_47(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_48(x.type),
      angle: parse_44(x.angle),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_41(x: any) {
  try {
    return parse_47(x);
  } catch (_err) {
    try {
      return parse_45(x);
    } catch (_err) {
      try {
        return parse_42(x);
      } catch (_err) {
        throw new Error("invalid oneof");
      }
    }
  }
}

function parse_40(x: any) {
  if (Array.isArray(x)) {
    return x.map(parse_41);
  } else {
    throw new Error("not an array: " + x);
  }
}

function parse_39(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      photo_id: parse_1(x.photo_id),
      transformations: parse_40(x.transformations),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_38(x: any) {
  if (x === null) return null;
  return parse_39(x);
}

function parse_37(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      photo: parse_38(x.photo),
    };
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_49(x: any) {
  if (typeof x === "object" && x !== null) {
    return {};
  } else {
    throw new Error("not a event_type: " + x);
  }
}

function parse_50(x: any) {
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

function parse_51(x: any) {
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
    case "password_reset_code_used":
      return { type: "password_reset_code_used", data: parse_12(x.data) };
    case "user_password_changed":
      return { type: "user_password_changed", data: parse_13(x.data) };
    case "email_confirmation_code_generated":
      return {
        type: "email_confirmation_code_generated",
        data: parse_14(x.data),
      };
    case "email_confirmation_code_received":
      return {
        type: "email_confirmation_code_received",
        data: parse_12(x.data),
      };
    case "email_message_enqueued":
      return { type: "email_message_enqueued", data: parse_15(x.data) };
    case "email_message_dequeued":
      return { type: "email_message_dequeued", data: parse_29(x.data) };
    case "user_email_changed":
      return { type: "user_email_changed", data: parse_36(x.data) };
    case "user_profile_photo_updated":
      return { type: "user_profile_photo_updated", data: parse_37(x.data) };
    case "ping":
      return { type: "ping", data: parse_49(x.data) };
    case "board_created":
      return { type: "board_created", data: parse_50(x.data) };
    case "board_renamed":
      return { type: "board_renamed", data: parse_51(x.data) };
    default:
      throw new Error("not a event_type:" + x);
  }
}
