export type ApiError = ValidationError | CommonError;

export type ValidationError = {
  name: "ValidationError",
  issues: {
    path: string[],
    message: string
  }
}

export type CommonError = {
  name: string,
  message: string
}

export type SuccessResponse<R> = {data: R};
export type FailResponse = CommonError & {status: number};

export type ServiceResponse<R> = Promise<[null, SuccessResponse<R>] | [FailResponse, null]>;

export type BlobResponse = Promise<[null, Blob] | [FailResponse, null]>