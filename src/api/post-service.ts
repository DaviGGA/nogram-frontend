import { Post } from "@/models/post";
import { ServiceResponse, SuccessResponse } from "@/types/ApiResponse";
import { api, handleError } from "./axios";

export async function createPost(description: string | undefined, image: File): ServiceResponse<Post> {

  const formData = new FormData();
  formData.append("description", description);
  formData.append("image", image);

  try {
    const response = await api.post<SuccessResponse<Post>>("/post", formData);
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}