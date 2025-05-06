'use client'

import type React from 'react'

import { DocumentCategoryService } from '@/src/service/docs-category.service'
import { DocumentsService } from '@/src/service/documents.service'
import { EducationYearService } from '@/src/service/edu-years.service'
import type { Document, DocumentCategory, EducationYear } from '@/src/types'
import {
	Add as AddIcon,
	Delete as DeleteIcon,
	Download as DownloadIcon,
	Edit as EditIcon,
	Search as SearchIcon,
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
	DialogContentText,
	DialogTitle,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Pagination,
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

export default function DocumentsPage() {
	const router = useRouter()
	const [documents, setDocuments] = useState<Document[]>([])
	const [categories, setCategories] = useState<DocumentCategory[]>([])
	const [years, setYears] = useState<EducationYear[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [selectedYear, setSelectedYear] = useState<string>('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [documentToDelete, setDocumentToDelete] = useState<Document | null>(
		null
	)
	const [isDeleting, setIsDeleting] = useState(false)

	const limit = 10

	useEffect(() => {
		fetchData()
	}, [page, searchTerm, selectedCategory, selectedYear])

	const fetchData = async () => {
		setIsLoading(true)
		setError(null)
		try {
			// Fetch categories and years if not already loaded
			if (categories.length === 0) {
				const categoriesData = await DocumentCategoryService.getAll()
				setCategories(categoriesData.results || [])
			}

			if (years.length === 0) {
				const yearsData = await EducationYearService.getAll()
				setYears(yearsData.results || [])
			}

			// Fetch documents with filters
			const params: any = {
				page,
				limit,
			}

			if (selectedCategory) {
				params.categoryId = selectedCategory
			}

			if (selectedYear) {
				params.yearId = selectedYear
			}

			const documentsData = await DocumentsService.getAll(params)
			setDocuments(documentsData.results || [])
			setTotalPages(Math.ceil((documentsData.count || 0) / limit))
		} catch (err) {
			setError('Не удалось загрузить данные')
			console.error('Error fetching data:', err)
		} finally {
			setIsLoading(false)
		}
	}

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value)
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
		setPage(1) // Reset to first page when searching
	}

	const handleCategoryChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setSelectedCategory(event.target.value as string)
		setPage(1)
	}

	const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectedYear(event.target.value as string)
		setPage(1)
	}

	const handleAddDocument = () => {
		router.push('/admin/documents/create')
	}

	const handleEditDocument = (id: number) => {
		router.push(`/admin/documents/edit/${id}`)
	}

	const handleDownloadDocument = (fileUrl: string) => {
		window.open(fileUrl, '_blank')
	}

	const handleDeleteClick = (document: Document) => {
		setDocumentToDelete(document)
		setDeleteDialogOpen(true)
	}

	const handleDeleteConfirm = async () => {
		if (!documentToDelete) return

		setIsDeleting(true)
		try {
			await DocumentsService.delete(documentToDelete.id)
			setDocuments(documents.filter(item => item.id !== documentToDelete.id))
			setDeleteDialogOpen(false)
			setDocumentToDelete(null)
		} catch (err) {
			setError('Не удалось удалить документ')
			console.error('Error deleting document:', err)
		} finally {
			setIsDeleting(false)
		}
	}

	const handleDeleteCancel = () => {
		setDeleteDialogOpen(false)
		setDocumentToDelete(null)
	}

	const filteredDocuments = documents.filter(item =>
		item.title.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<Container maxWidth='xl'>
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
					sx={{ fontWeight: 700, color: 'primary.main' }}
				>
					Управление документами
				</Typography>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					onClick={handleAddDocument}
				>
					Добавить документ
				</Button>
			</Box>

			{error && (
				<Alert severity='error' sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			<Paper elevation={2} sx={{ mb: 3, p: 2 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							variant='outlined'
							placeholder='Поиск документов...'
							value={searchTerm}
							onChange={handleSearchChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchIcon />
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={3}>
						<FormControl fullWidth>
							<InputLabel>Категория</InputLabel>
							<Select
								value={selectedCategory}
								onChange={handleCategoryChange}
								label='Категория'
							>
								<MenuItem value=''>Все категории</MenuItem>
								{categories.map(category => (
									<MenuItem key={category.id} value={category.id.toString()}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={3}>
						<FormControl fullWidth>
							<InputLabel>Учебный год</InputLabel>
							<Select
								value={selectedYear}
								onChange={handleYearChange}
								label='Учебный год'
							>
								<MenuItem value=''>Все годы</MenuItem>
								{years.map(year => (
									<MenuItem key={year.id} value={year.id.toString()}>
										{year.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Paper>

			<TableContainer component={Paper}>
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
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={5} align='center' sx={{ py: 3 }}>
									<CircularProgress />
								</TableCell>
							</TableRow>
						) : filteredDocuments.length > 0 ? (
							filteredDocuments.map(item => (
								<TableRow key={item.id}>
									<TableCell>{item.title}</TableCell>
									<TableCell>
										{categories.find(c => c.id === item.categoryId)?.name ||
											'Неизвестно'}
									</TableCell>
									<TableCell>
										{years.find(y => y.id === item.yearId)?.name ||
											'Неизвестно'}
									</TableCell>
									<TableCell>
										{new Date(item.createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell align='right'>
										<IconButton
											color='info'
											onClick={() => handleDownloadDocument(item.file)}
										>
											<DownloadIcon />
										</IconButton>
										<IconButton
											color='primary'
											onClick={() => handleEditDocument(item.id)}
										>
											<EditIcon />
										</IconButton>
										<IconButton
											color='error'
											onClick={() => handleDeleteClick(item)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} align='center'>
									Документы не найдены
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{totalPages > 1 && (
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						color='primary'
					/>
				</Box>
			)}

			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
				<DialogTitle>Подтверждение удаления</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Вы уверены, что хотите удалить документ "{documentToDelete?.title}"?
						Это действие нельзя отменить.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteCancel} disabled={isDeleting}>
						Отмена
					</Button>
					<Button
						onClick={handleDeleteConfirm}
						color='error'
						disabled={isDeleting}
					>
						{isDeleting ? <CircularProgress size={24} /> : 'Удалить'}
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}
