import {
	Box,
	Breadcrumbs,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

interface AboutPageProps {
	params: {
		lang: string
	}
}

export default function AboutPage({ params }: AboutPageProps) {
	const { lang } = params

	// Локализованные тексты
	const texts = {
		uz: {
			title: 'Biz haqimizda',
			breadcrumbHome: 'Bosh sahifa',
			breadcrumbAbout: 'Biz haqimizda',
			ministryTitle: "O'zbekiston Respublikasi Oliy ta'lim vazirligi",
			ministryDescription:
				"O'zbekiston Respublikasi Oliy ta'lim vazirligi - oliy ta'lim sohasida davlat siyosatini amalga oshiruvchi davlat boshqaruvi organi.",
			mission: 'Vazirlik missiyasi',
			missionText:
				"Vazirlikning asosiy missiyasi - O'zbekiston Respublikasida oliy ta'lim tizimini rivojlantirish, oliy ta'lim muassasalarining faoliyatini muvofiqlashtirish, oliy ma'lumotli mutaxassislar tayyorlash sifatini oshirish va xalqaro standartlarga moslashtirish.",
			history: 'Vazirlik tarixi',
			historyText:
				"O'zbekiston Respublikasi Oliy ta'lim vazirligi 2017-yilda O'zbekiston Respublikasi Prezidentining farmoni bilan tashkil etilgan. Vazirlik oliy ta'lim sohasida davlat siyosatini amalga oshirish, oliy ta'lim muassasalarining faoliyatini muvofiqlashtirish va nazorat qilish, oliy ma'lumotli mutaxassislar tayyorlash sifatini oshirish va xalqaro standartlarga moslashtirish vazifalarini bajaradi.",
			structure: 'Vazirlik tuzilmasi',
			structureText:
				"Vazirlik tuzilmasi O'zbekiston Respublikasi Prezidentining farmoni bilan tasdiqlangan. Vazirlik tarkibiga vazir, vazir o'rinbosarlari, departamentlar, boshqarmalar va bo'limlar kiradi.",
			goals: 'Vazirlikning asosiy maqsadlari',
			goal1: "Oliy ta'lim tizimini rivojlantirish",
			goal1Text:
				"Oliy ta'lim tizimini rivojlantirish, oliy ta'lim muassasalarining moddiy-texnik bazasini mustahkamlash, o'quv jarayonini zamonaviy axborot-kommunikatsiya texnologiyalari bilan ta'minlash.",
			goal2: "Oliy ta'lim sifatini oshirish",
			goal2Text:
				"Oliy ta'lim sifatini oshirish, oliy ma'lumotli mutaxassislar tayyorlash sifatini xalqaro standartlarga moslashtirish, oliy ta'lim muassasalarining xalqaro reytinglardagi o'rnini yaxshilash.",
			goal3: 'Xalqaro hamkorlikni rivojlantirish',
			goal3Text:
				"Xalqaro hamkorlikni rivojlantirish, xorijiy oliy ta'lim muassasalari bilan hamkorlikni kengaytirish, qo'shma ta'lim dasturlarini joriy etish, talabalar va o'qituvchilar almashinuvini yo'lga qo'yish.",
			goal4: 'Ilmiy-tadqiqot ishlarini rivojlantirish',
			goal4Text:
				"Ilmiy-tadqiqot ishlarini rivojlantirish, oliy ta'lim muassasalarida ilmiy-tadqiqot ishlarini olib borish uchun shart-sharoitlar yaratish, ilmiy-tadqiqot natijalarini amaliyotga joriy etish.",
			contacts: "Aloqa ma'lumotlari",
			address: "Manzil: Toshkent shahri, Universitet ko'chasi, 7",
			phone: 'Telefon: +998 71 123-45-67',
			email: 'Email: info@edu.uz',
			website: 'Veb-sayt: www.edu.uz',
		},
		ru: {
			title: 'О нас',
			breadcrumbHome: 'Главная',
			breadcrumbAbout: 'О нас',
			ministryTitle: 'Министерство Высшего Образования Республики Узбекистан',
			ministryDescription:
				'Министерство Высшего Образования Республики Узбекистан - орган государственного управления, осуществляющий государственную политику в сфере высшего образования.',
			mission: 'Миссия министерства',
			missionText:
				'Основная миссия министерства - развитие системы высшего образования в Республике Узбекистан, координация деятельности высших учебных заведений, повышение качества подготовки специалистов с высшим образованием и приведение его в соответствие с международными стандартами.',
			history: 'История министерства',
			historyText:
				'Министерство Высшего Образования Республики Узбекистан было создано в 2017 году указом Президента Республики Узбекистан. Министерство выполняет задачи по реализации государственной политики в сфере высшего образования, координации и контролю деятельности высших учебных заведений, повышению качества подготовки специалистов с высшим образованием и приведению его в соответствие с международными стандартами.',
			structure: 'Структура министерства',
			structureText:
				'Структура министерства утверждена указом Президента Республики Узбекистан. В состав министерства входят министр, заместители министра, департаменты, управления и отделы.',
			goals: 'Основные цели министерства',
			goal1: 'Развитие системы высшего образования',
			goal1Text:
				'Развитие системы высшего образования, укрепление материально-технической базы высших учебных заведений, обеспечение учебного процесса современными информационно-коммуникационными технологиями.',
			goal2: 'Повышение качества высшего образования',
			goal2Text:
				'Повышение качества высшего образования, приведение качества подготовки специалистов с высшим образованием в соответствие с международными стандартами, улучшение позиций высших учебных заведений в международных рейтингах.',
			goal3: 'Развитие международного сотрудничества',
			goal3Text:
				'Развитие международного сотрудничества, расширение сотрудничества с зарубежными высшими учебными заведениями, внедрение совместных образовательных программ, организация обмена студентами и преподавателями.',
			goal4: 'Развитие научно-исследовательской работы',
			goal4Text:
				'Развитие научно-исследовательской работы, создание условий для проведения научно-исследовательских работ в высших учебных заведениях, внедрение результатов научных исследований в практику.',
			contacts: 'Контактная информация',
			address: 'Адрес: г. Ташкент, ул. Университетская, 7',
			phone: 'Телефон: +998 71 123-45-67',
			email: 'Email: info@edu.uz',
			website: 'Веб-сайт: www.edu.uz',
		},
		en: {
			title: 'About Us',
			breadcrumbHome: 'Home',
			breadcrumbAbout: 'About Us',
			ministryTitle:
				'Ministry of Higher Education of the Republic of Uzbekistan',
			ministryDescription:
				'The Ministry of Higher Education of the Republic of Uzbekistan is a state administration body that implements state policy in the field of higher education.',
			mission: 'Ministry Mission',
			missionText:
				'The main mission of the ministry is to develop the higher education system in the Republic of Uzbekistan, coordinate the activities of higher educational institutions, improve the quality of training specialists with higher education and bring it in line with international standards.',
			history: 'Ministry History',
			historyText:
				'The Ministry of Higher Education of the Republic of Uzbekistan was established in 2017 by decree of the President of the Republic of Uzbekistan. The ministry performs tasks for the implementation of state policy in the field of higher education, coordination and control of the activities of higher educational institutions, improving the quality of training specialists with higher education and bringing it in line with international standards.',
			structure: 'Ministry Structure',
			structureText:
				'The structure of the ministry is approved by decree of the President of the Republic of Uzbekistan. The ministry includes the minister, deputy ministers, departments, administrations and divisions.',
			goals: 'Main Goals of the Ministry',
			goal1: 'Development of the higher education system',
			goal1Text:
				'Development of the higher education system, strengthening the material and technical base of higher educational institutions, providing the educational process with modern information and communication technologies.',
			goal2: 'Improving the quality of higher education',
			goal2Text:
				'Improving the quality of higher education, bringing the quality of training specialists with higher education in line with international standards, improving the positions of higher educational institutions in international rankings.',
			goal3: 'Development of international cooperation',
			goal3Text:
				'Development of international cooperation, expansion of cooperation with foreign higher educational institutions, introduction of joint educational programs, organization of exchange of students and teachers.',
			goal4: 'Development of research work',
			goal4Text:
				'Development of research work, creation of conditions for conducting research work in higher educational institutions, implementation of research results in practice.',
			contacts: 'Contact Information',
			address: 'Address: Tashkent, University Street, 7',
			phone: 'Phone: +998 71 123-45-67',
			email: 'Email: info@edu.uz',
			website: 'Website: www.edu.uz',
		},
	}

	const t = texts[lang as keyof typeof texts] || texts.ru

	return (
		<>
			<Box sx={{ bgcolor: '#f5f5f5', py: 3 }}>
				<Container>
					<Breadcrumbs aria-label='breadcrumb'>
						<Link href={`/${lang}`} passHref>
							{t.breadcrumbHome}
						</Link>
						<Typography color='text.primary'>{t.breadcrumbAbout}</Typography>
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
					<Grid item xs={12} md={6}>
						<Typography
							variant='h5'
							component='h2'
							gutterBottom
							sx={{ fontWeight: 700, color: 'primary.main' }}
						>
							{t.ministryTitle}
						</Typography>
						<Typography variant='body1' paragraph>
							{t.ministryDescription}
						</Typography>
						<Typography
							variant='h6'
							component='h3'
							gutterBottom
							sx={{ mt: 4, fontWeight: 700, color: 'primary.main' }}
						>
							{t.mission}
						</Typography>
						<Typography variant='body1' paragraph>
							{t.missionText}
						</Typography>
						<Typography
							variant='h6'
							component='h3'
							gutterBottom
							sx={{ mt: 4, fontWeight: 700, color: 'primary.main' }}
						>
							{t.history}
						</Typography>
						<Typography variant='body1' paragraph>
							{t.historyText}
						</Typography>
					</Grid>
					<Grid item xs={12} md={6}>
						<Box
							sx={{
								position: 'relative',
								height: '100%',
								minHeight: 400,
								borderRadius: 2,
								overflow: 'hidden',
								boxShadow: 3,
							}}
						>
							<Image
								src='/ministry-building.jpg'
								alt={t.ministryTitle}
								fill
								style={{ objectFit: 'cover' }}
								priority
							/>
						</Box>
					</Grid>
				</Grid>

				<Divider sx={{ my: 5 }} />

				<Typography
					variant='h5'
					component='h2'
					gutterBottom
					sx={{ fontWeight: 700, color: 'primary.main' }}
				>
					{t.structure}
				</Typography>
				<Typography variant='body1' paragraph>
					{t.structureText}
				</Typography>

				<Box sx={{ mt: 4, mb: 5 }}>
					<Image
						src='/ministry-structure.jpg'
						alt='Структура министерства'
						width={1000}
						height={600}
						style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
					/>
				</Box>

				<Divider sx={{ my: 5 }} />

				<Typography
					variant='h5'
					component='h2'
					gutterBottom
					sx={{ fontWeight: 700, color: 'primary.main' }}
				>
					{t.goals}
				</Typography>

				<Grid container spacing={3} sx={{ mt: 2 }}>
					<Grid xs={12} md={6}>
						<Paper elevation={2} sx={{ p: 3, height: '100%' }}>
							<Typography
								variant='h6'
								component='h3'
								gutterBottom
								sx={{ fontWeight: 700, color: 'primary.main' }}
							>
								{t.goal1}
							</Typography>
							<Typography variant='body1'>{t.goal1Text}</Typography>
						</Paper>
					</Grid>
					<Grid xs={12} md={6}>
						<Paper elevation={2} sx={{ p: 3, height: '100%' }}>
							<Typography
								variant='h6'
								component='h3'
								gutterBottom
								sx={{ fontWeight: 700, color: 'primary.main' }}
							>
								{t.goal2}
							</Typography>
							<Typography variant='body1'>{t.goal2Text}</Typography>
						</Paper>
					</Grid>
					<Grid xs={12} md={6}>
						<Paper elevation={2} sx={{ p: 3, height: '100%' }}>
							<Typography
								variant='h6'
								component='h3'
								gutterBottom
								sx={{ fontWeight: 700, color: 'primary.main' }}
							>
								{t.goal3}
							</Typography>
							<Typography variant='body1'>{t.goal3Text}</Typography>
						</Paper>
					</Grid>
					<Grid  xs={12} md={6}>
						<Paper elevation={2} sx={{ p: 3, height: '100%' }}>
							<Typography
								variant='h6'
								component='h3'
								gutterBottom
								sx={{ fontWeight: 700, color: 'primary.main' }}
							>
								{t.goal4}
							</Typography>
							<Typography variant='body1'>{t.goal4Text}</Typography>
						</Paper>
					</Grid>
				</Grid>

				<Divider sx={{ my: 5 }} />

				<Paper elevation={3} sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2 }}>
					<Typography
						variant='h5'
						component='h2'
						gutterBottom
						sx={{ fontWeight: 700, color: 'primary.main' }}
					>
						{t.contacts}
					</Typography>
					<Typography variant='body1' paragraph>
						{t.address}
					</Typography>
					<Typography variant='body1' paragraph>
						{t.phone}
					</Typography>
					<Typography variant='body1' paragraph>
						{t.email}
					</Typography>
					<Typography variant='body1'>{t.website}</Typography>
				</Paper>
			</Container>
		</>
	)
}
