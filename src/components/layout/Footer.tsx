import {
	Box,
	Container,
	Divider,
	Grid,
	Link as MuiLink,
	Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

interface FooterProps {
	lang: string
}

const Footer = ({ lang }: FooterProps) => {
	const currentYear = new Date().getFullYear()

	return (
		<Box component='footer' sx={{ bgcolor: '#0D47A1', color: 'white', py: 6 }}>
			<Container maxWidth='lg'>
				<Grid container spacing={4}>
					<Grid size={4}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<Image
								src='/logo.svg'
								alt='SE Department'
								width={40}
								height={40}
							/>
							<Typography variant='h6' sx={{ ml: 1, fontWeight: 700 }}>
							SE Department
							</Typography>
						</Box>
						<Typography variant='body2' sx={{ mb: 2 }}>
							Official website of the SE Department
						</Typography>
						<Typography variant='body2'>Address: Nukus city</Typography>
						<Typography variant='body2'>Phone: +998 71 123-45-67</Typography>
						<Typography variant='body2'>Email: nukusstu@edu.uz</Typography>
					</Grid>

					<Grid size={4}>
						<Typography variant='h6' sx={{ mb: 2, fontWeight: 700 }}>
							Useful Links
						</Typography>
						<MuiLink
							component={Link}
							href={`/${lang}/documents`}
							color='inherit'
							underline='hover'
							sx={{ display: 'block', mb: 1 }}
						>
							Documents
						</MuiLink>
						<MuiLink
							component={Link}
							href={`/${lang}/news`}
							color='inherit'
							underline='hover'
							sx={{ display: 'block', mb: 1 }}
						>
							News
						</MuiLink>
						<MuiLink
							component={Link}
							href={`/${lang}/teachers`}
							color='inherit'
							underline='hover'
							sx={{ display: 'block', mb: 1 }}
						>
							Teachers
						</MuiLink>
						<MuiLink
							component={Link}
							href={`/${lang}/about`}
							color='inherit'
							underline='hover'
							sx={{ display: 'block', mb: 1 }}
						>
							About Us
						</MuiLink>
					</Grid>

					<Grid size={4}>
						<Typography variant='h6' sx={{ mb: 2, fontWeight: 700 }}>
							Government Resources
						</Typography>
						<MuiLink
							href='https://president.uz'
							target='_blank'
							rel='noopener noreferrer'
							color='inherit'
							underline='hover'
							sx={{ display: 'block', mb: 1 }}
						>
							President of the Republic of Uzbekistan
						</MuiLink>
						<MuiLink
							href='https://gov.uz'
							target='_blank'
							rel='noopener noreferrer'
							color='inherit'
							underline='hover'
							sx={{ display: 'block', mb: 1 }}
						>
							Government Portal
						</MuiLink>
						<MuiLink
							href='https://my.gov.uz'
							target='_blank'
							rel='noopener noreferrer'
							color='inherit'
							underline='hover'
							sx={{ display: 'block', mb: 1 }}
						>
							Unified Portal of Interactive Public Services
						</MuiLink>
						<MuiLink
							href='https://data.gov.uz'
							target='_blank'
							rel='noopener noreferrer'
							color='inherit'
							underline='hover'
							sx={{ display: 'block', mb: 1 }}
						>
							Open Data Portal
						</MuiLink>
					</Grid>
				</Grid>

				<Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'row' },
						justifyContent: 'space-between',
						alignItems: { xs: 'center', sm: 'flex-start' },
					}}
				>
					<Typography variant='body2' sx={{ mb: { xs: 2, sm: 0 } }}>
						© {currentYear} Ministry of Higher Education of the Republic of
						Uzbekistan. All rights reserved.
					</Typography>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<MuiLink href='/privacy-policy' color='inherit' underline='hover'>
							Privacy Policy
						</MuiLink>
						<MuiLink href='/terms-of-use' color='inherit' underline='hover'>
							Terms of Use
						</MuiLink>
					</Box>
				</Box>
			</Container>
		</Box>
	)
}

export default Footer
