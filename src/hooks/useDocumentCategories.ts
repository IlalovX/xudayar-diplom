// hooks/useDocumentCategories.ts
import { DocumentCategoryService } from '@/src/service/docs-category.service'
import type { DocumentCategory } from '@/src/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: DocumentCategoryService.getAll,
	})
}

export const useCreateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: Omit<DocumentCategory, 'id'>) =>
			DocumentCategoryService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		},
	})
}

export const useUpdateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number
			data: Partial<Omit<DocumentCategory, 'id'>>
		}) => DocumentCategoryService.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		},
	})
}

export const useDeleteCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => DocumentCategoryService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		},
	})
}
