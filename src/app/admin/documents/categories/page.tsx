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
	} = useForm<{ category_name: string }>({
		defaultValues: {
			category_name: '',
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
			setCategories(response || [])
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
			reset({ category_name: category.category_name })
		} else {
			setEditingCategory(null)
			reset({ category_name: '' })
		}
		setDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setDialogOpen(false)
	}

	const onSubmit = async (data: { category_name: string }) => {
		setIsSubmitting(true)
		setError(null)

		try {
			if (editingCategory) {
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
							<TableCell sx={{ width: '100%' }}>Название</TableCell>
							<TableCell align='right'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={2} align='center' sx={{ py: 3 }}>
									<CircularProgress />
								</TableCell>
							</TableRow>
						) : categories.length > 0 ? (
							categories.map(category => (
								<TableRow key={category.id}>
									<TableCell>{category.category_name}</TableCell>
									<TableCell align='right'>
										<Box display='flex' gap={1} justifyContent='flex-end'>
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
										</Box>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={2} align='center'>
									Категории не найдены
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Dialog для добавления/редактирования категории */}
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
							name='category_name'
							control={control}
							rules={{ required: 'Название обязательно' }}
							render={({ field }) => (
								<TextField
									{...field}
									margin='normal'
									required
									fullWidth
									label='Название категории'
									error={!!errors.category_name}
									helperText={errors.category_name?.message}
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

			{/* Подтверждение удаления */}
			<Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
				<DialogTitle>Подтверждение удаления</DialogTitle>
				<DialogContent>
					<Typography>
						Вы уверены, что хотите удалить категорию "
						{categoryToDelete?.category_name}"? Это действие нельзя отменить.
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
