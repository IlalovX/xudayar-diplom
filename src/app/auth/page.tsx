'use client'

import { AuthService } from '@/src/service/auth.service'
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface LoginForm {
	username: string
	password: string
}

export default function AuthPage() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = async (data: LoginForm) => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await AuthService.login(data)

			console.log('Login successful:', response)

			// Check user role and redirect accordingly
			const userRole = response.user?.role //|| savedUser?.role //AuthTokenService is not defined

			if (userRole === 'admin') {
				router.push('/admin')
			} else if (userRole === 'teacher') {
				router.push('/profile')
			} else {
				// Fallback to home page if role is not recognized
				router.push('/')
			}
		} catch (err: any) {
			console.error('Login error:', err)
			setError(
				err.message ||
					'Ошибка авторизации. Пожалуйста, проверьте введенные данные.'
			)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Container maxWidth='sm' sx={{ py: 8 }}>
			<Paper elevation={3} sx={{ p: 4 }}>
				<Typography
					variant='h4'
					component='h1'
					align='center'
					gutterBottom
					sx={{ color: 'primary.main', fontWeight: 700 }}
				>
					Авторизация
				</Typography>
				<Typography variant='body1' align='center' sx={{ mb: 4 }}>
					Введите ваши учетные данные для входа в систему
				</Typography>

				{error && (
					<Alert severity='error' sx={{ mb: 3 }}>
						{error}
					</Alert>
				)}

				<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
					<Controller
						name='username'
						control={control}
						rules={{
							required: 'Имя пользователя обязательно',
						}}
						render={({ field }) => (
							<TextField
								{...field}
								margin='normal'
								required
								fullWidth
								id='username'
								label='Имя пользователя'
								autoComplete='username'
								autoFocus
								error={!!errors.username}
								helperText={errors.username?.message}
							/>
						)}
					/>

					<Controller
						name='password'
						control={control}
						rules={{
							required: 'Пароль обязателен',
							minLength: {
								value: 6,
								message: 'Пароль должен содержать минимум 6 символов',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								margin='normal'
								required
								fullWidth
								id='password'
								label='Пароль'
								type='password'
								autoComplete='current-password'
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						)}
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2, py: 1.5 }}
						disabled={isLoading}
					>
						{isLoading ? <CircularProgress size={24} /> : 'Войти'}
					</Button>
				</Box>
			</Paper>
		</Container>
	)
}
