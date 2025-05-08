'use client'

import type React from 'react'

import { DocumentCategoryService } from '@/src/service/docs-category.service'
import { DocumentsService } from '@/src/service/documents.service'
import { EducationYearService } from '@/src/service/edu-years.service'
import type { DocumentCategory, EducationYear } from '@/src/types'
import { CloudUpload, NavigateNext } from '@mui/icons-material'
import {
	Alert,
	Box,
	Breadcrumbs,
	Button,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'

export default function CreateDocumentPage() {
	const router = useRouter()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [categoryId, setCategoryId] = useState<number | ''>('')
	const [yearId, setYearId] = useState<number | ''>('')
	const [file, setFile] = useState<File | null>(null)
	const [fileName, setFileName] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)
	const [categories, setCategories] = useState<DocumentCategory[]>([])
	const [years, setYears] = useState<EducationYear[]>([])
	const [loadingData, setLoadingData] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categoriesData, yearsData] = await Promise.all([
					DocumentCategoryService.getAll(),
					EducationYearService.getAll(),
				])
				setCategories(categoriesData)
				setYears(yearsData)
			} catch (error) {
				console.error('Error fetching data:', error)
				setError('Ошибка при загрузке данных. Пожалуйста, попробуйте позже.')
			} finally {
				setLoadingData(false)
			}
		}

		fetchData()
	}, [])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0]
			setFile(selectedFile)
			setFileName(selectedFile.name)
		}
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		setSuccess(false)

		if (!title || !categoryId || !yearId || !file) {
			setError('Пожалуйста, заполните все обязательные поля')
			setLoading(false)
			return
		}

		try {
			const formData = new FormData()
			formData.append('document_name', title)
			if (description) formData.append('description', description)
			formData.append('category_id', categoryId.toString())
			formData.append('document_year', yearId.toString())
			formData.append('document', file)

			await DocumentsService.create(formData)
			setSuccess(true)

			// Reset form
			setTitle('')
			setDescription('')
			setCategoryId('')
			setYearId('')
			setFile(null)
			setFileName('')

			// Redirect after short delay
			setTimeout(() => {
				router.push('/admin/documents')
			}, 2000)
		} catch (error) {
			console.error('Error creating document:', error)
			setError('Ошибка при создании документа. Пожалуйста, попробуйте позже.')
		} finally {
			setLoading(false)
		}
	}

	if (loadingData) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '50vh',
				}}
			>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Box sx={{ p: 3 }}>
			<Breadcrumbs separator={<NavigateNext fontSize='small' />} sx={{ mb: 3 }}>
				<Link
					href='/admin'
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					Главная
				</Link>
				<Link
					href='/admin/documents'
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					Документы
				</Link>
				<Typography color='text.primary'>Создать документ</Typography>
			</Breadcrumbs>

			<Paper sx={{ p: 3, mb: 3 }}>
				<Typography variant='h5' component='h1' gutterBottom>
					Создать новый документ
				</Typography>

				{error && (
					<Alert severity='error' sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}
				{success && (
					<Alert severity='success' sx={{ mb: 2 }}>
						Документ успешно создан!
					</Alert>
				)}

				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid size={6}>
							<TextField
								label='Название документа'
								fullWidth
								required
								value={title}
								onChange={e => setTitle(e.target.value)}
								disabled={loading}
							/>
						</Grid>
						<Grid size={6}>
							<TextField
								label='Описание'
								fullWidth
								multiline
								value={description}
								onChange={e => setDescription(e.target.value)}
								disabled={loading}
							/>
						</Grid>
						<Grid size={3}>
							<FormControl fullWidth required>
								<InputLabel>Категория</InputLabel>
								<Select
									value={categoryId}
									label='Категория'
									onChange={e => setCategoryId(e.target.value as number)}
									disabled={loading}
								>
									{categories.map(category => (
										<MenuItem key={category.id} value={category.id}>
											{category.category_name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid size={3}>
							<FormControl fullWidth required>
								<InputLabel>Учебный год</InputLabel>
								<Select
									value={yearId}
									label='Учебный год'
									onChange={e => setYearId(e.target.value as number)}
									disabled={loading}
								>
									{years.map(year => (
										<MenuItem key={year.id} value={year.id}>
											{year.year}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid size={6}>
							<Button
								component='label'
								variant='outlined'
								startIcon={<CloudUpload />}
								sx={{ mb: 1 }}
								disabled={loading}
							>
								Загрузить файл
								<input
									type='file'
									hidden
									onChange={handleFileChange}
									accept='.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'
								/>
							</Button>
							{fileName && (
								<Typography variant='body2' sx={{ ml: 1 }}>
									Выбран файл: {fileName}
								</Typography>
							)}
						</Grid>
						<Grid
							size={12}
							sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
						>
							<Button
								variant='outlined'
								onClick={() => router.push('/admin/documents')}
								disabled={loading}
							>
								Отмена
							</Button>
							<Button
								type='submit'
								variant='contained'
								disabled={loading}
								startIcon={loading ? <CircularProgress size={20} /> : null}
							>
								{loading ? 'Создание...' : 'Создать документ'}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Box>
	)
}
