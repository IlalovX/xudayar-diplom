'use client'

import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'

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
	SelectChangeEvent,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'

import { DocumentCategoryService } from '@/src/service/docs-category.service'
import { DocsDocument, DocumentsService } from '@/src/service/documents.service'
import { EducationYearService } from '@/src/service/edu-years.service'
import type { DocumentCategory, EducationYear } from '@/src/types'

export default function DocumentsPage() {
	const router = useRouter()
	const [documents, setDocuments] = useState<DocsDocument[]>([])
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
	const [documentToDelete, setDocumentToDelete] = useState<DocsDocument | null>(
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
			if (categories.length === 0) {
				const categoriesData = await DocumentCategoryService.getAll()
				setCategories(categoriesData || [])
			}
			if (years.length === 0) {
				const yearsData = await EducationYearService.getAll()
				setYears(yearsData || [])
			}

			const params: any = { page, limit }

			if (selectedCategory) params.categoryId = selectedCategory
			if (selectedYear) params.yearId = selectedYear

			const response = await DocumentsService.getAll(params)
			setDocuments((response as DocsDocument[]) || [])
			setTotalPages(Math.ceil((response.length || 0) / limit))
		} catch (err) {
			setError('Не удалось загрузить данные')
			console.error('Error fetching data:', err)
		} finally {
			setIsLoading(false)
		}
	}

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
		setPage(1)
	}

	const handleCategoryChange = (event: SelectChangeEvent) => {
		setSelectedCategory(event.target.value)
		setPage(1)
	}

	const handleYearChange = (event: SelectChangeEvent) => {
		setSelectedYear(event.target.value)
		setPage(1)
	}

	const handleAddDocument = () => {
		router.push('/admin/documents/create')
	}

	const handleEditDocument = (id: string) => {
		router.push(`/admin/documents/edit/${id}`)
	}

	const handleDownloadDocument = (fileUrl: string) => {
		window.open(fileUrl, '_blank')
	}

	const handleDeleteClick = (document: DocsDocument) => {
		setDocumentToDelete(document)
		setDeleteDialogOpen(true)
	}

	const handleDeleteConfirm = async () => {
		if (!documentToDelete) return
		setIsDeleting(true)
		try {
			await DocumentsService.delete(documentToDelete.id)
			setDocuments(prev => prev.filter(doc => doc.id != documentToDelete.id))
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

	const filteredDocuments = documents.filter(doc => doc)

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
					<Grid size={5}>
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
					<Grid size={3}>
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
										{category.category_name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid size={2}>
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
										{year.year}
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
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={5} align='center'>
									<CircularProgress />
								</TableCell>
							</TableRow>
						) : filteredDocuments.length > 0 ? (
							filteredDocuments.map(doc => (
								<TableRow key={doc.id}>
									<TableCell>{doc.document_name}</TableCell>
									<TableCell>
										{categories?.find(c => c.id == doc.category_id)
											?.category_name || '—'}
									</TableCell>
									<TableCell>
										{years.find(y => y.id === doc.document_year)?.year ||
											'Неизвестно'}
									</TableCell>

									<TableCell align='right'>
										<IconButton
											color='info'
											onClick={() => handleDownloadDocument(doc.document)}
										>
											<DownloadIcon />
										</IconButton>
										<IconButton
											color='primary'
											onClick={() => handleEditDocument(doc.id)}
										>
											<EditIcon />
										</IconButton>
										<IconButton
											color='error'
											onClick={() => handleDeleteClick(doc)}
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
					/>
				</Box>
			)}

			<Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
				<DialogTitle>Удалить документ</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Вы уверены, что хотите удалить документ{' '}
						<strong>{documentToDelete?.document_name}</strong>?
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
						{isDeleting ? 'Удаление...' : 'Удалить'}
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}
