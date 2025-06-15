export type object_type =
  | { type: "email"; data: { user_id: string; confirmed: boolean } }
  | { type: "username"; data: { user_id: string } }
  | { type: "username_redirect"; data: { user_id: string } }
  | {
      type: "user";
      data: {
        username: string;
        email: string;
        realname: string | null;
        profile_photo:
          | {
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
            }
          | undefined;
      };
    }
  | {
      type: "user_roles";
      data: { roles: Array<"admin" | "automation" | "profile-management"> };
    }
  | { type: "role_users"; data: { user_ids: Array<string> } }
  | { type: "credentials"; data: { password: string } }
  | {
      type: "email_confirmation_code";
      data: { user_id: string; email: string; received: boolean };
    }
  | { type: "password_reset_code"; data: { user_id: string; used: boolean } }
  | {
      type: "email_message";
      data: {
        email: string;
        user_id: string;
        content:
          | { type: "welcome_email"; code: string }
          | { type: "reset_password_email"; code: string }
          | { type: "confirm_email_email"; code: string }
          | { type: "account_email_changed_email"; new_email: string };
      };
    }
  | {
      type: "email_message_delivery_status";
      data: {
        status:
          | { type: "queued" }
          | { type: "sent" }
          | { type: "failed"; reason: string | undefined };
      };
    }
  | { type: "email_message_queue_entry"; data: { prev: string; next: string } }
  | { type: "counter"; data: { count: number } }
  | { type: "user_boards"; data: { list: Array<string> } }
  | { type: "board"; data: { user_id: string; name: string } }
  | { type: "users_ll"; data: { next: string | null } }
  | {
      type: "users_list";
      data: { user_ids: Array<string>; next: string | undefined };
    };

function parse_1(x: any) {
  if (typeof x === "string") {
    return x;
  } else {
    throw new Error("not a string:" + x);
  }
}

function parse_2(x: any) {
  if (typeof x === "boolean") {
    return x;
  } else {
    throw new Error("not a boolean:" + x);
  }
}

