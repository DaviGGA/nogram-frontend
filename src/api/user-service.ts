import { User } from "@/models/user";
import { api, handleError } from "./axios";
import { BlobResponse, ServiceResponse, SuccessResponse } from "@/types/ApiResponse";
import { Token } from "@/models/token";
import { Profile } from "@/models/profile";
import { Entity } from "@/types/Entity";

export async function createUser(user: User): ServiceResponse<User> {
  try {
    const response = await api.post<SuccessResponse<User>>("/auth", user);
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

export async function login(user: User): ServiceResponse<Token> {
  try {
    const response = await api.post<SuccessResponse<Token>>("/auth/login", user);
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

export async function createProfile(profile: Profile): ServiceResponse<Profile & {id: number}> {
  try {
    const response = await api.post<SuccessResponse<Profile & {id: number}>>("/profile", profile);
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

export async function uploadProfileImage(profileId: number, image: File) {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await api
      .post<SuccessResponse<Profile>>(`/profile/profile-image/${profileId}`, 
        formData, 
        {
          headers: {
            'Content-Type': "multipart/form-data"
          }
        }
      );
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

export async function getLoggedUser(): ServiceResponse<Entity<User>> {
  try {
    const response = await api.get<SuccessResponse<Entity<User>>>("/profile/user/me");
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

export async function getLoggedUserProfile(): ServiceResponse<Entity<Profile>> {
  try {
    const response = await api.get<SuccessResponse<Entity<Profile>>>("/profile/me");
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

export async function getProfileImage(image: string): BlobResponse {
  try {
    const response = await api.get<Blob>(`assets/profile-image/${image}`, {
      responseType: "blob"
    });
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

export type ProfileUserResponse = Entity<Profile> & Entity<Omit<User,"password">>
export async function getProfileByUsername(username: string): ServiceResponse<ProfileUserResponse> {
  try {
    const response = await api.get<SuccessResponse<ProfileUserResponse>>(`profile/${username}`)
    return [null, response.data];
  } catch (error) {
    console.log(error);
    return [handleError(error), null];
  }
}

