import { ApiError, ValidationError } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: false
});


export const handleError = (error: unknown) => {
  const axiosError = error as AxiosError<ApiError, any> ;
  
  const isValidationError = (error: Object | undefined): error is ValidationError =>
   typeof error === "object" && error.hasOwnProperty("issues") && error.hasOwnProperty("name");

  const message = isValidationError(axiosError.response?.data) ?
  axiosError.response?.data.issues.message : axiosError.response?.data.message;

  return {
    status: axiosError.status as number,
    name: axiosError.response?.data.name as string,
    message: message as string,
  }
}
  


const getAuthToken = () => localStorage.getItem("accessToken"); 

api.interceptors.request.use(function (config) {
  const token = getAuthToken()
  if(token) config.headers.Authorization = `Bearer ${token}`
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});