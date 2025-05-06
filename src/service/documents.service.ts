import { showApiError } from '@/src/api/error'
import { axiosInstance } from '@/src/api/interceptors'

export const DocumentsService = {
	async getAll(params?: {
		categoryId?: number
		yearId?: number
		limit?: number
		page?: number
	}) {
		try {
			const { data } = await axiosInstance.get('/api/v1/documents/document/', {
				params,
			})
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async getById(id: number) {
		try {
			const { data } = await axiosInstance.get(
				`/api/v1/documents/document/${id}/`
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async create(documentData: FormData) {
		try {
			const { data } = await axiosInstance.post(
				'/api/v1/documents/document/',
				documentData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async update(id: number, documentData: FormData) {
		try {
			const { data } = await axiosInstance.put(
				`/api/v1/documents/document/${id}/`,
				documentData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async delete(id: number) {
		try {
			await axiosInstance.delete(`/api/v1/documents/document/${id}/`)
			return true
		} catch (error) {
			showApiError(error)
			throw error
		}
	},
}
