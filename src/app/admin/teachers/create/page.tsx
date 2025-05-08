'use client'

import { TeacherService } from '@/src/service/teacher.service'
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
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'

export default function CreateTeacherPage() {
	const router = useRouter()
	const [fullName, setFullName] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [positionId, setPositionId] = useState<number>(1)
	const [phoneNumber, setPhoneNumber] = useState('')
	const [image, setImage] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const positions = [
		{ id: 1, name: 'Преподаватель' },
		{ id: 2, name: 'Доцент' },
		{ id: 3, name: 'Профессор' },
		{ id: 4, name: 'Заведующий кафедрой' },
	]

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
		if (!fullName || !username || !password) {
			setError('Пожалуйста, заполните все обязательные поля')
			setLoading(false)
			return
		}

		try {
			const formData = new FormData()
			formData.append('full_name', fullName)
			formData.append('username', username)
			formData.append('password', password)
			formData.append('position_id', positionId.toString())
			formData.append('role', 'teacher')

			if (phoneNumber) {
				formData.append('phone_number', phoneNumber)
			}

			if (image) {
				formData.append('logo_teacher', image)
			}

			console.log('Submitting teacher data:', Object.fromEntries(formData))
			await TeacherService.create(formData)

			setSuccess(true)

			// Redirect after short delay
			setTimeout(() => {
				router.push('/admin/teachers')
			}, 2000)
		} catch (err) {
			console.error('Error creating teacher:', err)
			setError(
				'Ошибка при создании преподавателя. Пожалуйста, попробуйте позже.'
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container maxWidth='xl'>
			<Box sx={{ mb: 3 }}>
				<Breadcrumbs
					separator={<NavigateNext fontSize='small' />}
					sx={{ mb: 1 }}
				>
					<Link
						href='/admin'
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						Главная
					</Link>
					<Link
						href='/admin/teachers'
						style={{ textDecoration: 'none', color: 'inherit' }}
					>
						Преподаватели
					</Link>
					<Typography color='text.primary'>Добавление преподавателя</Typography>
				</Breadcrumbs>

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
						Добавление преподавателя
					</Typography>
					<Button
						variant='outlined'
						startIcon={<ArrowBack />}
						onClick={() => router.push('/admin/teachers')}
					>
						Назад к списку
					</Button>
				</Box>
			</Box>

			{error && (
				<Alert severity='error' sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			{success && (
				<Alert severity='success' sx={{ mb: 3 }}>
					Преподаватель успешно добавлен!
				</Alert>
			)}

			<Paper sx={{ p: 3 }}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8}>
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

									<TextField
										label='Пароль'
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
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>

									<FormControl fullWidth sx={{ mb: 2 }}>
										<InputLabel>Должность</InputLabel>
										<Select
											value={positionId}
											label='Должность'
											onChange={e => setPositionId(e.target.value as number)}
											disabled={loading}
										>
											{positions.map(position => (
												<MenuItem key={position.id} value={position.id}>
													{position.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>

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

						<Grid item xs={12} md={4}>
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
											src={imagePreview || '/default-avatar.png'}
											alt='Teacher preview'
											sx={{ width: 150, height: 150, mb: 2 }}
										/>

										<Button
											component='label'
											variant='outlined'
											startIcon={<CloudUpload />}
											sx={{ mt: 1 }}
											disabled={loading}
										>
											Загрузить фото
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
							onClick={() => router.push('/admin/teachers')}
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
							{loading ? 'Сохранение...' : 'Сохранить'}
						</Button>
					</Box>
				</form>
			</Paper>
		</Container>
	)
}
