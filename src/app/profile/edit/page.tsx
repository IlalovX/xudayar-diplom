'use client'

import { AuthTokenService } from '@/src/service/auth-token.service'
import { AuthService } from '@/src/service/auth.service'
import { TeacherService } from '@/src/service/teacher.service'
import type { User } from '@/src/types'
import {
	ArrowBack,
	Cancel,
	CloudUpload,
	NavigateNext,
	Person,
	Phone,
	Save,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material'
import {
	Alert,
	Avatar,
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Container,
	Divider,
	FormControlLabel,
	Grid,
	IconButton,
	InputAdornment,
	LinearProgress,
	Paper,
	Switch,
	TextField,
	Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'

export default function ProfileEditPage() {
	const router = useRouter()

	const [user, setUser] = useState<User | null>(null)
	const [fullName, setFullName] = useState('')
	const [username, setUsername] = useState('')
	const [changePassword, setChangePassword] = useState(false)
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState('')
	const [image, setImage] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [loadingData, setLoadingData] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [fetchError, setFetchError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				// Check if user is authenticated
				const isAuthenticated = AuthTokenService.isAuthenticated()

				if (!isAuthenticated) {
					router.push('/auth')
					return
				}

				// Get current user profile using getCurrentUser
				const userData = await AuthService.getCurrentUser()

				if (!userData) {
					throw new Error('User not found')
				}

				console.log('Found user data:', userData)
				setUser(userData)

				// Set form values
				setFullName(userData.full_name || '')
				setUsername(userData.username || '')
				setPhoneNumber(userData.phone_number || '')

				// Set image preview if available
				if (userData.logo_teacher) {
					setImagePreview(userData.logo_teacher)
				}
			} catch (err) {
				console.error('Error finding user profile:', err)
				setFetchError('Не удалось загрузить данные профиля')
			} finally {
				setLoadingData(false)
			}
		}

		fetchUserProfile()
	}, [router])

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setImage(file)

			// Create preview
			const reader = new FileReader()
			reader.onload = () => {
				setImagePreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		setSuccess(false)

		// Validation
		if (!fullName || !username) {
			setError('Пожалуйста, заполните все обязательные поля')
			setLoading(false)
			return
		}

		if (changePassword && !password) {
			setError('Пожалуйста, введите новый пароль')
			setLoading(false)
			return
		}

		try {
			const formData = new FormData()
			formData.append('full_name', fullName)
			formData.append('username', username)

			if (changePassword && password) {
				formData.append('password', password)
			}

			if (phoneNumber) {
				formData.append('phone_number', phoneNumber)
			}

			if (image) {
				formData.append('logo_teacher', image)
			}

			console.log('Submitting profile data:', Object.fromEntries(formData))
			await TeacherService.update(user?.id as string, formData)

			setSuccess(true)

			// Redirect after short delay
			setTimeout(() => {
				router.push('/profile')
			}, 2000)
		} catch (err) {
			console.error('Error updating profile:', err)
			setError('Ошибка при обновлении профиля. Пожалуйста, попробуйте позже.')
		} finally {
			setLoading(false)
		}
	}

	if (loadingData) {
		return (
			<Container maxWidth='xl'>
				<Box sx={{ p: 3 }}>
					<Paper sx={{ p: 3 }}>
						<Box sx={{ width: '100%' }}>
							<LinearProgress />
						</Box>
						<Box
							sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}
						>
							<CircularProgress />
						</Box>
						<Typography align='center'>Загрузка данных профиля...</Typography>
					</Paper>
				</Box>
			</Container>
		)
	}

	if (fetchError) {
		return (
			<Container maxWidth='xl'>
				<Box sx={{ p: 3 }}>
					<Paper sx={{ p: 3 }}>
						<Alert severity='error' sx={{ mb: 2 }}>
							{fetchError}
						</Alert>
						<Button
							variant='contained'
							startIcon={<ArrowBack />}
							onClick={() => router.push('/profile')}
						>
							Вернуться к профилю
						</Button>
					</Paper>
				</Box>
			</Container>
		)
	}

	return (
		<Container maxWidth='lg'>
			<Box sx={{ mb: 3 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography
						variant='h4'
						component='h1'
						sx={{ fontWeight: 700, color: 'primary.main' }}
					>
						Редактирование профиля
					</Typography>
					<Button
						variant='outlined'
						startIcon={<ArrowBack />}
						onClick={() => router.push('/profile')}
					>
						Назад к профилю
					</Button>
				</Box>
				<Breadcrumbs
					separator={<NavigateNext fontSize='small' />}
					sx={{ mb: 1 }}
				>
					<Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
						Главная
					</Link>
					<Link
						href='/profile'
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						Профиль
					</Link>
					<Typography color='text.primary'>Редактирование профиля</Typography>
				</Breadcrumbs>
			</Box>

			{error && (
				<Alert severity='error' sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			{success && (
				<Alert severity='success' sx={{ mb: 3 }}>
					Профиль успешно обновлен!
				</Alert>
			)}

			<Paper sx={{ p: 3 }}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid size={8}>
							<Card variant='outlined' sx={{ mb: 3 }}>
								<CardContent>
									<Typography variant='h6' gutterBottom>
										Основная информация
									</Typography>
									<Divider sx={{ mb: 2 }} />

									<TextField
										label='ФИО'
										fullWidth
										required
										value={fullName}
										onChange={e => setFullName(e.target.value)}
										disabled={loading}
										sx={{ mb: 2 }}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<Person />
												</InputAdornment>
											),
										}}
									/>

									<TextField
										label='Логин'
										fullWidth
										required
										value={username}
										onChange={e => setUsername(e.target.value)}
										disabled={loading}
										sx={{ mb: 2 }}
									/>

									<FormControlLabel
										control={
											<Switch
												checked={changePassword}
												onChange={e => setChangePassword(e.target.checked)}
												disabled={loading}
											/>
										}
										label='Изменить пароль'
										sx={{ mb: 1 }}
									/>

									{changePassword && (
										<TextField
											label='Новый пароль'
											fullWidth
											required
											type={showPassword ? 'text' : 'password'}
											value={password}
											onChange={e => setPassword(e.target.value)}
											disabled={loading}
											sx={{ mb: 2 }}
											InputProps={{
												endAdornment: (
													<InputAdornment position='end'>
														<IconButton
															onClick={() => setShowPassword(!showPassword)}
															edge='end'
														>
															{showPassword ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
									)}

									<TextField
										label='Номер телефона'
										fullWidth
										value={phoneNumber}
										onChange={e => setPhoneNumber(e.target.value)}
										disabled={loading}
										placeholder='+7 (XXX) XXX-XX-XX'
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<Phone />
												</InputAdornment>
											),
										}}
									/>
								</CardContent>
							</Card>
						</Grid>

						<Grid size={4}>
							<Card variant='outlined' sx={{ mb: 3 }}>
								<CardContent>
									<Typography variant='h6' gutterBottom>
										Фотография
									</Typography>
									<Divider sx={{ mb: 2 }} />

									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											mb: 2,
										}}
									>
										<Avatar
											src={
												imagePreview
													? `http://di-nmtu.social${imagePreview}`
													: '/default-avatar.png'
											}
											alt='User preview'
											sx={{ width: 150, height: 150, mb: 2 }}
										/>

										<Button
											component='label'
											variant='outlined'
											startIcon={<CloudUpload />}
											sx={{ mt: 1 }}
											disabled={loading}
										>
											{imagePreview ? 'Изменить фото' : 'Загрузить фото'}
											<input
												type='file'
												hidden
												onChange={handleImageChange}
												accept='image/*'
											/>
										</Button>

										{image && (
											<Typography variant='caption' sx={{ mt: 1 }}>
												{image.name}
											</Typography>
										)}
									</Box>
								</CardContent>
							</Card>
						</Grid>
					</Grid>

					<Divider sx={{ my: 2 }} />

					<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
						<Button
							variant='outlined'
							onClick={() => router.push('/profile')}
							disabled={loading}
							startIcon={<Cancel />}
						>
							Отмена
						</Button>
						<Button
							type='submit'
							variant='contained'
							disabled={loading}
							startIcon={loading ? <CircularProgress size={20} /> : <Save />}
						>
							{loading ? 'Сохранение...' : 'Сохранить изменения'}
						</Button>
					</Box>
				</form>
			</Paper>
		</Container>
	)
}
