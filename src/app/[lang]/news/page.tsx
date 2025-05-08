'use client'

import type React from 'react'

import { NewsService } from '@/src/service/news.service'
import {
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Pagination,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NewsItem {
	id: number
	title: string
	text: string
	images: { [key: number]: string } // assuming images is an object with numeric keys
}

export default function NewsPage() {
	// Get the language from the URL
	const params = useParams()
	const lang = (params?.lang as string) || 'ru'

	// Локализованные тексты
	const texts = {
		uz: {
			title: 'Yangiliklar',
			breadcrumbHome: 'Bosh sahifa',
			breadcrumbNews: 'Yangiliklar',
			search: 'Yangiliklar qidirish...',
			category: 'Kategoriya',
			allCategories: 'Barcha kategoriyalar',
			sortBy: 'Saralash',
			sortByDate: "Sana bo'yicha",
			sortByPopularity: "Mashhurlik bo'yicha",
			readMore: 'Batafsil',
			noResults: 'Yangiliklar topilmadi',
			error: 'Xatolik yuz berdi',
			retry: "Qayta urinib ko'ring",
			loading: 'Yuklanmoqda...',
		},
		ru: {
			title: 'Новости',
			breadcrumbHome: 'Главная',
			breadcrumbNews: 'Новости',
			search: 'Поиск новостей...',
			category: 'Категория',
			allCategories: 'Все категории',
			sortBy: 'Сортировать по',
			sortByDate: 'По дате',
			sortByPopularity: 'По популярности',
			readMore: 'Подробнее',
			noResults: 'Новости не найдены',
			error: 'Произошла ошибка',
			retry: 'Повторить попытку',
			loading: 'Загрузка...',
		},
		en: {
			title: 'News',
			breadcrumbHome: 'Home',
			breadcrumbNews: 'News',
			search: 'Search news...',
			category: 'Category',
			allCategories: 'All categories',
			sortBy: 'Sort by',
			sortByDate: 'By date',
			sortByPopularity: 'By popularity',
			readMore: 'Read more',
			noResults: 'No news found',
			error: 'An error occurred',
			retry: 'Try again',
			loading: 'Loading...',
		},
	}

	const t = texts[lang as keyof typeof texts] || texts.ru

	// State for news data
	const [newsItems, setNewsItems] = useState<NewsItem[]>([])
	console.log(newsItems)

	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	const fetchNews = async () => {
		try {
			const response = await NewsService.getAll({
				page,
				limit: 9,
			})

			if (response) {
				setNewsItems(response)
				console.log(newsItems)

				setTotalPages(Math.ceil((response.meta?.total || response.length) / 9))
			} else {
				setNewsItems([])
				setTotalPages(1)
			}
		} catch (err) {
			console.error('Error fetching news:', err)
			setNewsItems([])
		} finally {
		}
	}

	// Fetch when filters change
	useEffect(() => {
		fetchNews()
	}, [page])

	// Handle pagination change
	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value)
	}

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

	// Helper function to get news text
	const getNewsText = (news: any) => {
		return (
			news.text ||
			news.content ||
			news.description ||
			news.short_description ||
			''
		)
	}

	return (
		<>
			<Box sx={{ bgcolor: '#f5f5f5', py: 3 }}>
				<Container>
					<Breadcrumbs aria-label='breadcrumb'>
						<Link href={`/${lang}`}>{t.breadcrumbHome}</Link>
						<Typography color='text.primary'>{t.breadcrumbNews}</Typography>
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
					{/* Список новостей */}
					{newsItems.map(news => (
						<Grid size={4} key={news.id}>
							<Card
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									transition: 'transform 0.3s',
									'&:hover': { transform: 'translateY(-5px)' },
								}}
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
								<CardContent
									sx={{
										flexGrow: 1,
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Typography
										gutterBottom
										variant='h6'
										component='h2'
										sx={{ fontWeight: 600 }}
									>
										{news.title}
									</Typography>

									<Typography variant='body2' paragraph sx={{ flexGrow: 1 }}>
										{getNewsText(news).length > 120
											? `${getNewsText(news).substring(0, 120)}...`
											: getNewsText(news)}
									</Typography>
									<Button
										component={Link}
										href={`/${lang}/news/${getNewsSlug(news)}`}
										variant='outlined'
										size='small'
										sx={{ mt: 'auto', alignSelf: 'flex-start' }}
									>
										{t.readMore}
									</Button>
								</CardContent>
							</Card>
						</Grid>
					))}

					{/* Пагинация */}
					{newsItems.length > 0 && (
						<Grid
							size={12}
							sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
						>
							<Pagination
								count={totalPages}
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
