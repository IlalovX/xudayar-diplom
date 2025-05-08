'use client'
import { NewsService } from '@/src/service/news.service'
import {
	BarChart,
	Contacts,
	EmojiEvents,
	HowToReg,
	Lightbulb,
	MenuBook,
	Psychology,
	School,
	Science,
	Work,
} from '@mui/icons-material'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'

interface HomePageProps {
	params: Promise<{
		lang: string
	}>
}

export default function HomePage({ params: paramsPromise }: HomePageProps) {
	const params = use(paramsPromise)
	const { lang } = params

	const [newsItems, setNewsItems] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchNews = async () => {
			try {
				setIsLoading(true)
				const news = await NewsService.getAll()
				setNewsItems(news)
				setError(null)
			} catch (err) {
				console.error('Failed to fetch news:', err)
				setError('Failed to load news. Please try again later.')
			} finally {
				setIsLoading(false)
			}
		}

		fetchNews()
	}, [])

	const services = [
		{
			id: 1,
			title: 'Образование',
			icon: <School sx={{ color: 'white' }} />,
			link: `/${lang}/education`,
		},
		{
			id: 2,
			title: 'Наука',
			icon: <Science sx={{ color: 'white' }} />,
			link: `/${lang}/science`,
		},
		{
			id: 3,
			title: 'Инновации',
			icon: <Lightbulb sx={{ color: 'white' }} />,
			link: `/${lang}/innovation`,
		},
		{
			id: 6,
			title: 'Контакты',
			icon: <Contacts sx={{ color: 'white' }} />,
			link: `/${lang}/contacts`,
		},
	]

	const quickLinks = [
		{
			id: 1,
			title: 'Поступление в ВУЗы',
			icon: <HowToReg sx={{ color: 'black', width: '40px', height: '40px' }} />,
			link: `/${lang}/admission`,
		},
		{
			id: 2,
			title: 'Стипендии и гранты',
			icon: <EmojiEvents sx={{ color: 'black', width: '40px', height: '40px' }} />,
			link: `/${lang}/scholarships`,
		},
		{
			id: 3,
			title: 'Научные проекты',
			icon: <Psychology sx={{ color: 'black', width: '40px', height: '40px' }} />,
			link: `/${lang}/research`,
		},
		{
			id: 4,
			title: 'Рейтинг ВУЗов',
			icon: <BarChart sx={{ color: 'black', width: '40px', height: '40px' }} />,
			link: `/${lang}/rankings`,
		},
		{
			id: 5,
			title: 'Электронная библиотека',
			icon: <MenuBook sx={{ color: 'black', width: '40px', height: '40px' }} />,
			link: `/${lang}/library`,
		},
		{
			id: 6,
			title: 'Вакансии',
			icon: <Work sx={{ color: 'black', width: '40px', height: '40px' }} />,
			link: `/${lang}/jobs`,
		},
	]

	const getImageUrl = (news: any) =>
		news.image?.startsWith('http')
			? news.image
			: news.image || '/placeholder.svg'

	const getNewsSlug = (news: any) => news.slug || `${news.id}`

	return (
		<>
			{/* Hero Section */}
			<Box
				sx={{
					position: 'relative',
					height: '500px',
					width: '100%',
					overflow: 'hidden',
				}}
			>
				<Image
					src='/center.jfif'
					alt='ДИ кафедры'
					fill
					style={{ objectFit: 'cover' }}
					priority
				/>
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						color: 'white',
						textAlign: 'center',
						padding: 4,
					}}
				>
					<Typography
						variant='h2'
						component='h1'
						sx={{ fontWeight: 700, mb: 2 }}
					>
						ДИ кафедры
					</Typography>
					<Button
						variant='contained'
						color='secondary'
						size='large'
						component={Link}
						href={`/${lang}/about`}
					>
						Подробнее
					</Button>
				</Box>
			</Box>

			{/* Services Section */}
			<Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
				<Container>
					<Grid container spacing={2} justifyContent='center'>
						{services.map(service => (
							<Grid size={3} key={service.id}>
								<Link
									href={service.link}
									passHref
									style={{ textDecoration: 'none' }}
								>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											p: 2,
											transition: 'transform 0.3s',
											'&:hover': {
												transform: 'translateY(-5px)',
											},
										}}
									>
										<Box
											sx={{
												width: 60,
												height: 60,
												borderRadius: '50%',
												backgroundColor: 'primary.main',
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												mb: 1,
											}}
										>
											{service.icon}
										</Box>
										<Typography
											variant='subtitle2'
											align='center'
											sx={{ color: 'text.primary' }}
										>
											{service.title}
										</Typography>
									</Box>
								</Link>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* News Section */}
			<Box sx={{ py: 6 }}>
				<Container>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							mb: 4,
						}}
					>
						<Typography
							variant='h4'
							component='h2'
							sx={{ fontWeight: 700, color: 'primary.main' }}
						>
							Новости и события
						</Typography>
						<Button variant='outlined' component={Link} href={`/${lang}/news`}>
							Все новости
						</Button>
					</Box>

					{isLoading ? (
						<Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
							<CircularProgress />
						</Box>
					) : error ? (
						<Box sx={{ textAlign: 'center', py: 4 }}>
							<Typography color='error'>{error}</Typography>
							<Button
								variant='contained'
								sx={{ mt: 2 }}
								onClick={() => window.location.reload()}
							>
								Попробовать снова
							</Button>
						</Box>
					) : newsItems.length === 0 ? (
						<Box sx={{ textAlign: 'center', py: 4 }}>
							<Typography>Новости не найдены</Typography>
						</Box>
					) : (
						<Grid container spacing={3}>
							<Grid size={12}>
								<Card
									sx={{
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<CardMedia
										component='img'
										height='300'
										image={getImageUrl(newsItems[0])}
										alt={newsItems[0].title}
									/>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography gutterBottom variant='h5'>
											{newsItems[0].title}
										</Typography>
										<Typography
											variant='body2'
											color='text.secondary'
											sx={{ mb: 2 }}
										>
											{newsItems[0].content ||
												newsItems[0].description ||
												newsItems[0].short_description}
										</Typography>
										<Button
											variant='contained'
											component={Link}
											href={`/${lang}/news/${getNewsSlug(newsItems[0])}`}
										>
											Читать далее
										</Button>
									</CardContent>
								</Card>
							</Grid>
							<Grid size={12}>
								<Grid container spacing={2}>
									{newsItems.slice(1, 5).map(news => (
										<Grid size={12} key={news.id}>
											<Card sx={{ display: 'flex' }}>
												<CardMedia
													component='img'
													sx={{ width: 160 }}
													image={getImageUrl(news)}
													alt={news.title}
												/>
												<CardContent>
													<Typography variant='subtitle1' gutterBottom>
														{news.title}
													</Typography>
													<Button
														variant='text'
														component={Link}
														href={`/${lang}/news/${getNewsSlug(news)}`}
														sx={{ mt: 1 }}
													>
														Подробнее
													</Button>
												</CardContent>
											</Card>
										</Grid>
									))}
								</Grid>
							</Grid>
						</Grid>
					)}
				</Container>
			</Box>

			{/* Quick Links Section */}
			<Box sx={{ py: 6, backgroundColor: '#f0f0f0' }}>
				<Container>
					<Typography
						variant='h4'
						component='h2'
						sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}
					>
						Быстрые ссылки
					</Typography>
					<Grid container spacing={2}>
						{quickLinks.map(link => (
							<Grid size={2} key={link.id}>
								<Link
									href={link.link}
									passHref
									style={{ textDecoration: 'none' }}
								>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											p: 2,
											backgroundColor: 'white',
											height: '100%',
											borderRadius: 2,
											boxShadow: 1,
											transition: '0.3s',
											'&:hover': {
												boxShadow: 4,
												transform: 'translateY(-3px)',
											},
										}}
									>
										{link.icon}
										<Typography variant='body2' align='center' sx={{ mt: 1 }}>
											{link.title}
										</Typography>
									</Box>
								</Link>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
		</>
	)
}
