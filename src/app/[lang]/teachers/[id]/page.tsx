'use client'

import { TeacherService } from '@/src/service/teacher.service'
import {
	Email as EmailIcon,
	LocationOn as LocationIcon,
	Phone as PhoneIcon,
	School as SchoolIcon,
	Work as WorkIcon,
} from '@mui/icons-material'
import {
	Box,
	Breadcrumbs,
	Card,
	CardContent,
	Chip,
	CircularProgress,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'

interface TeacherProfilePageProps {
	params: Promise<{
		lang: string
		id: string
	}>
}

export default function TeacherProfilePage({
	params: paramsPromise,
}: TeacherProfilePageProps) {
	// Unwrap the params Promise using React.use()
	const params = use(paramsPromise)
	const { lang, id } = params

	const [teacher, setTeacher] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Локализованные тексты
	const texts = {
		uz: {
			title: "O'qituvchi profili",
			breadcrumbHome: 'Bosh sahifa',
			breadcrumbTeachers: "O'qituvchilar",
			breadcrumbProfile: 'Profil',
			contactInfo: "Aloqa ma'lumotlari",
			email: 'Email',
			phone: 'Telefon',
			department: 'Kafedra',
			position: 'Lavozim',
			education: "Ta'lim",
			experience: 'Tajriba',
			publications: 'Nashrlar',
			biography: 'Biografiya',
			notFound: "O'qituvchi topilmadi",
			backToList: "O'qituvchilar ro'yxatiga qaytish",
			loading: 'Yuklanmoqda...',
		},
		ru: {
			title: 'Профиль преподавателя',
			breadcrumbHome: 'Главная',
			breadcrumbTeachers: 'Преподаватели',
			breadcrumbProfile: 'Профиль',
			contactInfo: 'Контактная информация',
			email: 'Email',
			phone: 'Телефон',
			department: 'Кафедра',
			position: 'Должность',
			education: 'Образование',
			experience: 'Опыт работы',
			publications: 'Публикации',
			biography: 'Биография',
			notFound: 'Преподаватель не найден',
			backToList: 'Вернуться к списку преподавателей',
			loading: 'Загрузка...',
		},
		en: {
			title: 'Teacher Profile',
			breadcrumbHome: 'Home',
			breadcrumbTeachers: 'Teachers',
			breadcrumbProfile: 'Profile',
			contactInfo: 'Contact Information',
			email: 'Email',
			phone: 'Phone',
			department: 'Department',
			position: 'Position',
			education: 'Education',
			experience: 'Experience',
			publications: 'Publications',
			biography: 'Biography',
			notFound: 'Teacher not found',
			backToList: 'Back to teachers list',
			loading: 'Loading...',
		},
	}

	const t = texts[lang as keyof typeof texts] || texts.ru

	// Моковые данные для кафедр и должностей
	const departments = [
		{ id: 1, name: 'Кафедра информационных технологий' },
		{ id: 2, name: 'Кафедра экономики' },
		{ id: 3, name: 'Кафедра иностранных языков' },
		{ id: 4, name: 'Кафедра математики' },
		{ id: 5, name: 'Кафедра физики' },
	]

	const positions = [
		{ id: 1, name: 'Профессор' },
		{ id: 2, name: 'Доцент' },
		{ id: 3, name: 'Старший преподаватель' },
		{ id: 4, name: 'Преподаватель' },
		{ id: 5, name: 'Ассистент' },
	]

	useEffect(() => {
		fetchTeacher()
	}, [id])

	const fetchTeacher = async () => {
		setLoading(true)
		setError(null)
		try {
			// First, try to get all teachers and find the one with matching ID
			const { results } = await TeacherService.getAll()

			// Convert the ID from the URL to the same type as in the data (likely number)
			const teacherId = id

			// Find the teacher with the matching ID
			const foundTeacher = results.find((t: any) => t.id == teacherId)

			if (foundTeacher) {
				setTeacher(foundTeacher)
			} else {
				// If not found in the list, try direct fetch as fallback
				try {
					const teacherData = await TeacherService.getById(teacherId)
					setTeacher(teacherData)
				} catch (directError) {
					console.error('Error fetching teacher directly:', directError)
					setError(t.notFound)
				}
			}
		} catch (error) {
			console.error('Error fetching teachers list:', error)
			setError(t.notFound)
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<Container sx={{ py: 5 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '50vh',
						flexDirection: 'column',
						gap: 2,
					}}
				>
					<CircularProgress />
					<Typography>{t.loading}</Typography>
				</Box>
			</Container>
		)
	}

	if (error || !teacher) {
		return (
			<Container sx={{ py: 5 }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						minHeight: '50vh',
						pt: 10,
					}}
				>
					<Typography variant='h5' color='error' gutterBottom>
						{error || t.notFound}
					</Typography>
					<Link href={`/${lang}/teachers`} passHref>
						{t.backToList}
					</Link>
				</Box>
			</Container>
		)
	}

	return (
		<>
			<Box sx={{ bgcolor: '#f5f5f5', py: 3 }}>
				<Container>
					<Breadcrumbs aria-label='breadcrumb'>
						<Link href={`/${lang}`} passHref>
							{t.breadcrumbHome}
						</Link>
						<Link href={`/${lang}/teachers`} passHref>
							{t.breadcrumbTeachers}
						</Link>
						<Typography color='text.primary'>{teacher.full_name}</Typography>
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
				<Grid container spacing={4}>
					{/* Левая колонка - фото и контактная информация */}
					<Grid size={4}>
						<Card>
							<Box sx={{ position: 'relative', width: '100%', pt: '100%' }}>
								<Image
									src={
										`http://di-nmtu.social${teacher.logo_teacher}` ||
										'/default-avatar.png'
									}
									alt={teacher.full_name}
									fill
									style={{ objectFit: 'cover' }}
								/>
							</Box>
							<CardContent>
								<Typography variant='h5' component='h2' gutterBottom>
									{teacher.full_name}
								</Typography>

								<Box sx={{ mt: 1, mb: 2 }}>
									<Chip
										label={
											positions.find(p => p.id === teacher.position_id)?.name ||
											'Преподаватель'
										}
										color='primary'
										sx={{ mr: 0.5, mb: 0.5 }}
									/>
									{teacher.degrees &&
										teacher.degrees.map((degree: string, index: number) => (
											<Chip
												key={index}
												label={degree}
												size='small'
												sx={{ mr: 0.5, mb: 0.5 }}
											/>
										))}
								</Box>

								<Typography variant='h6' gutterBottom sx={{ mt: 3 }}>
									{t.contactInfo}
								</Typography>
								<Divider sx={{ mb: 2 }} />

								<List disablePadding>
									{teacher.email && (
										<ListItem disablePadding sx={{ mb: 1 }}>
											<ListItemIcon sx={{ minWidth: 40 }}>
												<EmailIcon fontSize='small' color='primary' />
											</ListItemIcon>
											<ListItemText primary={teacher.email} />
										</ListItem>
									)}

									{teacher.phone_number && (
										<ListItem disablePadding sx={{ mb: 1 }}>
											<ListItemIcon sx={{ minWidth: 40 }}>
												<PhoneIcon fontSize='small' color='primary' />
											</ListItemIcon>
											<ListItemText primary={teacher.phone_number} />
										</ListItem>
									)}

									<ListItem disablePadding sx={{ mb: 1 }}>
										<ListItemIcon sx={{ minWidth: 40 }}>
											<WorkIcon fontSize='small' color='primary' />
										</ListItemIcon>
										<ListItemText
											primary={
												departments.find(d => d.id === teacher.department_id)
													?.name || 'Кафедра'
											}
										/>
									</ListItem>

									{teacher.location && (
										<ListItem disablePadding sx={{ mb: 1 }}>
											<ListItemIcon sx={{ minWidth: 40 }}>
												<LocationIcon fontSize='small' color='primary' />
											</ListItemIcon>
											<ListItemText primary={teacher.location} />
										</ListItem>
									)}
								</List>
							</CardContent>
						</Card>
					</Grid>

					{/* Правая колонка - биография и другая информация */}
					<Grid size={8}>
						<Paper sx={{ p: 3, mb: 4, width: '100%', height: '100%' }}>
							<Typography variant='h5' component='h2' gutterBottom>
								{t.biography}
							</Typography>
							<Divider sx={{ mb: 2 }} />
							<Typography variant='body1' paragraph>
								{teacher.biography || teacher.bio || 'Биография не указана'}
							</Typography>
						</Paper>

						{teacher.education && (
							<Paper sx={{ p: 3, mb: 4 }}>
								<Typography variant='h5' component='h2' gutterBottom>
									{t.education}
								</Typography>
								<Divider sx={{ mb: 2 }} />
								<List>
									{teacher.education.map((edu: any, index: number) => (
										<ListItem key={index} sx={{ px: 0 }}>
											<ListItemIcon>
												<SchoolIcon color='primary' />
											</ListItemIcon>
											<ListItemText
												primary={edu.degree}
												secondary={`${edu.institution}, ${edu.year_start} - ${
													edu.year_end || 'Present'
												}`}
											/>
										</ListItem>
									))}
								</List>
							</Paper>
						)}

						{teacher.experience && (
							<Paper sx={{ p: 3, mb: 4 }}>
								<Typography variant='h5' component='h2' gutterBottom>
									{t.experience}
								</Typography>
								<Divider sx={{ mb: 2 }} />
								<List>
									{teacher.experience.map((exp: any, index: number) => (
										<ListItem key={index} sx={{ px: 0 }}>
											<ListItemIcon>
												<WorkIcon color='primary' />
											</ListItemIcon>
											<ListItemText
												primary={exp.position}
												secondary={`${exp.company}, ${exp.year_start} - ${
													exp.year_end || 'Present'
												}`}
											/>
										</ListItem>
									))}
								</List>
							</Paper>
						)}

						{teacher.publications && (
							<Paper sx={{ p: 3 }}>
								<Typography variant='h5' component='h2' gutterBottom>
									{t.publications}
								</Typography>
								<Divider sx={{ mb: 2 }} />
								<List>
									{teacher.publications.map((pub: any, index: number) => (
										<ListItem key={index} sx={{ px: 0 }}>
											<ListItemText
												primary={pub.title}
												secondary={`${pub.journal}, ${pub.year}`}
											/>
										</ListItem>
									))}
								</List>
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</>
	)
}
