import { showApiError } from '@/src/api/error'
import { axiosInstance } from '@/src/api/interceptors'
import { AuthTokenService } from './auth-token.service'

interface LoginRequest {
	username: string
	password: string
}

interface LoginResponse {
	access: string
	refresh: string
	user: {
		id: number
		username: string
		role: 'admin' | 'teacher'
		fullName: string
	}
}

export const AuthService = {
	async login(data: LoginRequest): Promise<LoginResponse> {
		try {
			const response = await axiosInstance.post<LoginResponse>(
				'/api/token/',
				data
			)

			if (response.data.access && response.data.refresh) {
				AuthTokenService.saveTokens(response.data.access, response.data.refresh)
				AuthTokenService.saveUser({
					id: 0,
					username: 'Xudayuar',
					role: 'teacher',
					fullName: 'FIO',
				})
			}

			return response.data
		} catch (error) {
			console.error('Login error:', error)
			if (error instanceof Error) {
				throw new Error(
					error.message ||
						'Ошибка авторизации. Пожалуйста, проверьте введенные данные.'
				)
			}
			showApiError(error)
			throw error
		}
	},

	async logout(): Promise<void> {
		try {
			await axiosInstance.post('/api/token/logout/')
		} catch (error) {
			console.error('Logout error:', error)
		} finally {
			AuthTokenService.removeTokens()
		}
	},

	async getCurrentUser() {
		try {
			const response = await axiosInstance.get('/api/v1/users/me/')
			AuthTokenService.saveUser(response.data)
			return response.data
		} catch (error) {
			showApiError(error)
			throw error
		}
	},
}
