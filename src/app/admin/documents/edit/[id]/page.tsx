"use client"

import type React from "react"

import { DocumentCategoryService } from "@/src/service/docs-category.service"
import { DocumentsService } from "@/src/service/documents.service"
import { EducationYearService } from "@/src/service/edu-years.service"
import type { DocumentCategory, EducationYear } from "@/src/types"
import {
  ArrowBack,
  CalendarMonth,
  Cancel,
  Category,
  CloudUpload,
  Description,
  InsertDriveFile,
  NavigateNext,
  Save,
} from "@mui/icons-material"
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, type FormEvent } from "react"

export default function EditDocumentPage() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.id as string // Use as string instead of Number()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [yearId, setYearId] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [currentFile, setCurrentFile] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [categories, setCategories] = useState<DocumentCategory[]>([])
  const [years, setYears] = useState<EducationYear[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [document, setDocument] = useState<any | null>(null)
  const [fetchError, setFetchError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories and years first
        const [categoriesData, yearsData] = await Promise.all([
          DocumentCategoryService.getAll(),
          EducationYearService.getAll(),
        ])

        console.log("Categories data:", categoriesData)
        console.log("Years data:", yearsData)

        // Set categories and years
        setCategories(categoriesData || [])
        setYears(yearsData || [])

        // Then fetch document data
        try {
          const documentData = await DocumentsService.getById(documentId)
          console.log("Document data:", documentData)

          setDocument(documentData)

          // Map API field names to our form fields
          setTitle(documentData.document_name || documentData.title || "")
          setDescription(documentData.document_description || documentData.description || "")

          // Handle category ID
          setCategoryId(documentData.category_id || "")

          // Handle year ID
          setYearId(documentData.document_year || documentData.year_id || "")

          // Handle file URL
          setCurrentFile(documentData.document || documentData.file || "")

          // Extract filename from URL
          if (documentData.document || documentData.file) {
            const fileUrl = documentData.document || documentData.file
            const fileNameFromUrl = fileUrl.split("/").pop() || "Current file"
            setFileName(decodeURIComponent(fileNameFromUrl))
          }
        } catch (docError) {
          console.error("Error fetching document:", docError)
          setFetchError("Не удалось загрузить документ. Пожалуйста, проверьте ID документа.")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setFetchError("Ошибка при загрузке данных. Пожалуйста, попробуйте позже.")
      } finally {
        setLoadingData(false)
      }
    }

    if (documentId) {
      fetchData()
    } else {
      setFetchError("ID документа не указан")
      setLoadingData(false)
    }
  }, [documentId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFileName(selectedFile.name)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    if (!title || !categoryId || !yearId) {
      setError("Пожалуйста, заполните все обязательные поля")
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()

      // Use the API's expected field names
      formData.append("document_name", title)
      if (description) formData.append("document_description", description)
      formData.append("category_id", categoryId)
      formData.append("document_year", yearId)

      if (file) formData.append("document", file)

      console.log("Submitting form data:")
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`)
      }

      await DocumentsService.update(documentId, formData)
      setSuccess(true)

      // Redirect after short delay
      setTimeout(() => {
        router.push("/admin/documents")
      }, 2000)
    } catch (error) {
      console.error("Error updating document:", error)
      setError("Ошибка при обновлении документа. Пожалуйста, попробуйте позже.")
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
            <CircularProgress />
          </Box>
          <Typography align="center">Загрузка документа...</Typography>
        </Paper>
      </Box>
    )
  }

  if (fetchError) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {fetchError}
          </Alert>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => router.push("/admin/documents")}
            sx={{ mt: 2 }}
          >
            Вернуться к списку документов
          </Button>
        </Paper>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
          <Link href="/admin" style={{ textDecoration: "none", color: "inherit" }}>
            Главная
          </Link>
          <Link href="/admin/documents" style={{ textDecoration: "none", color: "inherit" }}>
            Документы
          </Link>
          <Typography color="text.primary">Редактирование документа</Typography>
        </Breadcrumbs>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => router.push("/admin/documents")}
          size="small"
        >
          Назад к списку
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Description sx={{ mr: 1 }} />
          Редактирование документа
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Документ успешно обновлен!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={6}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Основная информация
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <TextField
                    label="Название документа"
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Описание"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={6}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Категория и год
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <FormControl fullWidth required sx={{ mb: 2 }}>
                    <InputLabel>
                      <Category fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                      Категория
                    </InputLabel>
                    <Select
                      value={categoryId}
                      label="Категория"
                      onChange={(e) => setCategoryId(e.target.value as string)}
                      disabled={loading}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.category_name || category.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth required>
                    <InputLabel>
                      <CalendarMonth fontSize="small" sx={{ mr: 0.5, verticalAlign: "middle" }} />
                      Учебный год
                    </InputLabel>
                    <Select
                      value={yearId}
                      label="Учебный год"
                      onChange={(e) => setYearId(e.target.value as string)}
                      disabled={loading}
                    >
                      {years.map((year) => (
                        <MenuItem key={year.id} value={year.id}>
                          {year.year || year.year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Файл документа
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  {currentFile && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Текущий файл:
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <InsertDriveFile color="primary" />
                        <Typography
                          variant="body2"
                          sx={{
                            flex: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {fileName}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => window.open(currentFile, "_blank")}
                          sx={{ minWidth: "auto" }}
                        >
                          Открыть
                        </Button>
                      </Stack>
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Загрузить новый файл:
                  </Typography>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    fullWidth
                    sx={{ mb: 1 }}
                    disabled={loading}
                  >
                    Выбрать файл
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    />
                  </Button>
                  {file && (
                    <Chip
                      label={file.name}
                      onDelete={() => {
                        setFile(null)
                        setFileName("")
                      }}
                      color="primary"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid size={12}>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/admin/documents")}
                  disabled={loading}
                  startIcon={<Cancel />}
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                >
                  {loading ? "Сохранение..." : "Сохранить изменения"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}
