import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Breadcrumbs,
  Pagination,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import Link from "next/link"
import Image from "next/image"

interface NewsPageProps {
  params: {
    lang: string
  }
}

export default function NewsPage({ params }: NewsPageProps) {
  const { lang } = params

  // Локализованные тексты
  const texts = {
    uz: {
      title: "Yangiliklar",
      breadcrumbHome: "Bosh sahifa",
      breadcrumbNews: "Yangiliklar",
      search: "Yangiliklar qidirish...",
      category: "Kategoriya",
      allCategories: "Barcha kategoriyalar",
      sortBy: "Saralash",
      sortByDate: "Sana bo'yicha",
      sortByPopularity: "Mashhurlik bo'yicha",
      readMore: "Batafsil",
      noResults: "Yangiliklar topilmadi",
    },
    ru: {
      title: "Новости",
      breadcrumbHome: "Главная",
      breadcrumbNews: "Новости",
      search: "Поиск новостей...",
      category: "Категория",
      allCategories: "Все категории",
      sortBy: "Сортировать по",
      sortByDate: "По дате",
      sortByPopularity: "По популярности",
      readMore: "Подробнее",
      noResults: "Новости не найдены",
    },
    en: {
      title: "News",
      breadcrumbHome: "Home",
      breadcrumbNews: "News",
      search: "Search news...",
      category: "Category",
      allCategories: "All categories",
      sortBy: "Sort by",
      sortByDate: "By date",
      sortByPopularity: "By popularity",
      readMore: "Read more",
      noResults: "No news found",
    },
  }

  const t = texts[lang as keyof typeof texts] || texts.ru

  // Моковые данные для категорий
  const categories = [
    { id: 1, name: "Образование" },
    { id: 2, name: "Наука" },
    { id: 3, name: "Международное сотрудничество" },
    { id: 4, name: "Мероприятия" },
    { id: 5, name: "Объявления" },
  ]

  // Моковые данные для новостей
  const newsItems = [
    {
      id: 1,
      title: "Встреча с представителями международных университетов",
      content:
        "Министр высшего образования провел встречу с представителями ведущих международных университетов для обсуждения сотрудничества.",
      date: "2023-05-15",
      image: "/news-1.jpg",
      slug: "meeting-with-international-universities",
      category: 3,
    },
    {
      id: 2,
      title: "Новые стандарты высшего образования утверждены",
      content:
        "Правительство утвердило новые образовательные стандарты, которые вступят в силу с нового учебного года.",
      date: "2023-05-10",
      image: "/news-2.png",
      slug: "new-education-standards",
      category: 1,
    },
    {
      id: 3,
      title: "Открытие нового учебного корпуса",
      content: "В Ташкентском государственном университете состоялось торжественное открытие нового учебного корпуса.",
      date: "2023-05-05",
      image: "/news-3.png",
      slug: "new-campus-building-opening",
      category: 4,
    },
    {
      id: 4,
      title: "Международная конференция по инновациям в образовании",
      content: "В Самарканде прошла международная конференция, посвященная инновационным методам в высшем образовании.",
      date: "2023-04-28",
      image: "/news-4.png",
      slug: "international-conference-on-education-innovations",
      category: 2,
    },
    {
      id: 5,
      title: "Подписание меморандума с Кембриджским университетом",
      content: "Министерство высшего образования подписало меморандум о сотрудничестве с Кембриджским университетом.",
      date: "2023-04-20",
      image: "/news-5.png",
      slug: "cambridge-university-memorandum",
      category: 3,
    },
    {
      id: 6,
      title: "Объявлен конкурс на получение государственных грантов",
      content:
        "Министерство высшего образования объявило конкурс на получение государственных грантов для обучения в зарубежных вузах.",
      date: "2023-04-15",
      image: "/news-6.jpg",
      slug: "government-grants-competition",
      category: 5,
    },
    {
      id: 7,
      title: "Научная конференция молодых ученых",
      content:
        "В Национальном университете Узбекистана прошла научная конференция молодых ученых, посвященная актуальным проблемам науки и образования.",
      date: "2023-04-10",
      image: "/news-7.jpg",
      slug: "young-scientists-conference",
      category: 2,
    },
    {
      id: 8,
      title: "Встреча с представителями бизнеса",
      content:
        "Министр высшего образования провел встречу с представителями бизнеса для обсуждения вопросов сотрудничества в области подготовки кадров.",
      date: "2023-04-05",
      image: "/news-8.png",
      slug: "meeting-with-business-representatives",
      category: 4,
    },
  ]

  return (
    <>
      <Box sx={{ bgcolor: "#f5f5f5", py: 3 }}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href={`/${lang}`} passHref>
              {t.breadcrumbHome}
            </Link>
            <Typography color="text.primary">{t.breadcrumbNews}</Typography>
          </Breadcrumbs>
          <Typography variant="h4" component="h1" sx={{ mt: 2, fontWeight: 700, color: "primary.main" }}>
            {t.title}
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 5 }}>
        <Grid container spacing={3}>
          {/* Фильтры и поиск */}
          <Grid item xs={12}>
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder={t.search}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>{t.category}</InputLabel>
                    <Select label={t.category} defaultValue="">
                      <MenuItem value="">{t.allCategories}</MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>{t.sortBy}</InputLabel>
                    <Select label={t.sortBy} defaultValue="date">
                      <MenuItem value="date">{t.sortByDate}</MenuItem>
                      <MenuItem value="popularity">{t.sortByPopularity}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Список новостей */}
          {newsItems.map((news) => (
            <Grid item xs={12} sm={6} md={4} key={news.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <CardMedia component="div" sx={{ pt: "56.25%", position: "relative" }}>
                  <Image src={news.image || "/placeholder.svg"} alt={news.title} fill style={{ objectFit: "cover" }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                    {news.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {new Date(news.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {news.content.length > 120 ? `${news.content.substring(0, 120)}...` : news.content}
                  </Typography>
                  <Button
                    component={Link}
                    href={`/${lang}/news/${news.slug}`}
                    variant="outlined"
                    size="small"
                    sx={{ mt: "auto" }}
                  >
                    {t.readMore}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Пагинация */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination count={10} color="primary" />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
