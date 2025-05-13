'use client'

import type React from 'react'

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
		// Check authentication status on client side
		const checkAuth = () => {
			const isAuth = AuthTokenService.isAuthenticated()
			const role = AuthTokenService.getUserRole()
			setIsAuthenticated(isAuth)
			setUserRole(role)
		}

		checkAuth()

		// Extract language from URL if it exists
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

		// Update URL with new language
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
			sx={{
				backgroundColor: transparent ? 'transparent' : '#0D47A1',
			}}
		>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					{/* Logo for desktop */}
					<Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
						<Link href={`/${language}`}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Image
									src='/logo.svg'
									alt='Министерство Высшего Образования'
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
									ДИ кафедра
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
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link href={`/${language}`}>
									<Typography textAlign='center'>Главная</Typography>
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Link href={`/${language}/news`}>
									<Typography textAlign='center'>Новости</Typography>
								</Link>
							</MenuItem>

							<MenuItem onClick={handleCloseNavMenu}>
								<Link href={`/${language}/about`}>
									<Typography textAlign='center'>О нас</Typography>
								</Link>
							</MenuItem>
						</Menu>
					</Box>

					{/* Logo for mobile */}
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
									alt='Министерство Высшего Образования'
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
									ДИ кафедра
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
							Главная
						</Button>
						<Button
							component={Link}
							href={`/${language}/news`}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							Новости
						</Button>
						<Button
							component={Link}
							href={`/${language}/about`}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							О нас
						</Button>
					</Box>

					{/* Language selector and login button */}
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						{/* <FormControl variant='standard' sx={{ m: 1, minWidth: 80 }}>
							<Select
								value={language}
								onChange={handleLanguageChange}
								sx={{
									color: 'white',
									'& .MuiSelect-icon': { color: 'white' },
									'&:before': { borderColor: 'white' },
									'&:after': { borderColor: 'white' },
								}}
								IconComponent={Language}
							>
								<MenuItem value='uz'>UZ</MenuItem>
								<MenuItem value='ru'>RU</MenuItem>
								<MenuItem value='en'>EN</MenuItem>
							</Select>
						</FormControl> */}

						{isAuthenticated ? (
							<Button
								color='inherit'
								onClick={handleProfile}
								startIcon={<Person />}
							>
								{userRole === 'admin' ? 'Админ' : 'Профиль'}
							</Button>
						) : (
							<Button color='inherit' onClick={handleLogin}>
								Войти
							</Button>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header
