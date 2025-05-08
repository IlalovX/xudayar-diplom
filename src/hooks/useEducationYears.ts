// hooks/useEducationYears.ts
import { EducationYearService } from '@/src/service/edu-years.service'
import type { EducationYear } from '@/src/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetYears = () => {
	return useQuery({
		queryKey: ['years'],
		queryFn: EducationYearService.getAll,
	})
}

export const useCreateYear = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: Omit<EducationYear, 'id'>) =>
			EducationYearService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['years'] })
		},
	})
}

export const useUpdateYear = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: number
			data: Partial<Omit<EducationYear, 'id'>>
		}) => EducationYearService.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['years'] })
		},
	})
}

export const useDeleteYear = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => EducationYearService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['years'] })
		},
	})
}
