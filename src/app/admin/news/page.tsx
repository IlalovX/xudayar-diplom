'use client'

import type React from 'react'

import { NewsService } from '@/src/service/news.service'
import type { News } from '@/src/types'
import {
	Add as AddIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	Image as ImageIcon,
	Search as SearchIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material'
import {
	Alert,
	Avatar,
	AvatarGroup,
	Box,
	Button,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	IconButton,
	InputAdornment,
	Pagination,
	Paper,
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

export default function NewsPage() {
	const router = useRouter()
	const [news, setNews] = useState<News[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [newsToDelete, setNewsToDelete] = useState<News | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)
	const [selectedImages, setSelectedImages] = useState<string[]>([])
	const [imageDialogOpen, setImageDialogOpen] = useState(false)

	const limit = 10

	useEffect(() => {
		fetchNews()
	}, [page, searchTerm])

	const fetchNews = async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await NewsService.getAll({
				page,
				limit,
				// Add search parameter if needed in your API
			})

			setNews(response || [])
			setTotalPages(Math.ceil((response.count || 0) / limit))
		} catch (err) {
			setError('Не удалось загрузить новости')
			console.error('Error fetching news:', err)
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

	const handleAddNews = () => {
		router.push('/admin/news/create')
	}

	const handleEditNews = (id: number) => {
		router.push(`/admin/news/edit/${id}`)
	}

	const handleViewNews = (slug: string) => {
		window.open(`/news/${slug}`, '_blank')
	}

	const handleDeleteClick = (newsItem: News) => {
		setNewsToDelete(newsItem)
		setDeleteDialogOpen(true)
	}

	const handleDeleteConfirm = async () => {
		if (!newsToDelete) return

		setIsDeleting(true)
		try {
			await NewsService.delete(newsToDelete.id)
			setNews(news.filter(item => item.id !== newsToDelete.id))
			setDeleteDialogOpen(false)
			setNewsToDelete(null)
		} catch (err) {
			setError('Не удалось удалить новость')
			console.error('Error deleting news:', err)
		} finally {
			setIsDeleting(false)
		}
	}

	const handleDeleteCancel = () => {
		setDeleteDialogOpen(false)
		setNewsToDelete(null)
	}

	const handleViewImages = (newsItem: News) => {
		if (newsItem.images) {
			const imageUrls = Object.values(newsItem.images)
			setSelectedImages(imageUrls)
			setImageDialogOpen(true)
		}
	}

	const filteredNews = news.filter(
		item =>
			item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(item.text && item.text.toLowerCase().includes(searchTerm.toLowerCase()))
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
					Управление новостями
				</Typography>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					onClick={handleAddNews}
				>
					Добавить новость
				</Button>
			</Box>

			{error && (
				<Alert severity='error' sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			<Paper elevation={2} sx={{ mb: 3, p: 2 }}>
				<TextField
					fullWidth
					variant='outlined'
					placeholder='Поиск новостей...'
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
			</Paper>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Заголовок</TableCell>
							<TableCell>Изображения</TableCell>
							<TableCell>Дата создания</TableCell>
							<TableCell>Дата обновления</TableCell>
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
						) : filteredNews.length > 0 ? (
							filteredNews.map(item => (
								<TableRow key={item.id}>
									<TableCell>{item.title}</TableCell>
									<TableCell>
										{item.images && Object.keys(item.images).length > 0 ? (
											<Box sx={{ display: 'flex', alignItems: 'center' }}>
												<AvatarGroup
													max={3}
													sx={{ cursor: 'pointer' }}
													onClick={() => handleViewImages(item)}
												>
													{Object.values(item.images).map((imgUrl, index) => (
														<Avatar
															key={index}
															src={imgUrl}
															alt={`Image ${index + 1}`}
														/>
													))}
												</AvatarGroup>
												<IconButton
													size='small'
													onClick={() => handleViewImages(item)}
												>
													<ImageIcon />
												</IconButton>
											</Box>
										) : (
											'Нет изображений'
										)}
									</TableCell>
									<TableCell>
										{item.createdAt
											? new Date(item.createdAt).toLocaleDateString()
											: '—'}
									</TableCell>
									<TableCell>
										{item.updatedAt
											? new Date(item.updatedAt).toLocaleDateString()
											: '—'}
									</TableCell>
									<TableCell align='right'>
										{item.slug && (
											<IconButton
												color='info'
												onClick={() => handleViewNews(item.slug as string)}
											>
												<VisibilityIcon />
											</IconButton>
										)}
										<IconButton
											color='primary'
											onClick={() => handleEditNews(item.id)}
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
									Новости не найдены
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
						Вы уверены, что хотите удалить новость "{newsToDelete?.title}"? Это
						действие нельзя отменить.
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

			{/* Image Preview Dialog */}
			<Dialog
				open={imageDialogOpen}
				onClose={() => setImageDialogOpen(false)}
				maxWidth='md'
				fullWidth
			>
				<DialogTitle>Изображения</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						{selectedImages.map((imgUrl, index) => (
							<Grid size={4} key={index}>
								<Box
									component='img'
									src={imgUrl}
									alt={`Image ${index + 1}`}
									sx={{
										width: '100%',
										height: 'auto',
										borderRadius: 1,
										boxShadow: 1,
									}}
								/>
							</Grid>
						))}
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setImageDialogOpen(false)}>Закрыть</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}
