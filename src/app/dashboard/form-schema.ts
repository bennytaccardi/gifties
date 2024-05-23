import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name is required",
    })
    .trim()
    .max(50),
  url: z.string().url().trim().optional(),
  description: z
    .string()
    .min(2, {
      message: "Description is required",
    })
    .trim()
    .max(100),
  tags: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  profileImage: z.string().min(0).trim().optional(),
});
