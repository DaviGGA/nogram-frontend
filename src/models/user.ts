import { SignupSchema } from "@/validation/schema/sign-schema";
import { Profile } from "./profile";

export type User = Omit<SignupSchema,"confirmPassword"> & {
  profile: Profile | undefined
}
