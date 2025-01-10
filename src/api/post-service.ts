import { Post } from "@/models/post";
import { BlobResponse, ServiceResponse, SuccessResponse } from "@/types/ApiResponse";
import { api, handleError } from "./axios";
import { FeedPost } from "@/models/feed-post";
import { Entity } from "@/types/Entity";

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

export async function getFeed(): ServiceResponse<FeedPost[]> {
  try {
    const response = await api.get<SuccessResponse<FeedPost[]>>("/post/feed");
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

export async function getPostsByUser(username: string): ServiceResponse<Entity<Post[]>> {
  try {
    const response = await api.get<SuccessResponse<Entity<Post[]>>>(`post/user/${username}`)
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}