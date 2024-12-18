import { FailResponse } from "@/types/ApiResponse"

export class ToastUtils {

  static toastFromError(error: FailResponse): void {
    
  }

  private toastVariantByStatusCode(status: number ): "default" | "destructive" | "info" {
    if (status >= 200 && status < 300) return "default"
    if (status >= 400 && status < 500) return "info"
    if (status >= 500) return "destructive"
    return "default"
  }

}