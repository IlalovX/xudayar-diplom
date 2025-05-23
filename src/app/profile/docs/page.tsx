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
	const [searchTerm, setSearchTerm] = useState('')
	const [filterCategory, setFilterCategory] = useState('')

	const { data: categories = [] } = useGetCategories()
	const { data: years = [] } = useGetYears()

	const { data: docs, refetch } = fetchDocuments({
		document_name: searchTerm,
		category_id: filterCategory,
	})

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
			setValue('document_name', doc.document_name)
			setValue('document_description', doc.document_description)
			setValue('category_id', doc.category_id)
			setValue('document_year', doc.document_year)
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
		formData.append('visible', String(true))

		if (file) {
			formData.append('document', file)
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
			console.error('Error saving document', error)
		}
	}

	const handleDelete = async (id: string) => {
		try {
			await DocumentsService.delete(id)
			refetch()
		} catch (error) {
			console.error('Error deleting document', error)
		}
	}

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: acceptedFiles => setFile(acceptedFiles[0]),
		multiple: false,
	})

	const handleCategoryChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setFilterCategory(event.target.value as string)
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				mb={3}
			>
				<Typography variant='h4'>Documents</Typography>
				<Button
					variant='contained'
					startIcon={<Add />}
					onClick={() => handleOpenDialog()}
				>
					Add
				</Button>
			</Box>

			<Box display='flex' gap={2} mb={3} alignItems='center'>
				<TextField
					label='Search by name'
					variant='outlined'
					value={searchTerm}
					onChange={handleSearchChange}
					fullWidth
				/>
				<TextField
					select
					label='Category'
					value={filterCategory}
					onChange={handleCategoryChange}
					sx={{ width: 200 }}
				>
					<MenuItem value=''>All categories</MenuItem>
					{categories.map(cat => (
						<MenuItem key={cat.id} value={cat.id}>
							{cat.category_name}
						</MenuItem>
					))}
				</TextField>
			</Box>

			<Breadcrumbs separator={<NavigateNext fontSize='small' />} sx={{ mb: 1 }}>
				<Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
					Home
				</Link>
				<Link
					href='/profile'
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					Profile
				</Link>
				<Typography color='text.primary'>My Documents</Typography>
			</Breadcrumbs>

			<Paper>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Description</TableCell>
								<TableCell>Category</TableCell>
								<TableCell>Year</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{docs && docs.length ? (
								docs.map(doc => (
									<TableRow key={doc.id}>
										<TableCell>{doc.document_name}</TableCell>
										<TableCell>{doc.document_description || '-'}</TableCell>
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
										No documents found
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
				<DialogTitle>{selectedDoc ? 'Edit' : 'Add'} Document</DialogTitle>
				<DialogContent dividers>
					<form>
						<Controller
							name='document_name'
							control={control}
							rules={{ required: 'Name is required' }}
							render={({ field }) => (
								<TextField
									{...field}
									label='Name'
									fullWidth
									margin='normal'
									error={!!errors.document_name}
									helperText={errors.document_name?.message}
								/>
							)}
						/>
						<Controller
							name='document_description'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label='Description'
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
							rules={{ required: 'Category is required' }}
							render={({ field }) => (
								<TextField
									{...field}
									label='Category'
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
							rules={{ required: 'Year is required' }}
							render={({ field }) => (
								<TextField
									{...field}
									label='Year'
									select
									fullWidth
									margin='normal'
									error={!!errors.document_year}
									helperText={errors.document_year?.message}
								>
									{years.map(year => (
										<MenuItem key={year.id} value={year.id}>
											{year.year}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
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
								{file ? file.name : 'Drag a file here or click to select'}
							</Typography>
							{!file && <Typography color='error'>File is required</Typography>}
						</Box>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} disabled={isSubmitting}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit(onSubmit)}
						variant='contained'
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Saving...' : 'Save'}
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}
