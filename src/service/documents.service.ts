import { showApiError } from '@/src/api/error'
import { axiosInstance } from '@/src/api/interceptors'

export interface DocsDocument {
	id: string
	category_id: string
	document: string
	document_description: string
	document_name: string
	document_year: string
	visible: boolean
	teacher_id: {
		id: string
		position_id: number
		logo_teacher: string | null
		full_name: string
	}
}

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

	async getById(id: number|string) {
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
			// Log the form data for debugging
			console.log('Creating document with data:')
			for (const [key, value] of documentData.entries()) {
				console.log(`${key}: ${value instanceof File ? value.name : value}`)
			}

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

	async update(id: number|string, documentData: FormData) {
		try {
			// Log the form data for debugging
			console.log('Updating document with data:')
			for (const [key, value] of documentData.entries()) {
				console.log(`${key}: ${value instanceof File ? value.name : value}`)
			}

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

	async delete(id: string) {
		try {
			await axiosInstance.delete(`/api/v1/documents/document/${id}/`)
			return true
		} catch (error) {
			showApiError(error)
			throw error
		}
	},
}
