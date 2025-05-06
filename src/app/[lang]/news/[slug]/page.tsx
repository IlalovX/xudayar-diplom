import {
	CalendarToday as CalendarIcon,
	Person as PersonIcon,
	Share as ShareIcon,
} from '@mui/icons-material'
import {
	Box,
	Breadcrumbs,
	Button,
	Chip,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

interface NewsDetailPageProps {
	params: {
		lang: string
		slug: string
	}
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
	const { lang, slug } = params

	// Локализованные тексты
	const texts = {
		uz: {
			breadcrumbHome: 'Bosh sahifa',
			breadcrumbNews: 'Yangiliklar',
			author: 'Muallif',
			date: 'Sana',
			share: 'Ulashish',
			category: 'Kategoriya',
			relatedNews: 'Tegishli yangiliklar',
			backToNews: 'Yangiliklarga qaytish',
		},
		ru: {
			breadcrumbHome: 'Главная',
			breadcrumbNews: 'Новости',
			author: 'Автор',
			date: 'Дата',
			share: 'Поделиться',
			category: 'Категория',
			relatedNews: 'Похожие новости',
			backToNews: 'Вернуться к новостям',
		},
		en: {
			breadcrumbHome: 'Home',
			breadcrumbNews: 'News',
			author: 'Author',
			date: 'Date',
			share: 'Share',
			category: 'Category',
			relatedNews: 'Related News',
			backToNews: 'Back to News',
		},
	}

	const t = texts[lang as keyof typeof texts] || texts.ru

	// Моковые данные для новости
	// В реальном приложении здесь будет запрос к API для получения новости по slug
	const newsItem = {
		id: 1,
		title: 'Встреча с представителями международных университетов',
		content: `
      <p>Министр высшего образования провел встречу с представителями ведущих международных университетов для обсуждения вопросов сотрудничества в области высшего образования.</p>
      
      <p>На встрече обсуждались вопросы развития академической мобильности студентов и преподавателей, реализации совместных образовательных программ, проведения совместных научных исследований и другие вопросы сотрудничества.</p>
      
      <p>Представители международных университетов выразили заинтересованность в развитии сотрудничества с высшими учебными заведениями Узбекистана и готовность оказать содействие в повышении качества высшего образования в стране.</p>
      
      <p>По итогам встречи были достигнуты договоренности о проведении ряда совместных мероприятий, направленных на развитие сотрудничества в области высшего образования.</p>
    `,
		date: '2023-05-15',
		image: '/news-1.jpg',
		author: 'Пресс-служба Министерства высшего образования',
		category: 'Международное сотрудничество',
		tags: ['международное сотрудничество', 'образование', 'университеты'],
	}

	// Моковые данные для похожих новостей
	const relatedNews = [
		{
			id: 5,
			title: 'Подписание меморандума с Кембриджским университетом',
			date: '2023-04-20',
			image: '/news-5.png',
			slug: 'cambridge-university-memorandum',
		},
		{
			id: 4,
			title: 'Международная конференция по инновациям в образовании',
			date: '2023-04-28',
			image: '/news-4.png',
			slug: 'international-conference-on-education-innovations',
		},
		{
			id: 8,
			title: 'Встреча с представителями бизнеса',
			date: '2023-04-05',
			image: '/news-8.png',
			slug: 'meeting-with-business-representatives',
		},
	]

	return (
		<>
			<Box sx={{ bgcolor: '#f5f5f5', py: 3 }}>
				<Container>
					<Breadcrumbs aria-label='breadcrumb'>
						<Link href={`/${lang}`} passHref>
							{t.breadcrumbHome}
						</Link>
						<Link href={`/${lang}/news`} passHref>
							{t.breadcrumbNews}
						</Link>
						<Typography color='text.primary'>{newsItem.title}</Typography>
					</Breadcrumbs>
				</Container>
			</Box>

			<Container sx={{ py: 5 }}>
				<Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
					<Typography
						variant='h4'
						component='h1'
						gutterBottom
						sx={{ fontWeight: 700, color: 'primary.main' }}
					>
						{newsItem.title}
					</Typography>

					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<CalendarIcon
								fontSize='small'
								sx={{ mr: 0.5, color: 'text.secondary' }}
							/>
							<Typography variant='body2' color='text.secondary'>
								{t.date}: {new Date(newsItem.date).toLocaleDateString()}
							</Typography>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<PersonIcon
								fontSize='small'
								sx={{ mr: 0.5, color: 'text.secondary' }}
							/>
							<Typography variant='body2' color='text.secondary'>
								{t.author}: {newsItem.author}
							</Typography>
						</Box>
						<Chip label={newsItem.category} size='small' color='primary' />
					</Box>

					<Box
						sx={{
							position: 'relative',
							width: '100%',
							height: 400,
							mb: 3,
							borderRadius: 1,
							overflow: 'hidden',
						}}
					>
						<Image
							src={newsItem.image || '/placeholder.svg'}
							alt={newsItem.title}
							fill
							style={{ objectFit: 'cover' }}
						/>
					</Box>

					<Box
						sx={{ '& p': { mb: 2 } }}
						dangerouslySetInnerHTML={{ __html: newsItem.content }}
					/>

					<Divider sx={{ my: 3 }} />

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							flexWrap: 'wrap',
						}}
					>
						<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
							{newsItem.tags.map(tag => (
								<Chip key={tag} label={tag} size='small' variant='outlined' />
							))}
						</Box>
						<Button startIcon={<ShareIcon />} variant='outlined' size='small'>
							{t.share}
						</Button>
					</Box>
				</Paper>

				<Box sx={{ mt: 5 }}>
					<Typography
						variant='h5'
						component='h2'
						gutterBottom
						sx={{ fontWeight: 700, color: 'primary.main' }}
					>
						{t.relatedNews}
					</Typography>
					<Grid container spacing={3}>
						{relatedNews.map(news => (
							<Grid item xs={12} sm={6} md={4} key={news.id}>
								<Paper
									elevation={2}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										height: '100%',
										transition: 'transform 0.3s',
										'&:hover': { transform: 'translateY(-5px)' },
									}}
								>
									<Box
										sx={{ position: 'relative', width: '100%', pt: '56.25%' }}
									>
										<Image
											src={news.image || '/placeholder.svg'}
											alt={news.title}
											fill
											style={{ objectFit: 'cover' }}
										/>
									</Box>
									<Box sx={{ p: 2, flexGrow: 1 }}>
										<Typography
											variant='subtitle1'
											component='h3'
											gutterBottom
											sx={{ fontWeight: 600 }}
										>
											{news.title}
										</Typography>
										<Typography
											variant='body2'
											color='text.secondary'
											sx={{ mb: 2 }}
										>
											{new Date(news.date).toLocaleDateString()}
										</Typography>
										<Button
											component={Link}
											href={`/${lang}/news/${news.slug}`}
											variant='outlined'
											size='small'
											sx={{ mt: 'auto' }}
										>
											{t.readMore}
										</Button>
									</Box>
								</Paper>
							</Grid>
						))}
					</Grid>
					<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
						<Button
							component={Link}
							href={`/${lang}/news`}
							variant='contained'
							color='primary'
						>
							{t.backToNews}
						</Button>
					</Box>
				</Box>
			</Container>
		</>
	)
}
