import * as z from "zod";

export const nameValidator = z
  .string()
  .min(1, "The field is required")
  .refine( name =>
    !/[!@#$%^&*(),.?":{}|<>]/.test(name),
    "Name cannot have special characters")
  .refine(name =>
    !/\d/.test(name),
    "Name cannot have digits"
  )

export const createProfileSchema = z.object({
  first_name: nameValidator,
  surname: nameValidator,
  username: z
    .string()
    .min(1, "The field is required")
    .max(24, "The max characters of this field is 24"),
  image: z.string().optional()
});

export type CreateProfileSchema = z.infer<typeof createProfileSchema>;

