'use client'

import { AuthService } from '@/src/service/auth.service'
import {
	Article as ArticleIcon,
	CalendarMonth as CalendarIcon,
	Category as CategoryIcon,
	Dashboard as DashboardIcon,
	Description as DescriptionIcon,
	ExpandLess,
	ExpandMore,
	Logout as LogoutIcon,
	People as PeopleIcon,
	School as SchoolIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material'
import {
	Box,
	Collapse,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const drawerWidth = 260

export default function AdminSidebar() {
	const pathname = usePathname()
	const router = useRouter()
	const [openDocuments, setOpenDocuments] = useState(
		pathname?.includes('/admin/documents')
	)

	const handleDocumentsClick = () => {
		setOpenDocuments(!openDocuments)
	}

	const handleNavigation = (path: string) => {
		router.push(path)
	}

	const handleLogout = async () => {
		await AuthService.logout()
		router.push('/')
	}

	return (
		<Drawer
			variant='permanent'
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
					backgroundColor: '#0D47A1',
					color: 'white',
				},
			}}
		>
			<Box
				sx={{
					p: 2,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Image src='/logo.svg' alt='Логотип' width={40} height={40} />
				<Typography variant='h6' sx={{ ml: 1, fontWeight: 700 }}>
					Админ панель
				</Typography>
			</Box>
			<Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
			<List component='nav' sx={{ p: 1 }}>
				<ListItem disablePadding>
					<ListItemButton
						selected={pathname === '/admin'}
						onClick={() => handleNavigation('/admin')}
						sx={{
							borderRadius: 1,
							mb: 0.5,
							'&.Mui-selected': {
								backgroundColor: 'rgba(255, 255, 255, 0.2)',
								'&:hover': {
									backgroundColor: 'rgba(255, 255, 255, 0.3)',
								},
							},
							'&:hover': {
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
							},
						}}
					>
						<ListItemIcon sx={{ color: 'white' }}>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary='Панель управления' />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton
						selected={pathname === '/admin/news'}
						onClick={() => handleNavigation('/admin/news')}
						sx={{
							borderRadius: 1,
							mb: 0.5,
							'&.Mui-selected': {
								backgroundColor: 'rgba(255, 255, 255, 0.2)',
								'&:hover': {
									backgroundColor: 'rgba(255, 255, 255, 0.3)',
								},
							},
							'&:hover': {
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
							},
						}}
					>
						<ListItemIcon sx={{ color: 'white' }}>
							<ArticleIcon />
						</ListItemIcon>
						<ListItemText primary='Новости' />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton
						onClick={handleDocumentsClick}
						sx={{
							borderRadius: 1,
							mb: 0.5,
							'&:hover': {
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
							},
						}}
					>
						<ListItemIcon sx={{ color: 'white' }}>
							<DescriptionIcon />
						</ListItemIcon>
						<ListItemText primary='Документы' />
						{openDocuments ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
				</ListItem>
				<Collapse in={openDocuments} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						<ListItem disablePadding>
							<ListItemButton
								selected={pathname === '/admin/documents'}
								onClick={() => handleNavigation('/admin/documents')}
								sx={{
									pl: 4,
									borderRadius: 1,
									mb: 0.5,
									'&.Mui-selected': {
										backgroundColor: 'rgba(255, 255, 255, 0.2)',
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.3)',
										},
									},
									'&:hover': {
										backgroundColor: 'rgba(255, 255, 255, 0.1)',
									},
								}}
							>
								<ListItemIcon sx={{ color: 'white' }}>
									<DescriptionIcon />
								</ListItemIcon>
								<ListItemText primary='Все документы' />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton
								selected={pathname === '/admin/documents/categories'}
								onClick={() => handleNavigation('/admin/documents/categories')}
								sx={{
									pl: 4,
									borderRadius: 1,
									mb: 0.5,
									'&.Mui-selected': {
										backgroundColor: 'rgba(255, 255, 255, 0.2)',
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.3)',
										},
									},
									'&:hover': {
										backgroundColor: 'rgba(255, 255, 255, 0.1)',
									},
								}}
							>
								<ListItemIcon sx={{ color: 'white' }}>
									<CategoryIcon />
								</ListItemIcon>
								<ListItemText primary='Категории' />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton
								selected={pathname === '/admin/documents/years'}
								onClick={() => handleNavigation('/admin/documents/years')}
								sx={{
									pl: 4,
									borderRadius: 1,
									mb: 0.5,
									'&.Mui-selected': {
										backgroundColor: 'rgba(255, 255, 255, 0.2)',
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.3)',
										},
									},
									'&:hover': {
										backgroundColor: 'rgba(255, 255, 255, 0.1)',
									},
								}}
							>
								<ListItemIcon sx={{ color: 'white' }}>
									<CalendarIcon />
								</ListItemIcon>
								<ListItemText primary='Учебные годы' />
							</ListItemButton>
						</ListItem>
					</List>
				</Collapse>

				<ListItem disablePadding>
					<ListItemButton
						selected={pathname === '/admin/teachers'}
						onClick={() => handleNavigation('/admin/teachers')}
						sx={{
							borderRadius: 1,
							mb: 0.5,
							'&.Mui-selected': {
								backgroundColor: 'rgba(255, 255, 255, 0.2)',
								'&:hover': {
									backgroundColor: 'rgba(255, 255, 255, 0.3)',
								},
							},
							'&:hover': {
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
							},
						}}
					>
						<ListItemIcon sx={{ color: 'white' }}>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText primary='Преподаватели' />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton
						selected={pathname === '/admin/education'}
						onClick={() => handleNavigation('/admin/education')}
						sx={{
							borderRadius: 1,
							mb: 0.5,
							'&.Mui-selected': {
								backgroundColor: 'rgba(255, 255, 255, 0.2)',
								'&:hover': {
									backgroundColor: 'rgba(255, 255, 255, 0.3)',
								},
							},
							'&:hover': {
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
							},
						}}
					>
						<ListItemIcon sx={{ color: 'white' }}>
							<SchoolIcon />
						</ListItemIcon>
						<ListItemText primary='Образование' />
					</ListItemButton>
				</ListItem>

				<Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

				<ListItem disablePadding>
					<ListItemButton
						selected={pathname === '/admin/settings'}
						onClick={() => handleNavigation('/admin/settings')}
						sx={{
							borderRadius: 1,
							mb: 0.5,
							'&.Mui-selected': {
								backgroundColor: 'rgba(255, 255, 255, 0.2)',
								'&:hover': {
									backgroundColor: 'rgba(255, 255, 255, 0.3)',
								},
							},
							'&:hover': {
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
							},
						}}
					>
						<ListItemIcon sx={{ color: 'white' }}>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary='Настройки' />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton
						onClick={handleLogout}
						sx={{
							borderRadius: 1,
							mb: 0.5,
							'&:hover': {
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
							},
						}}
					>
						<ListItemIcon sx={{ color: 'white' }}>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary='Выйти' />
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	)
}
