import { ServiceResponse, SuccessResponse } from "@/types/ApiResponse";
import { api, handleError } from "./axios";
import { Entity } from "@/types/Entity";
import { PostComment } from "@/models/post-comment";

export async function commentPost(
  text: string, 
  postId: number
): ServiceResponse<Entity<PostComment>> {
  try {
    const response = await api.post<SuccessResponse<Entity<PostComment>>>(`/comment/post/${postId}`, {text});
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

