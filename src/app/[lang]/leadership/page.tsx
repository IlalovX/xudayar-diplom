import { Box, Container, Typography, Grid, Paper, Breadcrumbs, Divider } from "@mui/material"
import Link from "next/link"
import Image from "next/image"

interface LeadershipPageProps {
  params: {
    lang: string
  }
}

export default function LeadershipPage({ params }: LeadershipPageProps) {
  const { lang } = params

  // Локализованные тексты
  const texts = {
    uz: {
      title: "Rahbariyat",
      breadcrumbHome: "Bosh sahifa",
      breadcrumbLeadership: "Rahbariyat",
      minister: "Vazir",
      deputies: "Vazir o'rinbosarlari",
      departments: "Departamentlar rahbarlari",
      biography: "Biografiya",
      responsibilities: "Majburiyatlar",
      contacts: "Kontaktlar",
    },
    ru: {
      title: "Руководство",
      breadcrumbHome: "Главная",
      breadcrumbLeadership: "Руководство",
      minister: "Министр",
      deputies: "Заместители министра",
      departments: "Руководители департаментов",
      biography: "Биография",
      responsibilities: "Обязанности",
      contacts: "Контакты",
    },
    en: {
      title: "Leadership",
      breadcrumbHome: "Home",
      breadcrumbLeadership: "Leadership",
      minister: "Minister",
      deputies: "Deputy Ministers",
      departments: "Department Heads",
      biography: "Biography",
      responsibilities: "Responsibilities",
      contacts: "Contacts",
    },
  }

  const t = texts[lang as keyof typeof texts] || texts.ru

  // Моковые данные для руководства
  const minister = {
    name: "Абдурахманов Иброхим Юлчиевич",
    position: "Министр высшего образования Республики Узбекистан",
    image: "/minister.jpg",
    biography: `
      Родился 5 мая 1970 года в городе Ташкенте. В 1992 году окончил Ташкентский государственный университет (ныне Национальный университет Узбекистана) по специальности "Экономика".
      
      В 1992-1995 годах работал ассистентом кафедры экономической теории Ташкентского государственного университета.
      
      В 1995-1998 годах - аспирант Ташкентского государственного экономического университета.
      
      В 1998-2001 годах - доцент кафедры экономической теории Ташкентского государственного экономического университета.
      
      В 2001-2004 годах - заведующий кафедрой экономической теории Ташкентского государственного экономического университета.
      
      В 2004-2010 годах - проректор по учебной работе Ташкентского государственного экономического университета.
      
      В 2010-2016 годах - ректор Ташкентского государственного экономического университета.
      
      В 2016-2017 годах - первый заместитель министра высшего и среднего специального образования Республики Узбекистан.
      
      С 2017 года - министр высшего образования Республики Узбекистан.
      
      Доктор экономических наук, профессор. Автор более 100 научных работ, в том числе 5 монографий, 10 учебников и учебных пособий.
    `,
    responsibilities: `
      - Общее руководство деятельностью министерства
      - Представление министерства в отношениях с другими органами государственного управления, общественными организациями и иностранными государствами
      - Утверждение положений о структурных подразделениях министерства
      - Назначение и освобождение от должности работников центрального аппарата министерства
      - Издание приказов и распоряжений, обязательных для исполнения всеми работниками системы министерства
      - Распределение обязанностей между заместителями министра
      - Решение других вопросов, отнесенных к компетенции министерства
    `,
    contacts: `
      Телефон: +998 71 123-45-67
      Email: minister@edu.uz
      Приемные дни: понедельник, среда с 10:00 до 12:00
    `,
  }

  const deputies = [
    {
      name: "Исмаилов Рустам Рахматович",
      position: "Первый заместитель министра",
      image: "/deputy-1.jpg",
      biography: `
        Родился 10 июня 1975 года в городе Самарканде. В 1997 году окончил Самаркандский государственный университет по специальности "Математика".
        
        В 1997-2000 годах работал ассистентом кафедры математического анализа Самаркандского государственного университета.
        
        В 2000-2003 годах - аспирант Института математики Академии наук Республики Узбекистан.
        
        В 2003-2007 годах - доцент кафедры математического анализа Самаркандского государственного университета.
        
        В 2007-2012 годах - заведующий кафедрой математического анализа Самаркандского государственного университета.
        
        В 2012-2017 годах - проректор по учебной работе Самаркандского государственного университета.
        
        С 2017 года - первый заместитель министра высшего образования Республики Узбекистан.
        
        Доктор физико-математических наук, профессор. Автор более 80 научных работ, в том числе 3 монографий, 7 учебников и учебных пособий.
      `,
      responsibilities: `
        - Координация деятельности высших учебных заведений
        - Организация учебного процесса в высших учебных заведениях
        - Разработка государственных образовательных стандартов
        - Контроль качества образования
        - Организация повышения квалификации преподавателей
        - Координация международного сотрудничества
      `,
      contacts: `
        Телефон: +998 71 123-45-68
        Email: deputy1@edu.uz
        Приемные дни: вторник, четверг с 10:00 до 12:00
      `,
    },
    {
      name: "Каримова Нигора Алишеровна",
      position: "Заместитель министра по финансово-экономическим вопросам",
      image: "/deputy-2.png",
      biography: `
        Родилась 15 марта 1978 года в городе Бухаре. В 2000 году окончила Ташкентский финансовый институт по специальности "Финансы и кредит".
        
        В 2000-2003 годах работала ассистентом кафедры финансов Ташкентского финансового института.
        
        В 2003-2006 годах - аспирант Ташкентского финансового института.
        
        В 2006-2010 годах - доцент кафедры финансов Ташкентского финансового института.
        
        В 2010-2015 годах - заведующая кафедрой финансов Ташкентского финансового института.
        
        В 2015-2018 годах - проректор по финансово-экономическим вопросам Ташкентского финансового института.
        
        С 2018 года - заместитель министра высшего образования Республики Узбекистан по финансово-экономическим вопросам.
        
        Кандидат экономических наук, доцент. Автор более 50 научных работ, в том числе 2 монографий, 5 учебников и учебных пособий.
      `,
      responsibilities: `
        - Организация финансово-экономической деятельности министерства
        - Формирование бюджета министерства
        - Контроль за целевым использованием бюджетных средств
        - Организация финансово-экономической деятельности высших учебных заведений
        - Разработка нормативных документов по финансово-экономическим вопросам
      `,
      contacts: `
        Телефон: +998 71 123-45-69
        Email: deputy2@edu.uz
        Приемные дни: понедельник, пятница с 14:00 до 16:00
      `,
    },
    {
      name: "Рахимов Бахтияр Садуллаевич",
      position: "Заместитель министра по научной работе и инновациям",
      image: "/deputy-3.png",
      biography: `
        Родился 20 сентября 1972 года в городе Навои. В 1994 году окончил Ташкентский государственный технический университет по специальности "Автоматизация и управление".
        
        В 1994-1997 годах работал ассистентом кафедры автоматизации производственных процессов Ташкентского государственного технического университета.
        
        В 1997-2000 годах - аспирант Ташкентского государственного технического университета.
        
        В 2000-2005 годах - доцент кафедры автоматизации производственных процессов Ташкентского государственного технического университета.
        
        В 2005-2010 годах - заведующий кафедрой автоматизации производственных процессов Ташкентского государственного технического университета.
        
        В 2010-2017 годах - проректор по научной работе Ташкентского государственного технического университета.
        
        С 2017 года - заместитель министра высшего образования Республики Узбекистан по научной работе и инновациям.
        
        Доктор технических наук, профессор. Автор более 120 научных работ, в том числе 4 монографий, 8 учебников и учебных пособий, 15 патентов на изобретения.
      `,
      responsibilities: `
        - Организация научно-исследовательской работы в высших учебных заведениях
        - Координация инновационной деятельности
        - Организация внедрения результатов научных исследований в практику
        - Координация деятельности научно-исследовательских институтов
        - Организация научных конференций, семинаров, симпозиумов
        - Развитие международного научного сотрудничества
      `,
      contacts: `
        Телефон: +998 71 123-45-70
        Email: deputy3@edu.uz
        Приемные дни: среда, пятница с 10:00 до 12:00
      `,
    },
  ]

  const departmentHeads = [
    {
      name: "Ахмедов Фарход Бахтиярович",
      position: "Начальник Департамента организации учебного процесса",
      image: "/department-head-1.jpg",
    },
    {
      name: "Мирзаева Дилором Рахимовна",
      position: "Начальник Департамента международного сотрудничества",
      image: "/department-head-2.png",
    },
    {
      name: "Усманов Шухрат Юлдашевич",
      position: "Начальник Департамента науки и инноваций",
      image: "/department-head-3.jpg",
    },
    {
      name: "Хасанов Акмал Рустамович",
      position: "Начальник Департамента финансово-экономической деятельности",
      image: "/department-head-4.png",
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
            <Typography color="text.primary">{t.breadcrumbLeadership}</Typography>
          </Breadcrumbs>
          <Typography variant="h4" component="h1" sx={{ mt: 2, fontWeight: 700, color: "primary.main" }}>
            {t.title}
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 5 }}>
        {/* Министр */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          {t.minister}
        </Typography>

        <Paper elevation={2} sx={{ p: 3, mb: 5 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 400,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 2,
                }}
              >
                <Image
                  src={minister.image || "/placeholder.svg"}
                  alt={minister.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
                {minister.name}
              </Typography>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                {minister.position}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                {t.biography}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {minister.biography}
              </Typography>

              <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                {t.responsibilities}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {minister.responsibilities}
              </Typography>

              <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                {t.contacts}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {minister.contacts}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Заместители министра */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          {t.deputies}
        </Typography>

        {deputies.map((deputy, index) => (
          <Paper key={index} elevation={2} sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: 300,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 2,
                  }}
                >
                  <Image
                    src={deputy.image || "/placeholder.svg"}
                    alt={deputy.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
                  {deputy.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {deputy.position}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                  {t.biography}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  {deputy.biography}
                </Typography>

                <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                  {t.responsibilities}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  {deputy.responsibilities}
                </Typography>

                <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                  {t.contacts}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  {deputy.contacts}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}

        {/* Руководители департаментов */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          {t.departments}
        </Typography>

        <Grid container spacing={3}>
          {departmentHeads.map((head, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    overflow: "hidden",
                    mb: 2,
                    boxShadow: 2,
                  }}
                >
                  <Image src={head.image || "/placeholder.svg"} alt={head.name} fill style={{ objectFit: "cover" }} />
                </Box>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {head.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {head.position}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
