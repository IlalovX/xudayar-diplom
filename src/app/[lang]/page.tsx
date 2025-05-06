import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Container,
	Grid,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

interface HomePageProps {
	params: {
		lang: string
	}
}

export default function HomePage({ params }: HomePageProps) {
	const { lang } = params

	// Mock data for news
	const newsItems = [
		{
			id: 1,
			title: 'Встреча с представителями международных университетов',
			content:
				'Министр высшего образования провел встречу с представителями ведущих международных университетов для обсуждения сотрудничества.',
			date: '2023-05-15',
			image: '/news-1.jpg',
			slug: 'meeting-with-international-universities',
		},
		{
			id: 2,
			title: 'Новые стандарты высшего образования утверждены',
			content:
				'Правительство утвердило новые образовательные стандарты, которые вступят в силу с нового учебного года.',
			date: '2023-05-10',
			image: '/news-2.png',
			slug: 'new-education-standards',
		},
		{
			id: 3,
			title: 'Открытие нового учебного корпуса',
			content:
				'В Ташкентском государственном университете состоялось торжественное открытие нового учебного корпуса.',
			date: '2023-05-05',
			image: '/news-3.png',
			slug: 'new-campus-building-opening',
		},
		{
			id: 4,
			title: 'Международная конференция по инновациям в образовании',
			content:
				'В Самарканде прошла международная конференция, посвященная инновационным методам в высшем образовании.',
			date: '2023-04-28',
			image: '/news-4.png',
			slug: 'international-conference-on-education-innovations',
		},
		{
			id: 5,
			title: 'Подписание меморандума с Кембриджским университетом',
			content:
				'Министерство высшего образования подписало меморандум о сотрудничестве с Кембриджским университетом.',
			date: '2023-04-20',
			image: '/news-5.png',
			slug: 'cambridge-university-memorandum',
		},
	]

	// Mock data for services
	const services = [
		{
			id: 1,
			title: 'Образование',
			icon: '/icons/education.png',
			link: `/${lang}/education`,
		},
		{
			id: 2,
			title: 'Наука',
			icon: '/icons/science.png',
			link: `/${lang}/science`,
		},
		{
			id: 3,
			title: 'Инновации',
			icon: '/icons/innovation.png',
			link: `/${lang}/innovation`,
		},
		{
			id: 4,
			title: 'Международное сотрудничество',
			icon: '/icons/international.png',
			link: `/${lang}/international`,
		},
		{
			id: 5,
			title: 'Документы',
			icon: '/icons/documents.png',
			link: `/${lang}/documents`,
		},
		{
			id: 6,
			title: 'Контакты',
			icon: '/icons/contacts.png',
			link: `/${lang}/contacts`,
		},
	]

	// Mock data for quick links
	const quickLinks = [
		{
			id: 1,
			title: 'Поступление в ВУЗы',
			icon: '/icons/admission.png',
			link: `/${lang}/admission`,
		},
		{
			id: 2,
			title: 'Стипендии и гранты',
			icon: '/icons/scholarship.png',
			link: `/${lang}/scholarships`,
		},
		{
			id: 3,
			title: 'Научные проекты',
			icon: '/icons/research.png',
			link: `/${lang}/research`,
		},
		{
			id: 4,
			title: 'Рейтинг ВУЗов',
			icon: '/icons/ranking.png',
			link: `/${lang}/rankings`,
		},
		{
			id: 5,
			title: 'Электронная библиотека',
			icon: '/icons/library.png',
			link: `/${lang}/library`,
		},
		{
			id: 6,
			title: 'Вакансии',
			icon: '/icons/jobs.png',
			link: `/${lang}/jobs`,
		},
	]

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
					src='/hero-image.jpg'
					alt='Министерство Высшего Образования'
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
						Министерство Высшего Образования
					</Typography>
					<Typography variant='h5' sx={{ mb: 4, maxWidth: '800px' }}>
						Республика Узбекистан
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
							<Grid item xs={6} sm={4} md={2} key={service.id}>
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
											<Image
												src={service.icon || '/placeholder.svg'}
												alt={service.title}
												width={30}
												height={30}
											/>
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

					<Grid container spacing={3}>
						{/* Featured news */}
						<Grid item xs={12} md={6}>
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
									image='/featured-news.jpg'
									alt={newsItems[0].title}
								/>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography gutterBottom variant='h5' component='h3'>
										{newsItems[0].title}
									</Typography>
									<Typography
										variant='body2'
										color='text.secondary'
										sx={{ mb: 2 }}
									>
										{newsItems[0].content}
									</Typography>
									<Button
										variant='contained'
										component={Link}
										href={`/${lang}/news/${newsItems[0].slug}`}
									>
										Читать далее
									</Button>
								</CardContent>
							</Card>
						</Grid>

						{/* Other news */}
						<Grid item xs={12} md={6}>
							<Grid container spacing={2}>
								{newsItems.slice(1, 5).map(news => (
									<Grid item xs={12} key={news.id}>
										<Card sx={{ display: 'flex', height: '100%' }}>
											<CardMedia
												component='img'
												sx={{ width: 120 }}
												image={news.image}
												alt={news.title}
											/>
											<CardContent sx={{ flex: '1 0 auto' }}>
												<Typography variant='subtitle1' component='h3'>
													{news.title}
												</Typography>
												<Typography
													variant='body2'
													color='text.secondary'
													noWrap
												>
													{news.content}
												</Typography>
												<Button
													size='small'
													component={Link}
													href={`/${lang}/news/${news.slug}`}
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
				</Container>
			</Box>

			{/* Minister Section */}
			<Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
				<Container>
					<Grid container spacing={4} alignItems='center'>
						<Grid item xs={12} md={4}>
							<Box
								sx={{
									borderRadius: 2,
									overflow: 'hidden',
									boxShadow: 3,
									position: 'relative',
									height: 400,
								}}
							>
								<Image
									src='/minister.jpg'
									alt='Министр высшего образования'
									fill
									style={{ objectFit: 'cover' }}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} md={8}>
							<Typography
								variant='h4'
								component='h2'
								sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}
							>
								Обращение Министра
							</Typography>
							<Typography variant='body1' paragraph>
								Уважаемые посетители официального сайта Министерства высшего
								образования Республики Узбекистан!
							</Typography>
							<Typography variant='body1' paragraph>
								Наша главная цель – обеспечение качественного и доступного
								высшего образования для всех граждан Узбекистана, развитие
								научного потенциала страны и интеграция в международное
								образовательное пространство.
							</Typography>
							<Typography variant='body1' paragraph>
								Мы стремимся создать современную систему высшего образования,
								которая будет соответствовать международным стандартам и
								отвечать потребностям экономики и общества нашей страны.
							</Typography>
							<Typography variant='body1' paragraph>
								Приглашаю вас к активному сотрудничеству и диалогу. Вместе мы
								сможем построить эффективную систему высшего образования,
								которая станет основой для процветания и развития нашей страны.
							</Typography>
							<Box sx={{ mt: 2 }}>
								<Typography variant='h6' component='p' sx={{ fontWeight: 700 }}>
									Абдурахманов Иброхим Юлчиевич
								</Typography>
								<Typography variant='subtitle1' component='p'>
									Министр высшего образования Республики Узбекистан
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* Quick Links Section */}
			<Box sx={{ py: 6 }}>
				<Container>
					<Typography
						variant='h4'
						component='h2'
						sx={{
							fontWeight: 700,
							color: 'primary.main',
							mb: 4,
							textAlign: 'center',
						}}
					>
						Полезные ресурсы
					</Typography>

					<Grid container spacing={3}>
						{quickLinks.map(link => (
							<Grid item xs={6} sm={4} md={2} key={link.id}>
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
											border: '1px solid #e0e0e0',
											borderRadius: 2,
											height: '100%',
											transition: 'all 0.3s',
											'&:hover': {
												transform: 'translateY(-5px)',
												boxShadow: 3,
											},
										}}
									>
										<Box
											sx={{
												width: 50,
												height: 50,
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												mb: 1,
											}}
										>
											<Image
												src={link.icon || '/placeholder.svg'}
												alt={link.title}
												width={30}
												height={30}
											/>
										</Box>
										<Typography
											variant='body2'
											align='center'
											sx={{ color: 'text.primary' }}
										>
											{link.title}
										</Typography>
									</Box>
								</Link>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* Statistics Section */}
			<Box sx={{ py: 6, backgroundColor: 'primary.main', color: 'white' }}>
				<Container>
					<Typography
						variant='h4'
						component='h2'
						sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}
					>
						Высшее образование в цифрах
					</Typography>

					<Grid container spacing={4} justifyContent='center'>
						<Grid item xs={6} sm={3}>
							<Box sx={{ textAlign: 'center' }}>
								<Typography variant='h3' component='p' sx={{ fontWeight: 700 }}>
									120+
								</Typography>
								<Typography variant='body1'>
									Высших учебных заведений
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={6} sm={3}>
							<Box sx={{ textAlign: 'center' }}>
								<Typography variant='h3' component='p' sx={{ fontWeight: 700 }}>
									500K+
								</Typography>
								<Typography variant='body1'>Студентов</Typography>
							</Box>
						</Grid>
						<Grid item xs={6} sm={3}>
							<Box sx={{ textAlign: 'center' }}>
								<Typography variant='h3' component='p' sx={{ fontWeight: 700 }}>
									35K+
								</Typography>
								<Typography variant='body1'>Преподавателей</Typography>
							</Box>
						</Grid>
						<Grid item xs={6} sm={3}>
							<Box sx={{ textAlign: 'center' }}>
								<Typography variant='h3' component='p' sx={{ fontWeight: 700 }}>
									200+
								</Typography>
								<Typography variant='body1'>Международных партнеров</Typography>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* Call to Action */}
			<Box sx={{ py: 6 }}>
				<Container>
					<Box
						sx={{
							backgroundColor: '#f5f5f5',
							borderRadius: 2,
							p: 4,
							textAlign: 'center',
						}}
					>
						<Typography
							variant='h4'
							component='h2'
							sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}
						>
							Остались вопросы?
						</Typography>
						<Typography
							variant='body1'
							sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}
						>
							Свяжитесь с нами для получения дополнительной информации о
							программах, поступлении и других вопросах.
						</Typography>
						<Button
							variant='contained'
							size='large'
							component={Link}
							href={`/${lang}/contacts`}
						>
							Связаться с нами
						</Button>
					</Box>
				</Container>
			</Box>
		</>
	)
}
