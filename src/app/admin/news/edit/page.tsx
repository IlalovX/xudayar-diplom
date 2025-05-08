"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Breadcrumbs,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Tooltip,
  Stack,
  LinearProgress,
} from "@mui/material"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import Link from "next/link"
import { NewsService } from "@/src/service/news.service"
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Image as ImageIcon,
} from "@mui/icons-material"

interface NewsFormData {
  title: string
  text: string
}

interface UploadedImage {
  id: number
  url: string
}

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const newsId = Number.parseInt(params.id)

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [newsTitle, setNewsTitle] = useState("")

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<NewsFormData>({
    defaultValues: {
      title: "",
      text: "",
    },
  })

  useEffect(() => {
    const fetchNewsData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const newsData = await NewsService.getById(newsId)
        setNewsTitle(newsData.title)

        // Set form data
        reset({
          title: newsData.title,
          text: newsData.text,
        })

        // Set images
        if (newsData.images) {
          const images: UploadedImage[] = Object.entries(newsData.images).map(([id, url]) => ({
            id: Number.parseInt(id),
            url: url as string,
          }))
          setUploadedImages(images)
        }
      } catch (err: any) {
        setError("Ошибка при загрузке данных новости: " + (err.message || "Неизвестная ошибка"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchNewsData()
  }, [newsId, reset])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setIsUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      const totalFiles = acceptedFiles.length
      let completedFiles = 0

      for (const file of acceptedFiles) {
        const result = await NewsService.uploadImage(file)
        setUploadedImages((prev) => [...prev, { id: result.id, url: result.image }])

        completedFiles++
        setUploadProgress(Math.round((completedFiles / totalFiles) * 100))
      }
    } catch (err: any) {
      setError("Ошибка при загрузке изображения: " + (err.message || "Неизвестная ошибка"))
    } finally {
      setIsUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxSize: 5242880, // 5MB
    onDrop,
  })

  const removeImage = (imageId: number) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const onSubmit = async (data: NewsFormData) => {
    if (uploadedImages.length === 0) {
      setError("Пожалуйста, загрузите хотя бы одно изображение")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("text", data.text)

      // Add image IDs to the form data
      uploadedImages.forEach((img) => {
        formData.append(`images[${img.id}]`, img.url)
      })

      await NewsService.update(newsId, formData)
      router.push("/admin/news")
    } catch (err: any) {
      setError(err.message || "Произошла ошибка при обновлении новости")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}
      >
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="xl">
      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/admin" style={{ textDecoration: "none", color: "inherit" }}>
            Панель управления
          </Link>
          <Link href="/admin/news" style={{ textDecoration: "none", color: "inherit" }}>
            Новости
          </Link>
          <Typography color="text.primary">Редактирование новости</Typography>
        </Breadcrumbs>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "primary.main" }}>
            Редактирование новости
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {newsTitle}
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => router.push("/admin/news")}>
          Назад к списку
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          verity="error" sx={{ mb: 3 }}>{error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
              Информация о новости
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Заголовок обязателен" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Заголовок"
                      fullWidth
                      variant="outlined"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />

                <Controller
                  name="text"
                  control={control}
                  rules={{ required: "Содержание обязательно" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Содержание"
                      fullWidth
                      multiline
                      rows={15}
                      variant="outlined"
                      error={!!errors.text}
                      helperText={errors.text?.message}
                    />
                  )}
                />
              </Stack>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
              Изображения
            </Typography>

            <Box
              {...getRootProps()}
              sx={{
                border: isDragActive ? "2px dashed #1976d2" : "2px dashed #cccccc",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: isDragActive ? "rgba(25, 118, 210, 0.04)" : "transparent",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                },
                mb: 2,
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
              <Typography variant="body1" gutterBottom>
                {isDragActive ? "Отпустите файлы здесь" : "Перетащите изображения сюда или нажмите для выбора"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Поддерживаемые форматы: JPEG, JPG, PNG, GIF, WEBP (макс. 5MB)
              </Typography>
            </Box>

            {isUploading && (
              <Box sx={{ width: "100%", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${uploadProgress}%`}</Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Загрузка изображений...
                </Typography>
              </Box>
            )}

            {uploadedImages.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Загруженные изображения ({uploadedImages.length})
                </Typography>
                <Stack spacing={2} sx={{ mt: 1 }}>
                  {uploadedImages.map((image) => (
                    <Card key={image.id} sx={{ display: "flex", alignItems: "center" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 80, height: 60, objectFit: "cover" }}
                        image={image.url}
                        alt="Uploaded image"
                      />
                      <CardContent sx={{ flexGrow: 1, py: 1, px: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                          ID: {image.id}
                        </Typography>
                      </CardContent>
                      <Tooltip title="Удалить изображение">
                        <IconButton size="small" color="error" onClick={() => removeImage(image.id)} sx={{ mr: 1 }}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Card>
                  ))}
                </Stack>
              </Box>
            )}
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
              Действия
            </Typography>

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || uploadedImages.length === 0 || !isDirty}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Сохранить изменения"}
              </Button>

              <Button fullWidth variant="outlined" onClick={() => router.push("/admin/news")} disabled={isSubmitting}>
                Отмена
              </Button>
            </Stack>

            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2 }} />
              <Stack direction="row" spacing={1} alignItems="center">
                <ImageIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {uploadedImages.length === 0
                    ? "Нет загруженных изображений"
                    : `Загружено изображений: ${uploadedImages.length}`}
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
