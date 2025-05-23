'use client'

import { AuthTokenService } from '@/src/service/auth-token.service'
import { AuthService } from '@/src/service/auth.service'
import { NavigateNext } from '@mui/icons-material'
import {
	Alert,
	Avatar,
	Box,
	Breadcrumbs,
	Button,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type User = {
	id: string
	full_name: string
	logo_teacher: string
	phone_number: string
	position_id: number
	role: string
	username: string
}

export default function ProfilePage() {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const checkAuth = async () => {
			const isAuthenticated = AuthTokenService.isAuthenticated()

			if (!isAuthenticated) {
				router.push('/auth')
				return
			}

			const userRole = AuthTokenService.getUserRole()

			if (userRole === 'admin') {
				router.push('/admin')
				return
			}

			try {
				const userData = await AuthService.getCurrentUser()
				setUser(userData)
			} catch (err) {
				setError('Failed to load user data')
			} finally {
				setIsLoading(false)
			}
		}

		checkAuth()
	}, [router])

	const handleLogout = async () => {
		await AuthService.logout()
		router.push('/')
	}

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

	if (error) {
		return (
			<Container maxWidth='md' sx={{ py: 4 }}>
				<Alert severity='error'>{error}</Alert>
				<Button variant='contained' onClick={handleLogout} sx={{ mt: 2 }}>
					Log out
				</Button>
			</Container>
		)
	}

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Typography
				variant='h4'
				component='h1'
				gutterBottom
				sx={{ color: 'primary.main', fontWeight: 700 }}
			>
				Teacher's Profile
			</Typography>
			<Breadcrumbs separator={<NavigateNext fontSize='small' />} sx={{ mb: 1 }}>
				<Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
					Home
				</Link>
				<Typography color='text.primary'>Profile</Typography>
			</Breadcrumbs>

			<Grid container spacing={4}>
				<Grid size={4}>
					<Paper elevation={2} sx={{ p: 3 }}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar
								src={user?.logo_teacher || '/default-avatar.png'}
								alt={user?.full_name || 'User'}
								sx={{ width: 120, height: 120, mb: 2 }}
							/>
							<Typography variant='h5' component='h2' gutterBottom>
								{user?.full_name || 'Name not specified'}
							</Typography>
							<Typography variant='body1' color='text.secondary' gutterBottom>
								Teacher
							</Typography>
							<Button
								variant='outlined'
								fullWidth
								sx={{ mt: 2 }}
								onClick={() => router.push('/profile/edit')}
							>
								Edit profile
							</Button>
							<Button
								variant='contained'
								color='error'
								fullWidth
								sx={{ mt: 2 }}
								onClick={handleLogout}
							>
								Log out
							</Button>
						</Box>
					</Paper>
				</Grid>

				<Grid size={10}>
					<Paper elevation={2} sx={{ p: 3 }}>
						<Typography variant='h6' component='h3' gutterBottom>
							User Information
						</Typography>
						<Divider sx={{ mb: 2 }} />

						<Grid container spacing={2}>
							<Grid size={6}>
								<Typography variant='body2' color='text.secondary'>
									Username:
								</Typography>
							</Grid>
							<Grid size={6}>
								<Typography variant='body1'>
									{user?.username || 'Not specified'}
								</Typography>
							</Grid>

							<Grid size={6}>
								<Typography variant='body2' color='text.secondary'>
									Phone number:
								</Typography>
							</Grid>
							<Grid size={6}>
								<Typography variant='body1'>
									{user?.phone_number || 'Not specified'}
								</Typography>
							</Grid>

							<Grid size={6}>
								<Typography variant='body2' color='text.secondary'>
									Role:
								</Typography>
							</Grid>
							<Grid size={6}>
								<Typography variant='body1'>
									{user?.role === 'teacher' ? 'Teacher' : 'User'}
								</Typography>
							</Grid>
						</Grid>
					</Paper>

					<Paper elevation={2} sx={{ p: 3, mt: 3 }}>
						<Typography variant='h6' component='h3' gutterBottom>
							My Documents
						</Typography>
						<Divider sx={{ mb: 2 }} />

						<Button
							variant='contained'
							onClick={() => router.push('/profile/docs')}
							sx={{ mb: 2 }}
						>
							Manage Documents
						</Button>

						<Typography variant='body2' color='text.secondary'>
							In this section, you can manage your documents, upload new ones,
							and edit existing ones.
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}
