'use client'

import { EducationYearService } from '@/src/service/edu-years.service'
import type { EducationYear } from '@/src/types'
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

export default function YearsPage() {
	const [years, setYears] = useState<EducationYear[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [editingYear, setEditingYear] = useState<EducationYear | null>(null)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [yearToDelete, setYearToDelete] = useState<EducationYear | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<{ year: string }>({
		defaultValues: {
			year: '',
		},
	})

	useEffect(() => {
		fetchYears()
	}, [])

	const fetchYears = async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await EducationYearService.getAll()
			setYears(response || [])
		} catch (err) {
			setError('Не удалось загрузить учебные годы')
			console.error('Error fetching years:', err)
		} finally {
			setIsLoading(false)
		}
	}

	const handleOpenDialog = (year?: EducationYear) => {
		if (year) {
			setEditingYear(year)
			reset({ year: year.year })
		} else {
			setEditingYear(null)
			reset({ year: '' })
		}
		setDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setDialogOpen(false)
	}

	const onSubmit = async (data: { year: string }) => {
		setIsSubmitting(true)
		setError(null)

		try {
			if (editingYear) {
				const updatedYear = await EducationYearService.update(
					editingYear.id,
					data
				)

				setYears(
					years.map(y =>
						y.id === editingYear.id ? { ...y, ...updatedYear } : y
					)
				)
			} else {
				const newYear = await EducationYearService.create(data)
				setYears([...years, newYear])
			}
			handleCloseDialog()
		} catch (err) {
			setError('Не удалось сохранить учебный год')
			console.error('Error saving year:', err)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleDeleteClick = (year: EducationYear) => {
		setYearToDelete(year)
		setDeleteDialogOpen(true)
	}

	const handleDeleteConfirm = async () => {
		if (!yearToDelete) return

		setIsDeleting(true)
		try {
			await EducationYearService.delete(+yearToDelete.id)
			setYears(years.filter(y => y.id !== yearToDelete.id))
			setDeleteDialogOpen(false)
			setYearToDelete(null)
		} catch (err) {
			setError('Не удалось удалить учебный год')
			console.error('Error deleting year:', err)
		} finally {
			setIsDeleting(false)
		}
	}

	const handleDeleteCancel = () => {
		setDeleteDialogOpen(false)
		setYearToDelete(null)
	}

	return (
		<Container maxWidth='xl'>
			<Breadcrumbs aria-label='breadcrumb' sx={{ mb: 2 }}>
				<Link href='/admin'>Панель управления</Link>
				<Link href='/admin/documents'>Документы</Link>
				<Typography color='text.primary'>Учебные годы</Typography>
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
					Учебные годы
				</Typography>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					onClick={() => handleOpenDialog()}
				>
					Добавить учебный год
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
							<TableCell>Год</TableCell>
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
						) : years.length > 0 ? (
							years.map(year => (
								<TableRow key={year.id}>
									<TableCell>{year.year}</TableCell>
									<TableCell align='right'>
										<IconButton
											color='primary'
											onClick={() => handleOpenDialog(year)}
										>
											<EditIcon />
										</IconButton>
										<IconButton
											color='error'
											onClick={() => handleDeleteClick(year)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={2} align='center'>
									Учебные годы не найдены
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Dialog for adding/editing year */}
			<Dialog
				open={dialogOpen}
				onClose={handleCloseDialog}
				maxWidth='sm'
				fullWidth
			>
				<DialogTitle>
					{editingYear ? 'Редактировать учебный год' : 'Добавить учебный год'}
				</DialogTitle>
				<DialogContent>
					<Box component='form' noValidate sx={{ mt: 1 }}>
						<Controller
							name='year'
							control={control}
							rules={{ required: 'Год обязателен' }}
							render={({ field }) => (
								<TextField
									{...field}
									margin='normal'
									required
									fullWidth
									label='Учебный год'
									error={!!errors.year}
									helperText={errors.year?.message}
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
						Вы уверены, что хотите удалить учебный год "{yearToDelete?.year}"?
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
