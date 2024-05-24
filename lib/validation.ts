import { z } from "zod";

export const questionFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(130, { message: "Must be 5 or fewer characters long" }),
  explanation: z
    .string()
    .min(100, { message: "Must be 100 or more characters long" }),
  tags: z
    .array(
      z
        .string()
        .min(3, { message: "Must be 3 or more characters long" })
        .max(15, { message: "Must be 15 or fewer characters long" })
    )
    .min(1, { message: "You need add atleast 1 tag" })
    .max(3, { message: "Must be 3 or fewer tags" }),
});
