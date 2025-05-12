import { AuthTokenService } from '@/src/service/auth-token.service'
import axios from 'axios'

export const API_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://di-nmtu.social'

export const axiosInstance = axios.create({
	baseURL: API_URL,
})

axiosInstance.interceptors.request.use(config => {
	const accessToken = AuthTokenService.getAccessToken()

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
		console.log('Adding auth header:', `Bearer ${accessToken}`)
	}

	return config
})

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			AuthTokenService.getRefreshToken()
		) {
			originalRequest._retry = true
			console.log('Attempting to refresh token...')

			try {
				const refreshToken = AuthTokenService.getRefreshToken()
				const { data } = await axios.post(`${API_URL}/api/token/refresh/`, {
					refresh: refreshToken,
				})

				console.log('Token refresh successful')
				AuthTokenService.saveTokens(data.access, data.refresh)

				originalRequest.headers.Authorization = `Bearer ${data.access}`
				return axiosInstance(originalRequest)
			} catch (refreshError) {
				console.error('Token refresh failed:', refreshError)
				AuthTokenService.removeTokens()
				window.location.href = '/auth'
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)
