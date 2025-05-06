'use client'

import type React from 'react'

import { AuthTokenService } from '@/src/service/auth-token.service'
import { AuthService } from '@/src/service/auth.service'
import type { User } from '@/src/types'
import { Notifications as NotificationsIcon } from '@mui/icons-material'
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminHeader() {
	const router = useRouter()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const userData = AuthTokenService.getUser()
		if (userData) {
			setUser(userData)
		}
	}, [])

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleProfile = () => {
		handleClose()
		router.push('/admin/profile')
	}

	const handleLogout = async () => {
		handleClose()
		await AuthService.logout()
		router.push('/')
	}

	return (
		<AppBar
			position='sticky'
			sx={{
				backgroundColor: 'white',
				color: 'text.primary',
				boxShadow: 1,
			}}
		>
			<Toolbar>
				<Typography
					variant='h6'
					component='div'
					sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 600 }}
				>
					Панель администратора
				</Typography>

				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton color='inherit' sx={{ mr: 2 }}>
						<Badge badgeContent={4} color='error'>
							<NotificationsIcon />
						</Badge>
					</IconButton>

					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant='body2' sx={{ mr: 1 }}>
							{user?.fullName || 'Администратор'}
						</Typography>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							color='inherit'
						>
							<Avatar
								src={user?.avatar || undefined}
								alt={user?.fullName || 'Администратор'}
								sx={{ width: 32, height: 32 }}
							/>
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleProfile}>Профиль</MenuItem>
							<MenuItem onClick={handleLogout}>Выйти</MenuItem>
						</Menu>
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	)
}
