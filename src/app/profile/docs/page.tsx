'use client'

import { useGetCategories } from '@/src/hooks/useDocumentCategories'
import {
	fetchDocuments,
	useCreateDocument,
	useDeleteDocument,
	useUpdateDocument,
} from '@/src/hooks/useDocuments'
import { useGetYears } from '@/src/hooks/useEducationYears'
import { DocumentsService } from '@/src/service/documents.service'

import {
	Add,
	Delete as DeleteIcon,
	Download,
	Edit as EditIcon,
	NavigateNext,
} from '@mui/icons-material'
import {
	Box,
	Breadcrumbs,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import Link from 'next/link'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'

type DocFormData = {
	document_name: string
	document_description: string
	category_id: string
	document_year: string
	file: File | null
	visible: boolean
}
type DocumentWithId = DocFormData & { id: string }
export default function DocsPage() {
	const { data: docs = [], refetch } = fetchDocuments<DocumentWithId[]>()
	const { data: categories = [] } = useGetCategories()
	const { data: years = [] } = useGetYears()

	const createDocument = useCreateDocument()
	const updateDocument = useUpdateDocument()
	const deleteDocument = useDeleteDocument()

	const [openDialog, setOpenDialog] = useState(false)
	const [selectedDoc, setSelectedDoc] = useState<any | null>(null)
	const [file, setFile] = useState<File | null>(null)

	const {
		control,
		handleSubmit,
		reset,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<DocFormData>()

	const handleOpenDialog = (doc?: any) => {
		setSelectedDoc(doc || null)
		setFile(null)

		if (doc) {
			setValue('document_name', doc.title)
			setValue('document_description', doc.description)
			setValue('category_id', doc.categoryId)
			setValue('document_year', doc.yearId)
		} else {
			reset()
		}

		setOpenDialog(true)
	}

	const handleCloseDialog = () => {
		setOpenDialog(false)
		reset()
		setFile(null)
		setSelectedDoc(null)
	}

	const onSubmit = async (data: DocFormData) => {
		const formData = new FormData()
		formData.append('document_name', data.document_name)
		formData.append('document_description', data.document_description)
		formData.append('category_id', data.category_id)
		formData.append('document_year', data.document_year)
		formData.append('visible', Boolean(true))

		if (file) {
			formData.append('document', file) // Это должно совпадать с ключом на сервере
		}

		// Печатаем formData перед отправкой
		for (let pair of formData.entries()) {
			console.log(pair[0] + ': ' + pair[1])
		}

		try {
			if (selectedDoc) {
				await updateDocument.mutateAsync({ id: selectedDoc.id, formData })
			} else {
				await createDocument.mutateAsync(formData)
			}
			refetch()
			handleCloseDialog()
		} catch (error) {
			console.error('Ошибка при сохранении документа', error)
		}
	}

	const handleDelete = async (id: string) => {
		try {
			await DocumentsService.delete(id)
			refetch()
		} catch (error) {
			console.error('Ошибка при удалении документа', error)
		}
	}

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: acceptedFiles => setFile(acceptedFiles[0]),
		multiple: false,
	})

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				mb={3}
			>
				<Typography variant='h4'>Документы</Typography>
				<Button
					variant='contained'
					startIcon={<Add />}
					onClick={() => handleOpenDialog()}
				>
					Добавить
				</Button>
			</Box>
			<Breadcrumbs separator={<NavigateNext fontSize='small' />} sx={{ mb: 1 }}>
				<Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
					Главная
				</Link>
				<Link
					href='/profile'
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					Профиль
				</Link>
				<Typography color='text.primary'>Мои документы</Typography>
			</Breadcrumbs>
			<Paper>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Название</TableCell>
								<TableCell>Описание</TableCell>
								<TableCell>Категория</TableCell>
								<TableCell>Год</TableCell>
								<TableCell>Действия</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{docs.length ? (
								docs.map(doc => (
									<TableRow key={doc.id}>
										<TableCell>{doc.document_name}</TableCell>
										<TableCell>{doc.document_description}</TableCell>
										<TableCell>
											{categories.find(cat => cat.id === doc.category_id)
												?.category_name || '—'}
										</TableCell>
										<TableCell>
											{years.find(year => year.id === doc.document_year)
												?.year || '—'}
										</TableCell>

										<TableCell>
											<IconButton
												onClick={() => window.open(doc.document, '_blank')}
											>
												<Download />
											</IconButton>
											<IconButton onClick={() => handleOpenDialog(doc)}>
												<EditIcon />
											</IconButton>
											<IconButton onClick={() => handleDelete(doc.id)}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={5} align='center'>
										Документы не найдены
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				fullWidth
				maxWidth='sm'
			>
				<DialogTitle>
					{selectedDoc ? 'Редактировать' : 'Добавить'} документ
				</DialogTitle>
				<DialogContent dividers>
					<form>
						<Controller
							name='document_name'
							control={control}
							rules={{ required: 'Название обязательно' }}
							render={({ field }) => (
								<TextField
									{...field}
									label='Название'
									fullWidth
									margin='normal'
									error={!!errors.title}
									helperText={errors.title?.message}
								/>
							)}
						/>
						<Controller
							name='document_description'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label='Описание'
									fullWidth
									margin='normal'
									multiline
									rows={3}
								/>
							)}
						/>
						<Controller
							name='category_id'
							control={control}
							rules={{ required: 'Категория обязательна' }}
							render={({ field }) => (
								<TextField
									{...field}
									label='Категория'
									select
									fullWidth
									margin='normal'
									error={!!errors.category_id}
									helperText={errors.category_id?.message}
								>
									{categories.map(cat => (
										<MenuItem key={cat.id} value={cat.id}>
											{cat.category_name}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
						<Controller
							name='document_year'
							control={control}
							rules={{ required: 'Год обязателен' }}
							render={({ field }) => (
								<TextField
									{...field}
									label='Год'
									select
									fullWidth
									margin='normal'
									error={!!errors.yearId}
									helperText={errors.yearId?.message}
								>
									{years.map(year => (
										<MenuItem key={year.id} value={year.id}>
											{year.year}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
						{/* File upload validation */}
						<Box
							{...getRootProps()}
							sx={{
								border: '2px dashed #ccc',
								borderRadius: 2,
								padding: 2,
								textAlign: 'center',
								mt: 2,
								cursor: 'pointer',
							}}
						>
							<input {...getInputProps()} />
							<Typography>
								{file
									? file.name
									: 'Перетащите файл сюда или кликните для выбора'}
							</Typography>
							{!file && (
								<Typography color='error'>
									Файл обязателен для загрузки
								</Typography>
							)}
						</Box>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} disabled={isSubmitting}>
						Отмена
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						variant='contained'
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Сохранение...' : 'Сохранить'}
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}
