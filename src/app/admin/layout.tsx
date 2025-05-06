'use client'

import type React from 'react'

import AdminHeader from '@/src/components/admin/AdminHeader'
import AdminSidebar from '@/src/components/admin/AdminSidebar'
import { AuthTokenService } from '@/src/service/auth-token.service'
import { Box, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const checkAuth = () => {
			const isAuthenticated = AuthTokenService.isAuthenticated()
			const userRole = AuthTokenService.getUserRole()

			if (!isAuthenticated) {
				router.push('/auth')
				return
			}

			if (userRole !== 'admin') {
				router.push('/')
				return
			}

			setIsLoading(false)
		}

		checkAuth()
	}, [router])

	if (isLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<AdminSidebar />
			<Box sx={{ flexGrow: 1, overflow: 'auto' }}>
				<AdminHeader />
				<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
					{children}
				</Box>
			</Box>
		</Box>
	)
}
