import { axiosInstance } from "@/src/api/interceptors"
import type { News } from "@/src/types"
import { showApiError } from "@/src/api/error"

export const NewsService = {
  async getAll(params?: { limit?: number; page?: number }) {
    try {
      const { data } = await axiosInstance.get("/api/v1/about/", { params })
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async getById(id: number) {
    try {
      const { data } = await axiosInstance.get(`/api/v1/about/${id}/`)
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async getBySlug(slug: string) {
    try {
      const { data } = await axiosInstance.get(`/api/v1/about/slug/${slug}/`)
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async create(newsData: Omit<News, "id" | "createdAt" | "updatedAt" | "slug">) {
    try {
      const { data } = await axiosInstance.post("/api/v1/about/", newsData)
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async update(id: number, newsData: Partial<Omit<News, "id" | "createdAt" | "updatedAt" | "slug">>) {
    try {
      const { data } = await axiosInstance.put(`/api/v1/about/${id}/`, newsData)
      return data
    } catch (error) {
      showApiError(error)
      throw error
    }
  },

  async delete(id: number) {
    try {
      await axiosInstance.delete(`/api/v1/about/${id}/`)
      return true
    } catch (error) {
      showApiError(error)
      throw error
    }
  },
}
