'use client'

import type React from 'react'

import { TeacherService } from '@/src/service/teacher.service'
import type { Teacher } from '@/src/types'
import {
	Add as AddIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	NavigateNext,
	Search as SearchIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material'
import {
	Alert,
	Avatar,
	Box,
	Breadcrumbs,
	Button,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
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
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TeachersPage() {
	const router = useRouter()
	const [teachers, setTeachers] = useState<Teacher[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null)
	const [isDeleting, setIsDeleting] = useState(false)

	const limit = 10

	useEffect(() => {
		fetchTeachers()
	}, [page, searchTerm])

	const fetchTeachers = async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await TeacherService.getAll({
				page,
				limit,
			})

			console.log('Teachers response:', response)
			setTeachers(response.results || [])
			setTotalPages(Math.ceil((response.count || 0) / limit))
		} catch (err) {
			setError('Не удалось загрузить преподавателей')
			console.error('Error fetching teachers:', err)
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

	const handleAddTeacher = () => {
		router.push('/admin/teachers/create')
	}

	const handleEditTeacher = (id: string) => {
		router.push(`/admin/teachers/edit/${id}`)
	}

	const handleViewTeacher = (id: string) => {
		window.open(`/teachers/${id}`, '_blank')
	}

	const handleDeleteClick = (teacher: Teacher) => {
		setTeacherToDelete(teacher)
		setDeleteDialogOpen(true)
	}

	const handleDeleteConfirm = async () => {
		if (!teacherToDelete) return

		setIsDeleting(true)
		try {
			await TeacherService.delete(teacherToDelete.id)
			setTeachers(teachers.filter(item => item.id !== teacherToDelete.id))
			setDeleteDialogOpen(false)
			setTeacherToDelete(null)
		} catch (err) {
			setError('Не удалось удалить преподавателя')
			console.error('Error deleting teacher:', err)
		} finally {
			setIsDeleting(false)
		}
	}

	const handleDeleteCancel = () => {
		setDeleteDialogOpen(false)
		setTeacherToDelete(null)
	}

	// Helper function to get teacher's full name
	const getTeacherFullName = (teacher: Teacher): string => {
		return teacher.full_name || 'Имя не указано'
	}

	// Helper function to get teacher's position
	const getTeacherPosition = (teacher: Teacher): string => {
		const positions = {
			1: 'Преподаватель',
			2: 'Доцент',
			3: 'Профессор',
			4: 'Заведующий кафедрой',
		}

		return (
			positions[teacher.position_id as keyof typeof positions] ||
			`Должность ${teacher.position_id}` ||
			'Не указано'
		)
	}

	// Helper function to get teacher image
	const getTeacherImage = (teacher: Teacher): string => {
		return teacher.logo_teacher || '/default-avatar.png'
	}

	const filteredTeachers = teachers.filter(item => {
		const fullName = getTeacherFullName(item).toLowerCase()
		const position = getTeacherPosition(item).toLowerCase()
		const username = (item.username || '').toLowerCase()

		return (
			fullName.includes(searchTerm.toLowerCase()) ||
			position.includes(searchTerm.toLowerCase()) ||
			username.includes(searchTerm.toLowerCase())
		)
	})

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
				<Box>
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
						<Typography color='text.primary'>Преподаватели</Typography>
					</Breadcrumbs>
					<Typography
						variant='h4'
						component='h1'
						sx={{ fontWeight: 700, color: 'primary.main' }}
					>
						Управление преподавателями
					</Typography>
				</Box>
				<Button
					variant='contained'
					startIcon={<AddIcon />}
					onClick={handleAddTeacher}
				>
					Добавить преподавателя
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
					placeholder='Поиск преподавателей...'
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
							<TableCell>Фото</TableCell>
							<TableCell>ФИО</TableCell>
							<TableCell>Должность</TableCell>
							<TableCell>Логин</TableCell>
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
						) : filteredTeachers.length > 0 ? (
							filteredTeachers.map(item => (
								<TableRow key={item.id}>
									<TableCell>
										<Avatar
											src={getTeacherImage(item)}
											alt={getTeacherFullName(item)}
											sx={{ width: 50, height: 50 }}
										/>
									</TableCell>
									<TableCell>{getTeacherFullName(item)}</TableCell>
									<TableCell>{getTeacherPosition(item)}</TableCell>
									<TableCell>{item.username || '—'}</TableCell>
									<TableCell align='right'>
										<IconButton
											color='info'
											onClick={() => handleViewTeacher(item.id)}
										>
											<VisibilityIcon />
										</IconButton>
										<IconButton
											color='primary'
											onClick={() => handleEditTeacher(item.id)}
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
									Преподаватели не найдены
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
						Вы уверены, что хотите удалить преподавателя "
						{teacherToDelete ? getTeacherFullName(teacherToDelete) : ''}"? Это
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
		</Container>
	)
}
