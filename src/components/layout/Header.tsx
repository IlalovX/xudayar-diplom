'use client'

import { AuthTokenService } from '@/src/service/auth-token.service'
import { Menu as MenuIcon, Person } from '@mui/icons-material'
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	type SelectChangeEvent,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'

interface HeaderProps {
	transparent?: boolean
}

const Header = ({ transparent = false }: HeaderProps) => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [language, setLanguage] = useState<string>('uz')
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const [userRole, setUserRole] = useState<'admin' | 'teacher' | null>(null)
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		const checkAuth = () => {
			const isAuth = AuthTokenService.isAuthenticated()
			const role = AuthTokenService.getUserRole()
			setIsAuthenticated(isAuth)
			setUserRole(role)
		}
		checkAuth()

		const pathParts = pathname?.split('/') || []
		if (pathParts[1] && ['uz', 'ru', 'en'].includes(pathParts[1])) {
			setLanguage(pathParts[1])
		}
	}, [pathname])

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleLanguageChange = (event: SelectChangeEvent) => {
		const newLang = event.target.value
		setLanguage(newLang)

		if (pathname) {
			const pathParts = pathname.split('/')
			if (['uz', 'ru', 'en'].includes(pathParts[1])) {
				pathParts[1] = newLang
				router.push(pathParts.join('/'))
			} else {
				router.push(`/${newLang}${pathname}`)
			}
		}
	}

	const handleLogin = () => {
		router.push('/auth')
	}

	const handleProfile = () => {
		if (userRole === 'admin') {
			router.push('/admin')
		} else {
			router.push('/profile')
		}
	}

	return (
		<AppBar
			position='static'
			color={transparent ? 'transparent' : 'primary'}
			elevation={transparent ? 0 : 4}
			sx={{ backgroundColor: transparent ? 'transparent' : '#0D47A1' }}
		>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					{/* Logo desktop */}
					<Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
						<Link href={`/${language}`}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Image
									src='/logo.svg'
									alt='Ministry of Higher Education'
									width={80}
									height={80}
								/>
								<Typography
									variant='h6'
									noWrap
									sx={{
										ml: 1,
										fontWeight: 700,
										color: 'white',
										textDecoration: 'none',
									}}
								>
									SE Department
								</Typography>
							</Box>
						</Link>
					</Box>

					{/* Mobile menu */}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: 'block', md: 'none' } }}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link href={`/${language}`}>
									<Typography textAlign='center'>Home</Typography>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link href={`/${language}/news`}>
									<Typography textAlign='center'>News</Typography>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link href={`/${language}/about`}>
									<Typography textAlign='center'>About us</Typography>
								</Link>
							</MenuItem>
						</Menu>
					</Box>

					{/* Logo mobile */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
							alignItems: 'center',
						}}
					>
						<Link href={`/${language}`}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Image
									src='/logo.svg'
									alt='Ministry of Higher Education'
									width={30}
									height={30}
								/>
								<Typography
									variant='subtitle1'
									noWrap
									sx={{
										ml: 1,
										fontWeight: 700,
										color: 'white',
										textDecoration: 'none',
									}}
								>
									SE Department
								</Typography>
							</Box>
						</Link>
					</Box>

					{/* Desktop menu */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							justifyContent: 'center',
						}}
					>
						<Button
							component={Link}
							href={`/${language}`}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							Home
						</Button>
						<Button
							component={Link}
							href={`/${language}/news`}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							News
						</Button>
						<Button
							component={Link}
							href={`/${language}/about`}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							About us
						</Button>
					</Box>

					{/* Profile / Login */}
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						{isAuthenticated ? (
							<Button
								color='inherit'
								onClick={handleProfile}
								startIcon={<Person />}
							>
								{userRole === 'admin' ? 'Admin' : 'Profile'}
							</Button>
						) : (
							<Button color='inherit' onClick={handleLogin}>
								Login
							</Button>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header
