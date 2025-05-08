import { showApiError } from '@/src/api/error'
import { axiosInstance } from '@/src/api/interceptors'

export const TeacherService = {
	async getAll(params?: {
		limit?: number
		page?: number
		department?: string
	}) {
		try {
			const { data } = await axiosInstance.get(
				'/api/v1/teachers/list/teacher',
				{ params }
			)
			console.log('Teacher data from API:', data)
			// Handle both array response and paginated response
			const teachers = Array.isArray(data) ? data : data.results || []

			return {
				results: teachers,
				count: Array.isArray(data)
					? data.length
					: data.count || teachers.length,
			}
		} catch (error) {
			showApiError(error)
			console.error('Error fetching teachers:', error)
			throw error
		}
	},

	async getById(id: string) {
		try {
			const { data } = await axiosInstance.get(
				`/api/v1/teachers/detail/teacher/${id}/`
			)
			console.log('Teacher detail data:', data)
			return data
		} catch (error) {
			showApiError(error)
			console.error('Error fetching teacher details:', error)
			throw error
		}
	},

	async create(teacherData: FormData) {
		try {
			const { data } = await axiosInstance.post(
				'/api/v1/teachers/post/teacher/',
				teacherData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			return data
		} catch (error) {
			showApiError(error)
			console.error('Error creating teacher:', error)
			throw error
		}
	},

	async update(id: string, teacherData: FormData) {
		try {
			const { data } = await axiosInstance.put(
				`/api/v1/teachers/put/teacher/${id}/`,
				teacherData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			return data
		} catch (error) {
			showApiError(error)
			console.error('Error updating teacher:', error)
			throw error
		}
	},

	async delete(id: string) {
		try {
			await axiosInstance.delete(`/api/v1/teachers/delete/teacher/${id}/`)
			return true
		} catch (error) {
			showApiError(error)
			console.error('Error deleting teacher:', error)
			throw error
		}
	},
}
