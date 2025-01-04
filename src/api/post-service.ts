import { Post } from "@/models/post";
import { BlobResponse, ServiceResponse, SuccessResponse } from "@/types/ApiResponse";
import { api, handleError } from "./axios";
import { PostProfile } from "@/models/post-profile";

export async function createPost(description: string | undefined, image: File): ServiceResponse<Post> {

  const formData = new FormData();

  formData.append("description", description as string);
  formData.append("image", image);

  try {
    const response = await api.post<SuccessResponse<Post>>("/post", formData);
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

export async function getFeed(): ServiceResponse<PostProfile[]> {
  try {
    const response = await api.get<SuccessResponse<PostProfile[]>>("/post/feed");
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

export async function getPostImage(image: string): BlobResponse {
  try {
    const response = await api.get<Blob>(`assets/post-image/${image}`, {
      responseType: "blob"
    });
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}