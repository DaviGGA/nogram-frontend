import { SignupSchema } from "@/validation/schema/sign-schema";

export type User = Omit<SignupSchema,"confirmPassword">
