import { ServiceResponse, SuccessResponse } from "@/types/ApiResponse";
import { api, handleError } from "./axios";

type IsLiked = boolean;
export async function likePost(postId: number): ServiceResponse<IsLiked> {

  try {
    const response = await api.post<SuccessResponse<IsLiked>>(`/like/${postId}`);
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

