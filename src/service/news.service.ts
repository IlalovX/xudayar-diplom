import { showApiError } from '@/src/api/error'
import { axiosInstance } from '@/src/api/interceptors'
import axios from 'axios'

export const NewsService = {
	async getAll(params?: { limit?: number; page?: number }) {
		try {
			const { data } = await axiosInstance.get('/api/v1/announcement/news/', {
				params,
			})

			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async getById(id: number | string) {
		try {
			const { data } = await axiosInstance.get(
				`/api/v1/announcement/news/${id}/`
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async getBySlug(slug: string) {
		try {
			const { data } = await axiosInstance.get(
				`/api/v1/announcement/news/slug/${slug}/`
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async create(newsData: {
		title: string
		text: string
		images: Record<string, string>
	}) {
		try {
			console.log(newsData)

			const { data } = await axiosInstance.post(
				'/api/v1/announcement/news/',
				newsData
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async uploadImage(imageFile: File) {
		try {
			const formData = new FormData()

			formData.append('image', imageFile)
			const { data } = await axios.post(
				'http://di-nmtu.social/api/v1/announcement/image/',
				formData
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async update(id: number, newsData: FormData) {
		try {
			const { data } = await axiosInstance.put(
				`/api/v1/announcement/news/${id}/`,
				newsData
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async delete(id: number) {
		try {
			await axiosInstance.delete(`/api/v1/announcement/news/${id}/`)
			return true
		} catch (error) {
			showApiError(error)
			throw error
		}
	},
}
