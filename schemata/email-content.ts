import { c, obj, oneof, str } from "../src/types.ts";

export const email_content = oneof([
  obj({ type: c("welcome_email"), code: str }),
  obj({ type: c("reset_password_email"), code: str }),
  obj({ type: c("confirm_email_email"), code: str }),
  obj({ type: c("account_email_changed_email"), new_email: str }),
  obj({ type: c("username_changed_email"), old_username: str }),
  //obj({ type: c("manual_onboarding_email"), password: str }),
]);
