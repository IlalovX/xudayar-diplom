'use client'

import { AuthTokenService } from '@/src/service/auth-token.service'
import { DocumentCategoryService } from '@/src/service/docs-category.service'
import { DocumentsService } from '@/src/service/documents.service'
import { EducationYearService } from '@/src/service/edu-years.service'
import type { Document, DocumentCategory, EducationYear } from '@/src/types'
import {
	Add as AddIcon,
	CloudUpload as CloudUploadIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
} from '@mui/icons-material'
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'

export default function DocsPage() {
	const router = useRouter()
	const [documents, setDocuments] = useState<Document[]>([])
	const [categories, setCategories] = useState<DocumentCategory[]>([])
	const [years, setYears] = useState<EducationYear[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [openDialog, setOpenDialog] = useState(false)
	const [selectedDocument, setSelectedDocument] = useState<Document | null>(
		null
	)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)

	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			description: '',
			categoryId: '',
			yearId: '',
		},
	})

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'application/pdf': ['.pdf'],
			'application/msword': ['.doc'],
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
				['.docx'],
		},
		maxSize: 10485760, // 10MB
		onDrop: acceptedFiles => {
			setSelectedFile(acceptedFiles[0])
		},
	})

	useEffect(() => {
		const checkAuth = async () => {
			const isAuthenticated = AuthTokenService.isAuthenticated()

			if (!isAuthenticated) {
				router.push('/auth')
				return
			}

			try {
				// Load documents, categories and years
				const [docsData, categoriesData, yearsData] = await Promise.all([
					DocumentsService.getAll(),
					DocumentCategoryService.getAll(),
					EducationYearService.getAll(),
				])

				setDocuments(docsData.results || [])
				setCategories(categoriesData.results || [])
				setYears(yearsData.results || [])
			} catch (err) {
				setError('Не удалось загрузить данные')
			} finally {
				setIsLoading(false)
			}
		}

		checkAuth()
	}, [router])

	const handleOpenDialog = (doc?: Document) => {
		if (doc) {
			setSelectedDocument(doc)
			setValue('title', doc.title)
			setValue('description', doc.description || '')
			setValue('categoryId', doc.categoryId.toString())
			setValue('yearId', doc.yearId.toString())
		} else {
			setSelectedDocument(null)
			reset()
		}
		setSelectedFile(null)
		setOpenDialog(true)
	}

	const handleCloseDialog = () => {
		setOpenDialog(false)
	}

	const onSubmit = async (data: any) => {
		setIsSubmitting(true)
		setError(null)

		try {
			const formData = new FormData()
			formData.append('title', data.title)

			if (data.description) {
				formData.append('description', data.description)
			}

			formData.append('categoryId', data.categoryId)
			formData.append('yearId', data.yearId)

			if (selectedFile) {
				formData.append('file', selectedFile)
			}

			let response

			if (selectedDocument) {
				// Update existing document
				response = await DocumentsService.update(selectedDocument.id, formData)

				// Update documents list
				setDocuments(
					documents.map(doc =>
						doc.id === selectedDocument.id ? response : doc
					)
				)
			} else {
				// Create new document
				if (!selectedFile) {
					throw new Error('Файл обязателен для загрузки')
				}

				response = await DocumentsService.create(formData)

				// Add new document to list
				setDocuments([...documents, response])
			}

			handleCloseDialog()
		} catch (err: any) {
			setError(err.message || 'Произошла ошибка при сохранении документа')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleDeleteDocument = async (id: number) => {
		if (window.confirm('Вы уверены, что хотите удалить этот документ?')) {
			try {
				await DocumentsService.delete(id)
				setDocuments(documents.filter(doc => doc.id !== id))
			} catch (err) {
				setError('Не удалось удалить документ')
			}
		}
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

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 3,
				}}
			>
				<Typography
					variant='h4'
					component='h1'
					sx={{ color: 'primary.main', fontWeight: 700 }}
				>
					Управление документами
				</Typography>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					onClick={() => handleOpenDialog()}
				>
					Добавить документ
				</Button>
			</Box>

			{error && (
				<Alert severity='error' sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			<Paper elevation={2}>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Название</TableCell>
								<TableCell>Категория</TableCell>
								<TableCell>Учебный год</TableCell>
								<TableCell>Дата создания</TableCell>
								<TableCell align='right'>Действия</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{documents.length > 0 ? (
								documents.map(doc => (
									<TableRow key={doc.id}>
										<TableCell>{doc.title}</TableCell>
										<TableCell>
											{categories.find(c => c.id === doc.categoryId)?.name ||
												'Неизвестно'}
										</TableCell>
										<TableCell>
											{years.find(y => y.id === doc.yearId)?.name ||
												'Неизвестно'}
										</TableCell>
										<TableCell>
											{new Date(doc.createdAt).toLocaleDateString()}
										</TableCell>
										<TableCell align='right'>
											<IconButton
												color='primary'
												onClick={() => handleOpenDialog(doc)}
											>
												<EditIcon />
											</IconButton>
											<IconButton
												color='error'
												onClick={() => handleDeleteDocument(doc.id)}
											>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={5} align='center'>
										Нет документов
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

			{/* Document Dialog */}
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				maxWidth='md'
				fullWidth
			>
				<DialogTitle>
					{selectedDocument
						? 'Редактировать документ'
						: 'Добавить новый документ'}
				</DialogTitle>
				<DialogContent>
					<Box component='form' noValidate sx={{ mt: 1 }}>
						<Controller
							name='title'
							control={control}
							rules={{ required: 'Название обязательно' }}
							render={({ field }) => (
								<TextField
									{...field}
									margin='normal'
									required
									fullWidth
									label='Название документа'
									error={!!errors.title}
									helperText={errors.title?.message?.toString()}
								/>
							)}
						/>

						<Controller
							name='description'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									margin='normal'
									fullWidth
									label='Описание'
									multiline
									rows={3}
								/>
							)}
						/>

						<Grid container spacing={2} sx={{ mt: 1 }}>
							<Grid item xs={12} sm={6}>
								<Controller
									name='categoryId'
									control={control}
									rules={{ required: 'Категория обязательна' }}
									render={({ field }) => (
										<FormControl fullWidth error={!!errors.categoryId}>
											<InputLabel>Категория</InputLabel>
											<Select {...field} label='Категория'>
												{categories.map(category => (
													<MenuItem key={category.id} value={category.id}>
														{category.name}
													</MenuItem>
												))}
											</Select>
											{errors.categoryId && (
												<Typography variant='caption' color='error'>
													{errors.categoryId.message?.toString()}
												</Typography>
											)}
										</FormControl>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Controller
									name='yearId'
									control={control}
									rules={{ required: 'Учебный год обязателен' }}
									render={({ field }) => (
										<FormControl fullWidth error={!!errors.yearId}>
											<InputLabel>Учебный год</InputLabel>
											<Select {...field} label='Учебный год'>
												{years.map(year => (
													<MenuItem key={year.id} value={year.id}>
														{year.name}
													</MenuItem>
												))}
											</Select>
											{errors.yearId && (
												<Typography variant='caption' color='error'>
													{errors.yearId.message?.toString()}
												</Typography>
											)}
										</FormControl>
									)}
								/>
							</Grid>
						</Grid>

						<Box
							{...getRootProps()}
							sx={{
								border: '2px dashed #cccccc',
								borderRadius: 2,
								p: 3,
								mt: 3,
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
								Перетащите файл сюда или нажмите для выбора
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								Поддерживаемые форматы: PDF, DOC, DOCX (макс. 10MB)
							</Typography>
							{selectedFile && (
								<Typography variant='body2' sx={{ mt: 2, fontWeight: 'bold' }}>
									Выбран файл: {selectedFile.name}
								</Typography>
							)}
							{!selectedFile && selectedDocument && (
								<Typography variant='body2' sx={{ mt: 2 }}>
									Текущий файл: {selectedDocument.file.split('/').pop()}
								</Typography>
							)}
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Отмена</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						variant='contained'
						disabled={isSubmitting}
					>
						{isSubmitting ? <CircularProgress size={24} /> : 'Сохранить'}
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}
