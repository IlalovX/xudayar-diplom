import { showApiError } from '@/src/api/error'
import { axiosInstance } from '@/src/api/interceptors'
import type { DocumentCategory } from '@/src/types'

export const DocumentCategoryService = {
	async getAll() {
		try {
			const { data } = await axiosInstance.get('/api/v1/documents/category/')
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async getById(id: number) {
		try {
			const { data } = await axiosInstance.get(
				`/api/v1/documents/category/${id}/`
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async create(categoryData: Omit<DocumentCategory, 'id'>) {
		try {
			const { data } = await axiosInstance.post(
				'/api/v1/documents/category/',
				categoryData
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async update(
		id: number,
		categoryData: Partial<Omit<DocumentCategory, 'id'>>
	) {
		try {
			const { data } = await axiosInstance.put(
				`/api/v1/documents/category/${id}/`,
				categoryData
			)
			return data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},

	async delete(id: number) {
		try {
			await axiosInstance.delete(`/api/v1/documents/category/${id}/`)
			return true
		} catch (error) {
			showApiError(error)
			throw error
		}
	},
}
