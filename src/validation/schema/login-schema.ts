import z from "zod";

const emailZodObject = z.string()
  .min(1, {message: "O email deve ser preenchido."})
  .max(36, {message: "O campo de email só permite até 36 caracteres."})
  .email("Esse email não é válido.")

const passwordZodObject = z.string()
  .min(1, {message: "A senha deve ser preenchida."})
  .max(36, {message: "O campo de senha só permite até 36 caracteres."})
  .regex(/[^a-zA-Z0-9\s]/, {message: "A senha deve conter pelo menos um caractere especial."})
  .regex(/\d/, {message: "A senha deve conter pelo menos um dígito"})

export const loginSchema = z.object({
  email: emailZodObject,
  password: passwordZodObject
})

export type LoginSchema = z.infer<typeof loginSchema>;

