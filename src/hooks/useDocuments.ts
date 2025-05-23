import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../api/interceptors'

interface Document {
	// определите поля документа
	id: string
	document_name: string
	category_id: string
	// ... другие поля
}

interface FetchDocumentsParams {
	document_name?: string
	category_id?: string
}

export function fetchDocuments(params?: FetchDocumentsParams) {
	return useQuery<Document[]>({
		queryKey: ['get documents', params],
		queryFn: async () => {
			// Формируем query-параметры для GET-запроса
			const queryParams = new URLSearchParams()

			if (params?.document_name) {
				queryParams.append('document_name', params.document_name)
			}

			if (params?.category_id) {
				queryParams.append('category_id', params.category_id)
			}

			const { data } = await axiosInstance.get(
				`/api/v1/documents/document/?${queryParams.toString()}`
			)
			return data
		},
	})
}
// Fetch document by ID
export function fetchDocumentById(id: string) {
	return useQuery<Document>({
		queryKey: ['get document', id],
		queryFn: async () => {
			const { data } = await axiosInstance.get(
				`/api/v1/documents/document/${id}`
			)
			return data
		},
	})
}

// Create a new document
export function useCreateDocument() {
	return useMutation<Document, Error, FormData>({
		mutationKey: ['create document'],
		mutationFn: async formData => {
			const { data } = await axiosInstance.post(
				'/api/v1/documents/document/',
				formData
			)
			return data
		},
	})
}

// Update an existing document
export function useUpdateDocument() {
	return useMutation<Document, Error, { id: string; formData: FormData }>({
		mutationKey: ['update document'],
		mutationFn: async ({ id, formData }) => {
			const { data } = await axiosInstance.put(
				`/api/v1/documents/document/${id}`,
				formData
			)
			return data
		},
	})
}

// Delete a document
export function useDeleteDocument() {
	const queryClient = useQueryClient()

	return useMutation<void, Error, string>({
		mutationKey: ['delete document'],
		mutationFn: async id => {
			await axiosInstance.delete(`/api/v1/documents/document/${id}`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get documents'] })
		},
	})
}
