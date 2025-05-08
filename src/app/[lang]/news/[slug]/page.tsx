'use client'

import { NewsService } from '@/src/service/news.service'
import {
	ArrowBack as ArrowBackIcon,
	CalendarMonth as CalendarIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material'
import {
	Alert,
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardContent,
	CardMedia,
	Chip,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NewsDetailPage() {
	// Get the language and slug from the URL
	const params = useParams()
	const lang = (params?.lang as string) || 'ru'
	const slug = params?.slug as string

	// Локализованные тексты
	const texts = {
		uz: {
			breadcrumbHome: 'Bosh sahifa',
			breadcrumbNews: 'Yangiliklar',
			category: 'Kategoriya',
			publishDate: 'Nashr sanasi',
			views: "Ko'rishlar",
			backToNews: 'Yangiliklariga qaytish',
			relatedNews: 'Tegishli yangiliklar',
			readMore: 'Batafsil',
			notFound: 'Yangilik topilmadi',
			error: 'Xatolik yuz berdi',
			retry: "Qayta urinib ko'ring",
			loading: 'Yuklanmoqda...',
		},
		ru: {
			breadcrumbHome: 'Главная',
			breadcrumbNews: 'Новости',
			category: 'Категория',
			publishDate: 'Дата публикации',
			views: 'Просмотры',
			backToNews: 'Вернуться к новостям',
			relatedNews: 'Связанные новости',
			readMore: 'Подробнее',
			notFound: 'Новость не найдена',
			error: 'Произошла ошибка',
			retry: 'Повторить попытку',
			loading: 'Загрузка...',
		},
		en: {
			breadcrumbHome: 'Home',
			breadcrumbNews: 'News',
			category: 'Category',
			publishDate: 'Publish date',
			views: 'Views',
			backToNews: 'Back to news',
			relatedNews: 'Related news',
			readMore: 'Read more',
			notFound: 'News not found',
			error: 'An error occurred',
			retry: 'Try again',
			loading: 'Loading...',
		},
	}

	const t = texts[lang as keyof typeof texts] || texts.ru

	// State for news data
	const [newsItem, setNewsItem] = useState<any | null>(null)
	const [relatedNews, setRelatedNews] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Fetch news data
	const fetchNewsDetail = async () => {
		if (!slug) return

		setLoading(true)
		setError(null)
		try {
			// First try to get all news and find the one with matching slug
			const response = await NewsService.getAll()

			if (response) {
				const foundNews = response.find(
					(news: any) => news.slug === slug || news.id.toString() === slug
				)

				if (foundNews) {
					setNewsItem(foundNews)

					// Get related news (same category, excluding current)
					const related = response
						.filter(
							(news: any) =>
								news.id !== foundNews.id && news.category === foundNews.category
						)
						.slice(0, 3)

					setRelatedNews(related)
				} else {
					// If not found in list, try direct fetch by ID
					try {
						const directResponse = await NewsService.getById(
							Number(slug) || slug
						)
						if (directResponse) {
							setNewsItem(directResponse)

							// Get some random news for related
							const related = response.data
								.filter((news: any) => news.id !== directResponse.id)
								.slice(0, 3)

							setRelatedNews(related)
						} else {
							setError(t.notFound)
						}
					} catch (err) {
						console.error('Error fetching news by ID:', err)
						setError(t.notFound)
					}
				}
			} else {
				setError(t.notFound)
			}
		} catch (err) {
			console.error('Error fetching news:', err)
			setError(t.error)
		} finally {
			setLoading(false)
		}
	}

	// Initial data fetch
	useEffect(() => {
		fetchNewsDetail()
	}, [slug])

	// Helper function to get image URL
	const getImageUrl = (news: any) => {
		if (news.images && Object.values(news.images)[0]) {
			return Object.values(news.images)[0] as string
		}
		if (news.image) {
			return news.image
		}
		return '/placeholder.svg'
	}

	// Helper function to get news slug
	const getNewsSlug = (news: any) => {
		return news.slug || news.id
	}

	// Helper function to get news content
	const getNewsContent = (news: any) => {
		return news.content || news.text || news.description || ''
	}

	// Helper function to get category name
	const getCategoryName = (categoryId: number) => {
		const categories: Record<number, string> = {
			1: 'Образование',
			2: 'Наука',
			3: 'Международное сотрудничество',
			4: 'Мероприятия',
			5: 'Объявления',
		}
		return categories[categoryId] || 'Общее'
	}

	if (loading) {
		return (
			<Container sx={{ py: 10, textAlign: 'center' }}>
				<CircularProgress />
				<Typography sx={{ mt: 2 }}>{t.loading}</Typography>
			</Container>
		)
	}

	if (error) {
		return (
			<Container sx={{ py: 10 }}>
				<Alert
					severity='error'
					action={
						<Button color='inherit' size='small' onClick={fetchNewsDetail}>
							{t.retry}
						</Button>
					}
				>
					{error}
				</Alert>
				<Button
					component={Link}
					href={`/${lang}/news`}
					startIcon={<ArrowBackIcon />}
					sx={{ mt: 3 }}
				>
					{t.backToNews}
				</Button>
			</Container>
		)
	}

	if (!newsItem) {
		return (
			<Container sx={{ py: 10 }}>
				<Alert severity='info'>{t.notFound}</Alert>
				<Button
					component={Link}
					href={`/${lang}/news`}
					startIcon={<ArrowBackIcon />}
					sx={{ mt: 3 }}
				>
					{t.backToNews}
				</Button>
			</Container>
		)
	}

	return (
		<>
			<Box sx={{ bgcolor: '#f5f5f5', py: 3 }}>
				<Container>
					<Breadcrumbs aria-label='breadcrumb'>
						<Link href={`/${lang}`}>{t.breadcrumbHome}</Link>
						<Link href={`/${lang}/news`}>{t.breadcrumbNews}</Link>
						<Typography color='text.primary'>{newsItem.title}</Typography>
					</Breadcrumbs>
				</Container>
			</Box>

			<Container sx={{ py: 5 }}>
				<Grid container spacing={4}>
					{/* Main content */}
					<Grid size={8}>
						<Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 2 }}>
							<Box sx={{ position: 'relative', height: { xs: 300, md: 400 } }}>
								<Image
									src={getImageUrl(newsItem) || '/placeholder.svg'}
									alt={newsItem.title}
									fill
									priority
									style={{ objectFit: 'cover' }}
								/>
							</Box>
							<Box sx={{ p: { xs: 3, md: 4 } }}>
								<Typography
									variant='h4'
									component='h1'
									gutterBottom
									sx={{ fontWeight: 700 }}
								>
									{newsItem.title}
								</Typography>

								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
									<Chip
										icon={<CalendarIcon />}
										label={new Date(
											newsItem.date || newsItem.createdAt
										).toLocaleDateString()}
										variant='outlined'
										size='small'
									/>
									{newsItem.category && (
										<Chip
											label={getCategoryName(newsItem.category)}
											color='primary'
											size='small'
										/>
									)}
									{newsItem.views && (
										<Chip
											icon={<VisibilityIcon />}
											label={`${newsItem.views} ${t.views}`}
											variant='outlined'
											size='small'
										/>
									)}
								</Box>

								<Divider sx={{ mb: 3 }} />

								<Typography
									variant='body1'
									component='div'
									sx={{
										lineHeight: 1.8,
										'& img': { maxWidth: '100%', height: 'auto', my: 2 },
										'& p': { mb: 2 },
										'& h2, & h3': { mt: 4, mb: 2, fontWeight: 600 },
									}}
									dangerouslySetInnerHTML={{ __html: getNewsContent(newsItem) }}
								/>

								<Button
									component={Link}
									href={`/${lang}/news`}
									startIcon={<ArrowBackIcon />}
									sx={{ mt: 4 }}
								>
									{t.backToNews}
								</Button>
							</Box>
						</Paper>
					</Grid>

					{/* Sidebar with related news */}
					<Grid size={4}>
						<Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
							{t.relatedNews}
						</Typography>

						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
							{relatedNews.length > 0 ? (
								relatedNews.map(news => (
									<Card
										key={news.id}
										sx={{ display: 'flex', flexDirection: 'column' }}
									>
										<CardMedia
											component='div'
											sx={{ pt: '56.25%', position: 'relative' }}
										>
											<Image
												src={getImageUrl(news) || '/placeholder.svg'}
												alt={news.title}
												fill
												style={{ objectFit: 'cover' }}
											/>
										</CardMedia>
										<CardContent>
											<Typography
												variant='subtitle1'
												sx={{ fontWeight: 600, mb: 1 }}
											>
												{news.title}
											</Typography>
											<Typography
												variant='body2'
												color='text.secondary'
												sx={{ mb: 2 }}
											>
												{new Date(
													news.date || news.createdAt
												).toLocaleDateString()}
											</Typography>
											<Button
												component={Link}
												href={`/${lang}/news/${getNewsSlug(news)}`}
												variant='outlined'
												size='small'
												fullWidth
											>
												{t.readMore}
											</Button>
										</CardContent>
									</Card>
								))
							) : (
								<Typography variant='body2' color='text.secondary'>
									{t.notFound}
								</Typography>
							)}
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}
