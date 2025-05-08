'use client'

import { AuthTokenService } from '@/src/service/auth-token.service'
import { AuthService } from '@/src/service/auth.service'
import {
	Alert,
	Avatar,
	Box,
	Button,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type User = {
	id: string
	full_name: string
	logo_teacher: string
	phone_number: string
	position_id: number
	role: string
	username: string
}

export default function ProfilePage() {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const checkAuth = async () => {
			const isAuthenticated = AuthTokenService.isAuthenticated()

			if (!isAuthenticated) {
				router.push('/auth')
				return
			}

			const userRole = AuthTokenService.getUserRole()

			if (userRole === 'admin') {
				router.push('/admin')
				return
			}

			try {
				const userData = await AuthService.getCurrentUser()
				setUser(userData)
			} catch (err) {
				setError('Не удалось загрузить данные пользователя')
			} finally {
				setIsLoading(false)
			}
		}

		checkAuth()
	}, [router])

	const handleLogout = async () => {
		await AuthService.logout()
		router.push('/')
	}

	if (isLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<CircularProgress />
			</Box>
		)
	}

	if (error) {
		return (
			<Container maxWidth='md' sx={{ py: 4 }}>
				<Alert severity='error'>{error}</Alert>
				<Button variant='contained' onClick={handleLogout} sx={{ mt: 2 }}>
					Выйти
				</Button>
			</Container>
		)
	}

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Typography
				variant='h4'
				component='h1'
				gutterBottom
				sx={{ color: 'primary.main', fontWeight: 700 }}
			>
				Личный кабинет преподавателя
			</Typography>

			<Grid container spacing={4}>
				<Grid size={4}>
					<Paper elevation={2} sx={{ p: 3 }}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar
								src={user?.logo_teacher || '/default-avatar.png'}
								alt={user?.full_name || 'Пользователь'}
								sx={{ width: 120, height: 120, mb: 2 }}
							/>
							<Typography variant='h5' component='h2' gutterBottom>
								{user?.full_name || 'Имя не указано'}
							</Typography>
							<Typography variant='body1' color='text.secondary' gutterBottom>
								Преподаватель
							</Typography>
							<Button
								variant='outlined'
								fullWidth
								sx={{ mt: 2 }}
								onClick={() => router.push('/profile/edit')}
							>
								Редактировать профиль
							</Button>
							<Button
								variant='contained'
								color='error'
								fullWidth
								sx={{ mt: 2 }}
								onClick={handleLogout}
							>
								Выйти
							</Button>
						</Box>
					</Paper>
				</Grid>

				<Grid size={10}>
					<Paper elevation={2} sx={{ p: 3 }}>
						<Typography variant='h6' component='h3' gutterBottom>
							Информация о пользователе
						</Typography>
						<Divider sx={{ mb: 2 }} />

						<Grid container spacing={2}>
							<Grid size={6}>
								<Typography variant='body2' color='text.secondary'>
									Имя пользователя:
								</Typography>
							</Grid>
							<Grid size={6}>
								<Typography variant='body1'>
									{user?.username || 'Не указано'}
								</Typography>
							</Grid>

							<Grid size={6}>
								<Typography variant='body2' color='text.secondary'>
									Номер телефона:
								</Typography>
							</Grid>
							<Grid size={6}>
								<Typography variant='body1'>
									{user?.phone_number || 'Не указано'}
								</Typography>
							</Grid>

							<Grid size={6}>
								<Typography variant='body2' color='text.secondary'>
									Роль:
								</Typography>
							</Grid>
							<Grid size={6}>
								<Typography variant='body1'>
									{user?.role === 'teacher' ? 'Преподаватель' : 'Пользователь'}
								</Typography>
							</Grid>
						</Grid>
					</Paper>

					<Paper elevation={2} sx={{ p: 3, mt: 3 }}>
						<Typography variant='h6' component='h3' gutterBottom>
							Мои документы
						</Typography>
						<Divider sx={{ mb: 2 }} />

						<Button
							variant='contained'
							onClick={() => router.push('/profile/docs')}
							sx={{ mb: 2 }}
						>
							Управление документами
						</Button>

						<Typography variant='body2' color='text.secondary'>
							В этом разделе вы можете управлять своими документами, загружать
							новые и редактировать существующие.
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}
