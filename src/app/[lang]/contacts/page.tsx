'use client'

import {
	Email as EmailIcon,
	LocationOn as LocationIcon,
	Phone as PhoneIcon,
	AccessTime as TimeIcon,
} from '@mui/icons-material'
import {
	Alert,
	Box,
	Breadcrumbs,
	Button,
	CircularProgress,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface ContactsPageProps {
	params: {
		lang: string
	}
}

interface ContactFormData {
	name: string
	email: string
	phone: string
	subject: string
	message: string
}

export default function ContactsPage({ params }: ContactsPageProps) {
	const { lang } = params
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)

	// Локализованные тексты
	const texts = {
		uz: {
			title: 'Aloqa',
			breadcrumbHome: 'Bosh sahifa',
			breadcrumbContacts: 'Aloqa',
			contactInfo: "Aloqa ma'lumotlari",
			address: 'Manzil',
			phone: 'Telefon',
			email: 'Elektron pochta',
			workingHours: 'Ish vaqti',
			contactForm: 'Aloqa shakli',
			nameLabel: 'Ismingiz',
			emailLabel: 'Elektron pochta',
			phoneLabel: 'Telefon raqami',
			subjectLabel: 'Mavzu',
			messageLabel: 'Xabar',
			submitButton: 'Yuborish',
			nameRequired: 'Ism kiritish majburiy',
			emailRequired: 'Elektron pochta kiritish majburiy',
			emailInvalid: "Noto'g'ri elektron pochta formati",
			subjectRequired: 'Mavzu kiritish majburiy',
			messageRequired: 'Xabar kiritish majburiy',
			successMessage:
				"Xabaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz.",
			errorMessage:
				"Xabarni yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
			addressText: "Toshkent shahri, Universitet ko'chasi, 7",
			phoneText: '+998 71 123-45-67',
			emailText: 'info@edu.uz',
			workingHoursText: 'Dushanba-Juma: 9:00 - 18:00',
		},
		ru: {
			title: 'Контакты',
			breadcrumbHome: 'Главная',
			breadcrumbContacts: 'Контакты',
			contactInfo: 'Контактная информация',
			address: 'Адрес',
			phone: 'Телефон',
			email: 'Электронная почта',
			workingHours: 'Часы работы',
			contactForm: 'Форма обратной связи',
			nameLabel: 'Ваше имя',
			emailLabel: 'Электронная почта',
			phoneLabel: 'Номер телефона',
			subjectLabel: 'Тема',
			messageLabel: 'Сообщение',
			submitButton: 'Отправить',
			nameRequired: 'Имя обязательно',
			emailRequired: 'Электронная почта обязательна',
			emailInvalid: 'Неверный формат электронной почты',
			subjectRequired: 'Тема обязательна',
			messageRequired: 'Сообщение обязательно',
			successMessage:
				'Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.',
			errorMessage:
				'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.',
			addressText: 'г. Ташкент, ул. Университетская, 7',
			phoneText: '+998 71 123-45-67',
			emailText: 'info@edu.uz',
			workingHoursText: 'Понедельник-Пятница: 9:00 - 18:00',
		},
		en: {
			title: 'Contacts',
			breadcrumbHome: 'Home',
			breadcrumbContacts: 'Contacts',
			contactInfo: 'Contact Information',
			address: 'Address',
			phone: 'Phone',
			email: 'Email',
			workingHours: 'Working Hours',
			contactForm: 'Contact Form',
			nameLabel: 'Your Name',
			emailLabel: 'Email',
			phoneLabel: 'Phone Number',
			subjectLabel: 'Subject',
			messageLabel: 'Message',
			submitButton: 'Submit',
			nameRequired: 'Name is required',
			emailRequired: 'Email is required',
			emailInvalid: 'Invalid email format',
			subjectRequired: 'Subject is required',
			messageRequired: 'Message is required',
			successMessage:
				'Your message has been sent successfully. We will contact you soon.',
			errorMessage:
				'An error occurred while sending your message. Please try again later.',
			addressText: 'Tashkent, University Street, 7',
			phoneText: '+998 71 123-45-67',
			emailText: 'info@edu.uz',
			workingHoursText: 'Monday-Friday: 9:00 - 18:00',
		},
	}

	const t = texts[lang as keyof typeof texts] || texts.ru

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactFormData>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			subject: '',
			message: '',
		},
	})

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true)
		setSubmitSuccess(false)
		setSubmitError(null)

		try {
			// В реальном приложении здесь будет отправка данных на сервер
			// Имитация задержки сети
			await new Promise(resolve => setTimeout(resolve, 1500))

			// Имитация успешной отправки
			setSubmitSuccess(true)
			reset()
		} catch (error) {
			setSubmitError(t.errorMessage)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<Box sx={{ bgcolor: '#f5f5f5', py: 3 }}>
				<Container>
					<Breadcrumbs aria-label='breadcrumb'>
						<Link href={`/${lang}`} passHref>
							{t.breadcrumbHome}
						</Link>
						<Typography color='text.primary'>{t.breadcrumbContacts}</Typography>
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
					{/* Контактная информация */}
					<Grid item xs={12} md={5}>
						<Paper elevation={2} sx={{ p: 3, height: '100%' }}>
							<Typography
								variant='h5'
								component='h2'
								gutterBottom
								sx={{ fontWeight: 700, color: 'primary.main' }}
							>
								{t.contactInfo}
							</Typography>
							<Divider sx={{ mb: 3 }} />

							<List>
								<ListItem>
									<ListItemIcon>
										<LocationIcon color='primary' />
									</ListItemIcon>
									<ListItemText
										primary={t.address}
										secondary={t.addressText}
										primaryTypographyProps={{ fontWeight: 600 }}
									/>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<PhoneIcon color='primary' />
									</ListItemIcon>
									<ListItemText
										primary={t.phone}
										secondary={t.phoneText}
										primaryTypographyProps={{ fontWeight: 600 }}
									/>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<EmailIcon color='primary' />
									</ListItemIcon>
									<ListItemText
										primary={t.email}
										secondary={t.emailText}
										primaryTypographyProps={{ fontWeight: 600 }}
									/>
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<TimeIcon color='primary' />
									</ListItemIcon>
									<ListItemText
										primary={t.workingHours}
										secondary={t.workingHoursText}
										primaryTypographyProps={{ fontWeight: 600 }}
									/>
								</ListItem>
							</List>

							<Box
								sx={{ mt: 4, width: '100%', height: 300, position: 'relative' }}
							>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0883269835813!2d69.2843!3d41.3123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQ0LjMiTiA2OcKwMTcnMDMuNSJF!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus'
									width='100%'
									height='100%'
									style={{ border: 0, borderRadius: 8 }}
									allowFullScreen
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
								></iframe>
							</Box>
						</Paper>
					</Grid>

					{/* Форма обратной связи */}
					<Grid item xs={12} md={7}>
						<Paper elevation={2} sx={{ p: 3 }}>
							<Typography
								variant='h5'
								component='h2'
								gutterBottom
								sx={{ fontWeight: 700, color: 'primary.main' }}
							>
								{t.contactForm}
							</Typography>
							<Divider sx={{ mb: 3 }} />

							{submitSuccess && (
								<Alert severity='success' sx={{ mb: 3 }}>
									{t.successMessage}
								</Alert>
							)}

							{submitError && (
								<Alert severity='error' sx={{ mb: 3 }}>
									{submitError}
								</Alert>
							)}

							<Box
								component='form'
								noValidate
								onSubmit={handleSubmit(onSubmit)}
							>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<Controller
											name='name'
											control={control}
											rules={{ required: t.nameRequired }}
											render={({ field }) => (
												<TextField
													{...field}
													label={t.nameLabel}
													fullWidth
													variant='outlined'
													error={!!errors.name}
													helperText={errors.name?.message}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Controller
											name='email'
											control={control}
											rules={{
												required: t.emailRequired,
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													message: t.emailInvalid,
												},
											}}
											render={({ field }) => (
												<TextField
													{...field}
													label={t.emailLabel}
													fullWidth
													variant='outlined'
													error={!!errors.email}
													helperText={errors.email?.message}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Controller
											name='phone'
											control={control}
											render={({ field }) => (
												<TextField
													{...field}
													label={t.phoneLabel}
													fullWidth
													variant='outlined'
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Controller
											name='subject'
											control={control}
											rules={{ required: t.subjectRequired }}
											render={({ field }) => (
												<TextField
													{...field}
													label={t.subjectLabel}
													fullWidth
													variant='outlined'
													error={!!errors.subject}
													helperText={errors.subject?.message}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Controller
											name='message'
											control={control}
											rules={{ required: t.messageRequired }}
											render={({ field }) => (
												<TextField
													{...field}
													label={t.messageLabel}
													fullWidth
													multiline
													rows={6}
													variant='outlined'
													error={!!errors.message}
													helperText={errors.message?.message}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											type='submit'
											variant='contained'
											color='primary'
											size='large'
											fullWidth
											disabled={isSubmitting}
											sx={{ py: 1.5 }}
										>
											{isSubmitting ? (
												<CircularProgress size={24} />
											) : (
												t.submitButton
											)}
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}
