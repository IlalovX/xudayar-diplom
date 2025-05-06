import { AxiosError } from "axios"
import { toast } from "sonner"

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}

export const handleApiError = (error: unknown): ApiError => {
  const defaultError: ApiError = {
    message: "Произошла ошибка. Пожалуйста, попробуйте позже.",
  }

  if (error instanceof AxiosError) {
    const statusCode = error.response?.status
    const data = error.response?.data as any

    if (statusCode === 401) {
      return {
        message: "Необходима авторизация",
        statusCode: 401,
      }
    }

    if (statusCode === 403) {
      return {
        message: "Доступ запрещен",
        statusCode: 403,
      }
    }

    if (statusCode === 404) {
      return {
        message: "Ресурс не найден",
        statusCode: 404,
      }
    }

    if (statusCode === 422 && data?.errors) {
      return {
        message: "Ошибка валидации",
        errors: data.errors,
        statusCode: 422,
      }
    }

    if (data?.message) {
      return {
        message: data.message,
        statusCode,
      }
    }
  }

  return defaultError
}

export const showApiError = (error: unknown): void => {
  const { message } = handleApiError(error)
  toast.error(message)
}
