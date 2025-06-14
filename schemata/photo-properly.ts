import { arr, c, num, obj, oneof, str } from "../src/types.ts";

const transformation = oneof([
  obj({ type: c("rotate"), angle: num }),
  obj({ type: c("extract"), top: num, left: num, width: num, height: num }),
  obj({ type: c("crop-cover"), width: num, height: num }),
]);

export const photo_property = obj({
  photo_id: str,
  transformations: arr(transformation),
});
