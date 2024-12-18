import { User } from "@/models/user";
import { api, handleError } from "./axios";
import { ServiceResponse, SuccessResponse } from "@/types/ApiResponse";

export async function createUser(user: User): ServiceResponse<User> {
  try {
    const response = await api.post<SuccessResponse<User>>("/auth", user);
    return [null, response.data]
  } catch (error) {
    console.log(error)
    return [handleError(error), null];
  }
}