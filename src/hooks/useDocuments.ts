import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../api/interceptors'

// Fetch all documents
export function fetchDocuments() {
	return useQuery<Document[]>({
		queryKey: ['get documents'],
		queryFn: async () => {
			const { data } = await axiosInstance.get('/api/v1/documents/document/')
			return data
		},
	})
}

// Fetch document by ID
export function fetchDocumentById(id: string) {
	return useQuery<Document>({
		queryKey: ['get document', id],
		queryFn: async () => {
			const { data } = await axiosInstance.get(`/api/v1/documents/document/${id}`)
			return data
		},
	})
}

// Create a new document
export function useCreateDocument() {
	return useMutation<Document, Error, FormData>({
		mutationKey: ['create document'],
		mutationFn: async formData => {
			const { data } = await axiosInstance.post('/api/v1/documents/document/', formData)
			return data
		},
	})
}

// Update an existing document
export function useUpdateDocument() {
	return useMutation<Document, Error, { id: string; formData: FormData }>({
		mutationKey: ['update document'],
		mutationFn: async ({ id, formData }) => {
			const { data } = await axiosInstance.put(`/api/v1/documents/document/${id}`, formData)
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
