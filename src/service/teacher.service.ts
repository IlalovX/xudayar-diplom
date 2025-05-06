import { axiosInstance } from "@/src/api/interceptors"
import { showApiError } from "@/src/api/error"

export const TeacherService = {
  async getAll(params?: { limit?: number; page?: number; department?: string }) {
    try {
      const { data } = await axiosInstance.get("/api/v1/teachers/list/teacher/", { params })
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async getById(id: number) {
    try {
      const { data } = await axiosInstance.get(`/api/v1/teachers/detail/teacher/${id}/`)
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async create(teacherData: FormData) {
    try {
      const { data } = await axiosInstance.post("/api/v1/teachers/post/teacher/", teacherData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async update(id: number, teacherData: FormData) {
    try {
      const { data } = await axiosInstance.put(`/api/v1/teachers/post/teacher/${id}/`, teacherData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async delete(id: number) {
    try {
      await axiosInstance.delete(`/api/v1/teachers/delete/teacher/${id}/`)
      return true
    } catch (error) {
      showApiError(error)
      throw error
    }
  },
}
