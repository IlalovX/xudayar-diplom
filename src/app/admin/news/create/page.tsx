'use client'

import type React from 'react'

import { NewsService } from '@/src/service/news.service'
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import {
	Alert,
	Box,
	Breadcrumbs,
	Button,
	CircularProgress,
	Container,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'

interface NewsFormData {
	title: string
	content: string
	slug: string
}

export default function CreateNewsPage() {
	const router = useRouter()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [selectedImage, setSelectedImage] = useState<File | null>(null)

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<NewsFormData>({
		defaultValues: {
			title: '',
			content: '',
			slug: '',
		},
	})

	const title = watch('title')

	// Auto-generate slug from title
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setValue('title', value)

		// Generate slug from title
		const slug = value
			.toLowerCase()
			.replace(/[^\w\s-]/g, '') // Remove special characters
			.replace(/\s+/g, '-') // Replace spaces with hyphens
			.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen

		setValue('slug', slug)
	}

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
		},
		maxSize: 5242880, // 5MB
		onDrop: acceptedFiles => {
			setSelectedImage(acceptedFiles[0])
		},
	})

	const onSubmit = async (data: NewsFormData) => {
		setIsSubmitting(true)
		setError(null)

		try {
			const formData = new FormData()
			formData.append('title', data.title)
			formData.append('content', data.content)
			formData.append('slug', data.slug)

			if (selectedImage) {
				formData.append('image', selectedImage)
			}

			await NewsService.create(formData)
			router.push('/admin/news')
		} catch (err: any) {
			setError(err.message || 'Произошла ошибка при создании новости')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Container maxWidth='xl'>
			<Breadcrumbs aria-label='breadcrumb' sx={{ mb: 2 }}>
				<Link href='/admin'>Панель управления</Link>
				<Link href='/admin/news'>Новости</Link>
				<Typography color='text.primary'>Создать новость</Typography>
			</Breadcrumbs>

			<Typography
				variant='h4'
				component='h1'
				gutterBottom
				sx={{ fontWeight: 700, color: 'primary.main', mb: 4 }}
			>
				Создать новость
			</Typography>

			{error && (
				<Alert severity='error' sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			<Paper elevation={2} sx={{ p: 3 }}>
				<Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Controller
								name='title'
								control={control}
								rules={{ required: 'Заголовок обязателен' }}
								render={({ field }) => (
									<TextField
										{...field}
										onChange={handleTitleChange}
										label='Заголовок'
										fullWidth
										variant='outlined'
										error={!!errors.title}
										helperText={errors.title?.message}
									/>
								)}
							/>
						</Grid>

						<Grid item xs={12}>
							<Controller
								name='slug'
								control={control}
								rules={{ required: 'URL-адрес обязателен' }}
								render={({ field }) => (
									<TextField
										{...field}
										label='URL-адрес (slug)'
										fullWidth
										variant='outlined'
										error={!!errors.slug}
										helperText={
											errors.slug?.message ||
											'Уникальный идентификатор для URL-адреса новости'
										}
									/>
								)}
							/>
						</Grid>

						<Grid item xs={12}>
							<Controller
								name='content'
								control={control}
								rules={{ required: 'Содержание обязательно' }}
								render={({ field }) => (
									<TextField
										{...field}
										label='Содержание'
										fullWidth
										multiline
										rows={10}
										variant='outlined'
										error={!!errors.content}
										helperText={errors.content?.message}
									/>
								)}
							/>
						</Grid>

						<Grid item xs={12}>
							<Box
								{...getRootProps()}
								sx={{
									border: '2px dashed #cccccc',
									borderRadius: 2,
									p: 3,
									textAlign: 'center',
									cursor: 'pointer',
									'&:hover': {
										borderColor: 'primary.main',
									},
								}}
							>
								<input {...getInputProps()} />
								<CloudUploadIcon
									sx={{ fontSize: 48, color: 'primary.main', mb: 1 }}
								/>
								<Typography variant='body1' gutterBottom>
									Перетащите изображение сюда или нажмите для выбора
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									Поддерживаемые форматы: JPEG, JPG, PNG, GIF (макс. 5MB)
								</Typography>
								{selectedImage && (
									<Typography
										variant='body2'
										sx={{ mt: 2, fontWeight: 'bold' }}
									>
										Выбрано изображение: {selectedImage.name}
									</Typography>
								)}
							</Box>
						</Grid>

						<Grid
							item
							xs={12}
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								gap: 2,
								mt: 2,
							}}
						>
							<Button
								variant='outlined'
								onClick={() => router.push('/admin/news')}
								disabled={isSubmitting}
							>
								Отмена
							</Button>
							<Button type='submit' variant='contained' disabled={isSubmitting}>
								{isSubmitting ? (
									<CircularProgress size={24} />
								) : (
									'Создать новость'
								)}
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Container>
	)
}