function parse_0(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      confirmed: parse_2(x.confirmed),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_3(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_5(x: any) {
  if (x === null) return null;
  return parse_1(x);
}

function parse_11(x: any) {
  if (x === "crop-cover") return x;
  throw new Error("not a constant_string_crop-cover:" + x);
}

function parse_12(x: any) {
  if (typeof x === "number") {
    return x;
  } else {
    throw new Error("not a number:" + x);
  }
}

function parse_10(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_11(x.type),
      width: parse_12(x.width),
      height: parse_12(x.height),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_14(x: any) {
  if (x === "extract") return x;
  throw new Error("not a constant_string_extract:" + x);
}

function parse_13(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_14(x.type),
      top: parse_12(x.top),
      left: parse_12(x.left),
      width: parse_12(x.width),
      height: parse_12(x.height),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_16(x: any) {
  if (x === "rotate") return x;
  throw new Error("not a constant_string_rotate:" + x);
}

function parse_15(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_16(x.type),
      angle: parse_12(x.angle),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_9(x: any) {
  try {
    return parse_15(x);
  } catch (_err) {
    try {
      return parse_13(x);
    } catch (_err) {
      try {
        return parse_10(x);
      } catch (_err) {
        throw new Error("invalid oneof");
      }
    }
  }
}

function parse_8(x: any) {
  if (Array.isArray(x)) {
    return x.map(parse_9);
  } else {
    throw new Error("not an array: " + x);
  }
}

function parse_7(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      photo_id: parse_1(x.photo_id),
      transformations: parse_8(x.transformations),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_6(x: any) {
  if (x === undefined) return undefined;
  return parse_7(x);
}

function parse_4(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      username: parse_1(x.username),
      email: parse_1(x.email),
      realname: parse_5(x.realname),
      profile_photo: parse_6(x.profile_photo),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_20(x: any) {
  if (x === "profile-management") return x;
  throw new Error("not a constant_string_profile-management:" + x);
}

function parse_21(x: any) {
  if (x === "automation") return x;
  throw new Error("not a constant_string_automation:" + x);
}

function parse_22(x: any) {
  if (x === "admin") return x;
  throw new Error("not a constant_string_admin:" + x);
}

function parse_19(x: any) {
  try {
    return parse_22(x);
  } catch (_err) {
    try {
      return parse_21(x);
    } catch (_err) {
      try {
        return parse_20(x);
      } catch (_err) {
        throw new Error("invalid oneof");
      }
    }
  }
}

function parse_18(x: any) {
  if (Array.isArray(x)) {
    return x.map(parse_19);
  } else {
    throw new Error("not an array: " + x);
  }
}

function parse_17(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      roles: parse_18(x.roles),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_24(x: any) {
  if (Array.isArray(x)) {
    return x.map(parse_1);
  } else {
    throw new Error("not an array: " + x);
  }
}

function parse_23(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_ids: parse_24(x.user_ids),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_25(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      password: parse_1(x.password),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_26(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      email: parse_1(x.email),
      received: parse_2(x.received),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_27(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      used: parse_2(x.used),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_31(x: any) {
  if (x === "account_email_changed_email") return x;
  throw new Error("not a constant_string_account_email_changed_email:" + x);
}

function parse_30(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_31(x.type),
      new_email: parse_1(x.new_email),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_33(x: any) {
  if (x === "confirm_email_email") return x;
  throw new Error("not a constant_string_confirm_email_email:" + x);
}

function parse_32(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_33(x.type),
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_35(x: any) {
  if (x === "reset_password_email") return x;
  throw new Error("not a constant_string_reset_password_email:" + x);
}

function parse_34(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_35(x.type),
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_37(x: any) {
  if (x === "welcome_email") return x;
  throw new Error("not a constant_string_welcome_email:" + x);
}

function parse_36(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_37(x.type),
      code: parse_1(x.code),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_29(x: any) {
  try {
    return parse_36(x);
  } catch (_err) {
    try {
      return parse_34(x);
    } catch (_err) {
      try {
        return parse_32(x);
      } catch (_err) {
        try {
          return parse_30(x);
        } catch (_err) {
          throw new Error("invalid oneof");
        }
      }
    }
  }
}

function parse_28(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      email: parse_1(x.email),
      user_id: parse_1(x.user_id),
      content: parse_29(x.content),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_41(x: any) {
  if (x === "failed") return x;
  throw new Error("not a constant_string_failed:" + x);
}

function parse_42(x: any) {
  if (x === undefined) return undefined;
  return parse_1(x);
}

function parse_40(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_41(x.type),
      reason: parse_42(x.reason),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_44(x: any) {
  if (x === "sent") return x;
  throw new Error("not a constant_string_sent:" + x);
}

function parse_43(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_44(x.type),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_46(x: any) {
  if (x === "queued") return x;
  throw new Error("not a constant_string_queued:" + x);
}

function parse_45(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      type: parse_46(x.type),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_39(x: any) {
  try {
    return parse_45(x);
  } catch (_err) {
    try {
      return parse_43(x);
    } catch (_err) {
      try {
        return parse_40(x);
      } catch (_err) {
        throw new Error("invalid oneof");
      }
    }
  }
}

function parse_38(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      status: parse_39(x.status),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_47(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      prev: parse_1(x.prev),
      next: parse_1(x.next),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_48(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      count: parse_12(x.count),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_49(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      list: parse_24(x.list),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_50(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_id: parse_1(x.user_id),
      name: parse_1(x.name),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_51(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      next: parse_5(x.next),
    };
  } else {
    throw new Error("not a object_type: " + x);
  }
}

function parse_52(x: any) {
  if (typeof x === "object" && x !== null) {
    return {
      user_ids: parse_24(x.user_ids),
      next: parse_42(x.next),
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
      return { type: "username", data: parse_3(x.data) };
    case "username_redirect":
      return { type: "username_redirect", data: parse_3(x.data) };
    case "user":
      return { type: "user", data: parse_4(x.data) };
    case "user_roles":
      return { type: "user_roles", data: parse_17(x.data) };
    case "role_users":
      return { type: "role_users", data: parse_23(x.data) };
    case "credentials":
      return { type: "credentials", data: parse_25(x.data) };
    case "email_confirmation_code":
      return { type: "email_confirmation_code", data: parse_26(x.data) };
    case "password_reset_code":
      return { type: "password_reset_code", data: parse_27(x.data) };
    case "email_message":
      return { type: "email_message", data: parse_28(x.data) };
    case "email_message_delivery_status":
      return { type: "email_message_delivery_status", data: parse_38(x.data) };
    case "email_message_queue_entry":
      return { type: "email_message_queue_entry", data: parse_47(x.data) };
    case "counter":
      return { type: "counter", data: parse_48(x.data) };
    case "user_boards":
      return { type: "user_boards", data: parse_49(x.data) };
    case "board":
      return { type: "board", data: parse_50(x.data) };
    case "users_ll":
      return { type: "users_ll", data: parse_51(x.data) };
    case "users_list":
      return { type: "users_list", data: parse_52(x.data) };
    default:
      throw new Error("not a object_type:" + x);
  }
}
