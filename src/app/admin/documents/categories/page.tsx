'use client'

import { DocumentCategoryService } from '@/src/service/docs-category.service'
import { DocumentCategory } from '@/src/types'
import {
	Add as AddIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
} from '@mui/icons-material'
import {
	Alert,
	Box,
	Breadcrumbs,
	Button,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
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
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function CategoriesPage() {
	const [categories, setCategories] = useState<DocumentCategory[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [editingCategory, setEditingCategory] =
		useState<DocumentCategory | null>(null)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [categoryToDelete, setCategoryToDelete] =
		useState<DocumentCategory | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<{ name: string; description: string }>({
		defaultValues: {
			name: '',
			description: '',
		},
	})

	useEffect(() => {
		fetchCategories()
	}, [])

	const fetchCategories = async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await DocumentCategoryService.getAll()
			setCategories(response.results || [])
		} catch (err) {
			setError('Не удалось загрузить категории')
			console.error('Error fetching categories:', err)
		} finally {
			setIsLoading(false)
		}
	}

	const handleOpenDialog = (category?: DocumentCategory) => {
		if (category) {
			setEditingCategory(category)
			reset({
				name: category.name,
				description: category.description || '',
			})
		} else {
			setEditingCategory(null)
			reset({
				name: '',
				description: '',
			})
		}
		setDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setDialogOpen(false)
	}

	const onSubmit = async (data: { name: string; description: string }) => {
		setIsSubmitting(true)
		setError(null)

		try {
			if (editingCategory) {
				// Update existing category
				const updatedCategory = await DocumentCategoryService.update(
					editingCategory.id,
					data
				)
				setCategories(
					categories.map(cat =>
						cat.id === editingCategory.id ? { ...cat, ...updatedCategory } : cat
					)
				)
			} else {
				// Create new category
				const newCategory = await DocumentCategoryService.create(data)
				setCategories([...categories, newCategory])
			}
			handleCloseDialog()
		} catch (err) {
			setError('Не удалось сохранить категорию')
			console.error('Error saving category:', err)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleDeleteClick = (category: DocumentCategory) => {
		setCategoryToDelete(category)
		setDeleteDialogOpen(true)
	}

	const handleDeleteConfirm = async () => {
		if (!categoryToDelete) return

		setIsDeleting(true)
		try {
			await DocumentCategoryService.delete(categoryToDelete.id)
			setCategories(categories.filter(cat => cat.id !== categoryToDelete.id))
			setDeleteDialogOpen(false)
			setCategoryToDelete(null)
		} catch (err) {
			setError('Не удалось удалить категорию')
			console.error('Error deleting category:', err)
		} finally {
			setIsDeleting(false)
		}
	}

	const handleDeleteCancel = () => {
		setDeleteDialogOpen(false)
		setCategoryToDelete(null)
	}

	return (
		<Container maxWidth='xl'>
			<Breadcrumbs aria-label='breadcrumb' sx={{ mb: 2 }}>
				<Link href='/admin'>Панель управления</Link>
				<Link href='/admin/documents'>Документы</Link>
				<Typography color='text.primary'>Категории</Typography>
			</Breadcrumbs>

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
					Категории документов
				</Typography>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					onClick={() => handleOpenDialog()}
				>
					Добавить категорию
				</Button>
			</Box>

			{error && (
				<Alert severity='error' sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Название</TableCell>
							<TableCell>Описание</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={3} align='center' sx={{ py: 3 }}>
									<CircularProgress />
								</TableCell>
							</TableRow>
						) : categories.length > 0 ? (
							categories.map(category => (
								<TableRow key={category.id}>
									<TableCell>{category.name}</TableCell>
									<TableCell>{category.description || '—'}</TableCell>
									<TableCell align='right'>
										<IconButton
											color='primary'
											onClick={() => handleOpenDialog(category)}
										>
											<EditIcon />
										</IconButton>
										<IconButton
											color='error'
											onClick={() => handleDeleteClick(category)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={3} align='center'>
									Категории не найдены
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Category Form Dialog */}
			<Dialog
				open={dialogOpen}
				onClose={handleCloseDialog}
				maxWidth='sm'
				fullWidth
			>
				<DialogTitle>
					{editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
				</DialogTitle>
				<DialogContent>
					<Box component='form' noValidate sx={{ mt: 1 }}>
						<Controller
							name='name'
							control={control}
							rules={{ required: 'Название обязательно' }}
							render={({ field }) => (
								<TextField
									{...field}
									margin='normal'
									required
									fullWidth
									label='Название категории'
									error={!!errors.name}
									helperText={errors.name?.message}
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
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} disabled={isSubmitting}>
						Отмена
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						variant='contained'
						disabled={isSubmitting}
					>
						{isSubmitting ? <CircularProgress size={24} /> : 'Сохранить'}
					</Button>
				</DialogActions>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
				<DialogTitle>Подтверждение удаления</DialogTitle>
				<DialogContent>
					<Typography>
						Вы уверены, что хотите удалить категорию "{categoryToDelete?.name}"?
						Это действие нельзя отменить.
					</Typography>
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
