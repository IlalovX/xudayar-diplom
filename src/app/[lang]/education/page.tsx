import { CheckCircle as CheckCircleIcon, School as SchoolIcon } from "@mui/icons-material"
import {
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardContent,
	CardMedia,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography,
} from "@mui/material"
import Image from "next/image"
import Link from "next/link"

interface EducationPageProps {
  params: {
    lang: string
  }
}

export default function EducationPage({ params }: EducationPageProps) {
  const { lang } = params

  // Локализованные тексты
  const texts = {
    uz: {
      title: "Ta'lim",
      breadcrumbHome: "Bosh sahifa",
      breadcrumbEducation: "Ta'lim",
      introduction: "Kirish",
      introductionText:
        "O'zbekiston Respublikasi Oliy ta'lim vazirligi oliy ta'lim sohasida davlat siyosatini amalga oshiruvchi davlat boshqaruvi organi hisoblanadi. Vazirlik oliy ta'lim muassasalarining faoliyatini muvofiqlashtiradi, oliy ma'lumotli mutaxassislar tayyorlash sifatini oshirish va xalqaro standartlarga moslashtirish bo'yicha ishlarni olib boradi.",
      educationLevels: "Ta'lim darajalari",
      bachelor: "Bakalavr",
      bachelorText:
        "Bakalavr - oliy ta'limning birinchi darajasi bo'lib, u 4 yil davomida o'qitiladi. Bakalavr dasturi talabalarni nazariy bilimlar va amaliy ko'nikmalar bilan ta'minlaydi.",
      master: "Magistr",
      masterText:
        "Magistr - oliy ta'limning ikkinchi darajasi bo'lib, u 2 yil davomida o'qitiladi. Magistr dasturi talabalarni chuqurlashtirilgan nazariy bilimlar va ilmiy-tadqiqot ko'nikmalari bilan ta'minlaydi.",
      phd: "PhD",
      phdText:
        "PhD - oliy ta'limning uchinchi darajasi bo'lib, u 3 yil davomida o'qitiladi. PhD dasturi talabalarni mustaqil ilmiy-tadqiqot olib borish ko'nikmalari bilan ta'minlaydi.",
      educationPrograms: "Ta'lim dasturlari",
      viewPrograms: "Dasturlarni ko'rish",
      admissionProcess: "Qabul jarayoni",
      admissionProcessText:
        "Oliy ta'lim muassasalariga qabul jarayoni har yili iyun-iyul oylarida o'tkaziladi. Abituriyentlar test sinovlaridan o'tishlari kerak. Test sinovlari natijalari asosida abituriyentlar davlat granti yoki to'lov-kontrakt asosida o'qishga qabul qilinadilar.",
      internationalCooperation: "Xalqaro hamkorlik",
      internationalCooperationText:
        "O'zbekiston Respublikasi Oliy ta'lim vazirligi xorijiy oliy ta'lim muassasalari bilan hamkorlikni rivojlantirish, qo'shma ta'lim dasturlarini joriy etish, talabalar va o'qituvchilar almashinuvini yo'lga qo'yish bo'yicha ishlarni olib boradi.",
      educationalStandards: "Ta'lim standartlari",
      educationalStandardsText:
        "O'zbekiston Respublikasi Oliy ta'lim vazirligi oliy ta'lim davlat ta'lim standartlarini ishlab chiqadi va tasdiqlaydi. Davlat ta'lim standartlari oliy ta'lim muassasalarida o'quv jarayonini tashkil etish uchun asos bo'lib xizmat qiladi.",
      qualityAssurance: "Sifatni ta'minlash",
      qualityAssuranceText:
        "O'zbekiston Respublikasi Oliy ta'lim vazirligi oliy ta'lim muassasalarida ta'lim sifatini ta'minlash bo'yicha ishlarni olib boradi. Vazirlik oliy ta'lim muassasalarini akkreditatsiyadan o'tkazadi, oliy ta'lim muassasalarining reytingini aniqlaydi.",
      benefits: "Afzalliklar",
      benefit1: "Zamonaviy o'quv dasturlari",
      benefit2: "Malakali o'qituvchilar",
      benefit3: "Xalqaro standartlarga mos ta'lim",
      benefit4: "Amaliy ko'nikmalarni rivojlantirish",
      benefit5: "Xalqaro almashinuv dasturlari",
      learnMore: "Batafsil ma'lumot",
    },
    ru: {
      title: "Образование",
      breadcrumbHome: "Главная",
      breadcrumbEducation: "Образование",
      introduction: "Введение",
      introductionText:
        "Министерство высшего образования Республики Узбекистан является органом государственного управления, осуществляющим государственную политику в сфере высшего образования. Министерство координирует деятельность высших учебных заведений, проводит работу по повышению качества подготовки специалистов с высшим образованием и приведению его в соответствие с международными стандартами.",
      educationLevels: "Уровни образования",
      bachelor: "Бакалавриат",
      bachelorText:
        "Бакалавриат - первая ступень высшего образования, которая длится 4 года. Программа бакалавриата обеспечивает студентов теоретическими знаниями и практическими навыками.",
      master: "Магистратура",
      masterText:
        "Магистратура - вторая ступень высшего образования, которая длится 2 года. Программа магистратуры обеспечивает студентов углубленными теоретическими знаниями и навыками научно-исследовательской работы.",
      phd: "Докторантура",
      phdText:
        "Докторантура - третья ступень высшего образования, которая длится 3 года. Программа докторантуры обеспечивает студентов навыками самостоятельной научно-исследовательской работы.",
      educationPrograms: "Образовательные программы",
      viewPrograms: "Просмотреть программы",
      admissionProcess: "Процесс поступления",
      admissionProcessText:
        "Процесс поступления в высшие учебные заведения проводится ежегодно в июне-июле. Абитуриенты должны пройти тестовые испытания. На основании результатов тестовых испытаний абитуриенты зачисляются на обучение на основе государственного гранта или платно-контрактной основе.",
      internationalCooperation: "Международное сотрудничество",
      internationalCooperationText:
        "Министерство высшего образования Республики Узбекистан проводит работу по развитию сотрудничества с зарубежными высшими учебными заведениями, внедрению совместных образовательных программ, организации обмена студентами и преподавателями.",
      educationalStandards: "Образовательные стандарты",
      educationalStandardsText:
        "Министерство высшего образования Республики Узбекистан разрабатывает и утверждает государственные образовательные стандарты высшего образования. Государственные образовательные стандарты служат основой для организации учебного процесса в высших учебных заведениях.",
      qualityAssurance: "Обеспечение качества",
      qualityAssuranceText:
        "Министерство высшего образования Республики Узбекистан проводит работу по обеспечению качества образования в высших учебных заведениях. Министерство проводит аккредитацию высших учебных заведений, определяет рейтинг высших учебных заведений.",
      benefits: "Преимущества",
      benefit1: "Современные учебные программы",
      benefit2: "Квалифицированные преподаватели",
      benefit3: "Образование, соответствующее международным стандартам",
      benefit4: "Развитие практических навыков",
      benefit5: "Международные программы обмена",
      learnMore: "Узнать больше",
    },
    en: {
      title: "Education",
      breadcrumbHome: "Home",
      breadcrumbEducation: "Education",
      introduction: "Introduction",
      introductionText:
        "The Ministry of Higher Education of the Republic of Uzbekistan is a state administration body that implements state policy in the field of higher education. The Ministry coordinates the activities of higher educational institutions, works to improve the quality of training specialists with higher education and bring it in line with international standards.",
      educationLevels: "Education Levels",
      bachelor: "Bachelor's Degree",
      bachelorText:
        "Bachelor's degree is the first level of higher education, which lasts 4 years. The bachelor's program provides students with theoretical knowledge and practical skills.",
      master: "Master's Degree",
      masterText:
        "Master's degree is the second level of higher education, which lasts 2 years. The master's program provides students with in-depth theoretical knowledge and research skills.",
      phd: "PhD",
      phdText:
        "PhD is the third level of higher education, which lasts 3 years. The PhD program provides students with independent research skills.",
      educationPrograms: "Education Programs",
      viewPrograms: "View Programs",
      admissionProcess: "Admission Process",
      admissionProcessText:
        "The admission process to higher educational institutions is conducted annually in June-July. Applicants must pass test examinations. Based on the results of test examinations, applicants are admitted to study on the basis of a state grant or on a paid-contract basis.",
      internationalCooperation: "International Cooperation",
      internationalCooperationText:
        "The Ministry of Higher Education of the Republic of Uzbekistan works to develop cooperation with foreign higher educational institutions, introduce joint educational programs, and organize the exchange of students and teachers.",
      educationalStandards: "Educational Standards",
      educationalStandardsText:
        "The Ministry of Higher Education of the Republic of Uzbekistan develops and approves state educational standards for higher education. State educational standards serve as the basis for organizing the educational process in higher educational institutions.",
      qualityAssurance: "Quality Assurance",
      qualityAssuranceText:
        "The Ministry of Higher Education of the Republic of Uzbekistan works to ensure the quality of education in higher educational institutions. The Ministry conducts accreditation of higher educational institutions, determines the rating of higher educational institutions.",
      benefits: "Benefits",
      benefit1: "Modern curricula",
      benefit2: "Qualified teachers",
      benefit3: "Education that meets international standards",
      benefit4: "Development of practical skills",
      benefit5: "International exchange programs",
      learnMore: "Learn More",
    },
  }

  const t = texts[lang as keyof typeof texts] || texts.ru

  return (
    <>
      <Box sx={{ bgcolor: "#f5f5f5", py: 3 }}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href={`/${lang}`} passHref>
              {t.breadcrumbHome}
            </Link>
            <Typography color="text.primary">{t.breadcrumbEducation}</Typography>
          </Breadcrumbs>
          <Typography variant="h4" component="h1" sx={{ mt: 2, fontWeight: 700, color: "primary.main" }}>
            {t.title}
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 5 }}>
        {/* Введение */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: "primary.main" }}>
            {t.introduction}
          </Typography>
          <Typography variant="body1" paragraph>
            {t.introductionText}
          </Typography>
        </Box>

        {/* Уровни образования */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          {t.educationLevels}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SchoolIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                  {t.bachelor}
                </Typography>
              </Box>
              <Typography variant="body1">{t.bachelorText}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SchoolIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                  {t.master}
                </Typography>
              </Box>
              <Typography variant="body1">{t.masterText}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SchoolIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                  {t.phd}
                </Typography>
              </Box>
              <Typography variant="body1">{t.phdText}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Образовательные программы */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: "primary.main" }}>
            {t.educationPrograms}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                  <Image src="/program-it.jpg" alt="Информационные технологии" fill style={{ objectFit: "cover" }} />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Информационные технологии
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Программы обучения в области информационных технологий, включая программирование, базы данных, сети
                    и информационную безопасность.
                  </Typography>
                  <Button variant="outlined" component={Link} href={`/${lang}/education/programs/it`}>
                    {t.learnMore}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                  <Image src="/program-economics.jpg" alt="Экономика" fill style={{ objectFit: "cover" }} />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Экономика
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Программы обучения в области экономики, включая макроэкономику, микроэкономику, финансы и
                    бухгалтерский учет.
                  </Typography>
                  <Button variant="outlined" component={Link} href={`/${lang}/education/programs/economics`}>
                    {t.learnMore}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                  <Image src="/program-languages.jpg" alt="Иностранные языки" fill style={{ objectFit: "cover" }} />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Иностранные языки
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Программы обучения иностранным языкам, включая английский, немецкий, французский, китайский и другие
                    языки.
                  </Typography>
                  <Button variant="outlined" component={Link} href={`/${lang}/education/programs/languages`}>
                    {t.learnMore}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button variant="contained" component={Link} href={`/${lang}/education/programs`}>
              {t.viewPrograms}
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Процесс поступления */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: "primary.main" }}>
              {t.admissionProcess}
            </Typography>
            <Typography variant="body1" paragraph>
              {t.admissionProcessText}
            </Typography>
            <Button variant="contained" component={Link} href={`/${lang}/admission`}>
              {t.learnMore}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative", width: "100%", height: 300, borderRadius: 2, overflow: "hidden" }}>
              <Image src="/admission.jpg" alt={t.admissionProcess} fill style={{ objectFit: "cover" }} />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        {/* Образовательные стандарты и качество */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: "primary.main" }}>
                {t.educationalStandards}
              </Typography>
              <Typography variant="body1" paragraph>
                {t.educationalStandardsText}
              </Typography>
              <Button variant="outlined" component={Link} href={`/${lang}/education/standards`}>
                {t.learnMore}
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: "primary.main" }}>
                {t.qualityAssurance}
              </Typography>
              <Typography variant="body1" paragraph>
                {t.qualityAssuranceText}
              </Typography>
              <Button variant="outlined" component={Link} href={`/${lang}/education/quality`}>
                {t.learnMore}
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Преимущества */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
            {t.benefits}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={t.benefit1} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={t.benefit2} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={t.benefit3} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={t.benefit4} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={t.benefit5} />
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  )
}
