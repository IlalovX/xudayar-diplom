import { axiosInstance } from "@/src/api/interceptors"
import type { EducationYear } from "@/src/types"
import { showApiError } from "@/src/api/error"

export const EducationYearService = {
  async getAll() {
    try {
      const { data } = await axiosInstance.get("/api/v1/documents/year/")
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async getById(id: number) {
    try {
      const { data } = await axiosInstance.get(`/api/v1/documents/year/${id}/`)
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async create(yearData: Omit<EducationYear, "id">) {
    try {
      const { data } = await axiosInstance.post("/api/v1/documents/year/", yearData)
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async update(id: string, yearData: Partial<Omit<EducationYear, "id">>) {
    try {
      const { data } = await axiosInstance.put(`/api/v1/documents/year/${id}/`, yearData)
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async delete(id: number) {
    try {
      await axiosInstance.delete(`/api/v1/documents/year/${id}/`)
      return true
    } catch (error) {
      showApiError(error)
      throw error
    }
  },
}
