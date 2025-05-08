'use client'

import type React from 'react'

import { TeacherService } from '@/src/service/teacher.service'
import {
	Email as EmailIcon,
	Phone as PhoneIcon,
	Search as SearchIcon,
} from '@mui/icons-material'
import {
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardContent,
	Chip,
	Container,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Pagination,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'

interface TeachersPageProps {
	params: Promise<{
		lang: string
	}>
}

export default function TeachersPage({
	params: paramsPromise,
}: TeachersPageProps) {
	// Unwrap the params Promise using React.use()
	const params = use(paramsPromise)
	const { lang } = params

	const [loading, setLoading] = useState(true)
	const [teachers, setTeachers] = useState<any[]>([])
	const [totalCount, setTotalCount] = useState(0)
	const [page, setPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedDepartment, setSelectedDepartment] = useState('')
	const [selectedPosition, setSelectedPosition] = useState('')

	// Локализованные тексты
	const texts = {
		uz: {
			title: "O'qituvchilar",
			breadcrumbHome: 'Bosh sahifa',
			breadcrumbTeachers: "O'qituvchilar",
			search: "O'qituvchilarni qidirish...",
			department: 'Kafedra',
			allDepartments: 'Barcha kafedralar',
			position: 'Lavozim',
			allPositions: 'Barcha lavozimlar',
			viewProfile: "Profilni ko'rish",
			noResults: "O'qituvchilar topilmadi",
			email: 'Email',
			phone: 'Telefon',
		},
		ru: {
			title: 'Преподаватели',
			breadcrumbHome: 'Главная',
			breadcrumbTeachers: 'Преподаватели',
			search: 'Поиск преподавателей...',
			department: 'Кафедра',
			allDepartments: 'Все кафедры',
			position: 'Должность',
			allPositions: 'Все должности',
			viewProfile: 'Просмотреть профиль',
			noResults: 'Преподаватели не найдены',
			email: 'Email',
			phone: 'Телефон',
		},
		en: {
			title: 'Teachers',
			breadcrumbHome: 'Home',
			breadcrumbTeachers: 'Teachers',
			search: 'Search teachers...',
			department: 'Department',
			allDepartments: 'All departments',
			position: 'Position',
			allPositions: 'All positions',
			viewProfile: 'View profile',
			noResults: 'No teachers found',
			email: 'Email',
			phone: 'Phone',
		},
	}

	const t = texts[lang as keyof typeof texts] || texts.ru

	// Моковые данные для кафедр
	const departments = [
		{ id: 1, name: 'Кафедра информационных технологий' },
		{ id: 2, name: 'Кафедра экономики' },
		{ id: 3, name: 'Кафедра иностранных языков' },
		{ id: 4, name: 'Кафедра математики' },
		{ id: 5, name: 'Кафедра физики' },
	]

	// Моковые данные для должностей
	const positions = [
		{ id: 1, name: 'Профессор' },
		{ id: 2, name: 'Доцент' },
		{ id: 3, name: 'Старший преподаватель' },
		{ id: 4, name: 'Преподаватель' },
		{ id: 5, name: 'Ассистент' },
	]

	useEffect(() => {
		fetchTeachers()
	}, [page, selectedDepartment, selectedPosition])

	const fetchTeachers = async () => {
		setLoading(true)
		try {
			const params: any = {
				page,
				limit: 9,
			}

			if (selectedDepartment) {
				params.department = selectedDepartment
			}

			if (selectedPosition) {
				params.position = selectedPosition
			}

			const { results, count } = await TeacherService.getAll(params)
			setTeachers(results)
			setTotalCount(count)
		} catch (error) {
			console.error('Error fetching teachers:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleSearch = () => {
		// In a real implementation, you would add search to the API params
		// For now, we'll just reset the page and fetch
		setPage(1)
		fetchTeachers()
	}

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
	}

	const handleDepartmentChange = (event: any) => {
		setSelectedDepartment(event.target.value as string)
		setPage(1)
	}

	const handlePositionChange = (event: any) => {
		setSelectedPosition(event.target.value as string)
		setPage(1)
	}

	return (
		<>
			<Box sx={{ bgcolor: '#f5f5f5', py: 3 }}>
				<Container>
					<Breadcrumbs aria-label='breadcrumb'>
						<Link href={`/${lang}`} passHref>
							{t.breadcrumbHome}
						</Link>
						<Typography color='text.primary'>{t.breadcrumbTeachers}</Typography>
					</Breadcrumbs>
					<Typography
						variant='h4'
						component='h1'
						sx={{ mt: 2, fontWeight: 700, color: 'primary.main' }}
					>
						{t.title}
					</Typography>
				</Container>
			</Box>

			<Container sx={{ py: 5 }}>
				<Grid container spacing={3}>
					{/* Фильтры и поиск */}
					<Grid size={12}>
						<Box sx={{ mb: 4 }}>
							<Grid container spacing={2}>
								<Grid size={5}>
									<TextField
										fullWidth
										placeholder={t.search}
										variant='outlined'
										value={searchQuery}
										onChange={e => setSearchQuery(e.target.value)}
										onKeyPress={e => e.key === 'Enter' && handleSearch()}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<SearchIcon />
												</InputAdornment>
											),
											endAdornment: (
												<InputAdornment position='end'>
													<Button onClick={handleSearch}>Search</Button>
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid size={3}>
									<FormControl fullWidth variant='outlined'>
										<InputLabel>{t.department}</InputLabel>
										<Select
											label={t.department}
											value={selectedDepartment}
											onChange={handleDepartmentChange}
										>
											<MenuItem value=''>{t.allDepartments}</MenuItem>
											{departments.map(department => (
												<MenuItem
													key={department.id}
													value={department.id.toString()}
												>
													{department.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid size={3}>
									<FormControl fullWidth variant='outlined'>
										<InputLabel>{t.position}</InputLabel>
										<Select
											label={t.position}
											value={selectedPosition}
											onChange={handlePositionChange}
										>
											<MenuItem value=''>{t.allPositions}</MenuItem>
											{positions.map(position => (
												<MenuItem
													key={position.id}
													value={position.id.toString()}
												>
													{position.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</Box>
					</Grid>

					{/* Список преподавателей */}
					{loading ? (
						// Loading skeleton
						Array.from(new Array(6)).map((_, index) => (
							<Grid size={4}>
								<Card
									sx={{
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Box
										sx={{
											position: 'relative',
											width: '100%',
											pt: '75%',
											bgcolor: 'grey.200',
										}}
									/>
									<CardContent>
										<Box
											sx={{
												height: 20,
												width: '80%',
												mb: 1,
												bgcolor: 'grey.200',
											}}
										/>
										<Box
											sx={{
												height: 15,
												width: '60%',
												mb: 1,
												bgcolor: 'grey.200',
											}}
										/>
										<Box
											sx={{
												height: 15,
												width: '70%',
												mb: 2,
												bgcolor: 'grey.200',
											}}
										/>
										<Box
											sx={{
												height: 15,
												width: '40%',
												mb: 1,
												bgcolor: 'grey.200',
											}}
										/>
										<Box
											sx={{
												height: 15,
												width: '50%',
												mb: 2,
												bgcolor: 'grey.200',
											}}
										/>
										<Box
											sx={{ height: 36, width: '100%', bgcolor: 'grey.200' }}
										/>
									</CardContent>
								</Card>
							</Grid>
						))
					) : teachers.length > 0 ? (
						teachers.map(teacher => (
							<Grid size={4}>
								<Card
									sx={{
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Box sx={{ position: 'relative', width: '100%', pt: '75%' }}>
										<Image
											src={teacher.logo_teacher || '/default-avatar.png'}
											alt={teacher.full_name}
											fill
											style={{ objectFit: 'cover' }}
										/>
									</Box>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography variant='h6' component='h2' gutterBottom>
											{teacher.full_name}
										</Typography>
										<Typography
											variant='body2'
											color='text.secondary'
											gutterBottom
										>
											{positions.find(p => p.id === teacher.position_id)
												?.name || 'Преподаватель'}
										</Typography>
										<Typography
											variant='body2'
											color='text.secondary'
											gutterBottom
										>
											{departments.find(d => d.id === teacher.department_id)
												?.name || 'Кафедра'}
										</Typography>

										{teacher.degrees && (
											<Box sx={{ mt: 1, mb: 2 }}>
												{teacher.degrees.map(
													(degree: string, index: number) => (
														<Chip
															key={index}
															label={degree}
															size='small'
															sx={{ mr: 0.5, mb: 0.5 }}
														/>
													)
												)}
											</Box>
										)}

										{teacher.email && (
											<Box
												sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
											>
												<EmailIcon
													fontSize='small'
													sx={{ mr: 1, color: 'text.secondary' }}
												/>
												<Typography variant='body2'>{teacher.email}</Typography>
											</Box>
										)}

										{teacher.phone_number && (
											<Box
												sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
											>
												<PhoneIcon
													fontSize='small'
													sx={{ mr: 1, color: 'text.secondary' }}
												/>
												<Typography variant='body2'>
													{teacher.phone_number}
												</Typography>
											</Box>
										)}

										<Button
											variant='outlined'
											fullWidth
											component={Link}
											href={`/${lang}/teachers/${teacher.id}`}
										>
											{t.viewProfile}
										</Button>
									</CardContent>
								</Card>
							</Grid>
						))
					) : (
						<Grid size={12}>
							<Box sx={{ textAlign: 'center', py: 5 }}>
								<Typography variant='h6' color='text.secondary'>
									{t.noResults}
								</Typography>
							</Box>
						</Grid>
					)}

					{/* Пагинация */}
					{!loading && teachers.length > 0 && (
						<Grid
							size={12}
							sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
						>
							<Pagination
								count={Math.ceil(totalCount / 9)}
								page={page}
								onChange={handlePageChange}
								color='primary'
							/>
						</Grid>
					)}
				</Grid>
			</Container>
		</>
	)
}
