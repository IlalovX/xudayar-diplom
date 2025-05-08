import {
	Box,
	CircularProgress,
	Container,
	Paper,
	Typography,
} from '@mui/material'

export default function EditTeacherLoading() {
	return (
		<Container maxWidth='xl'>
			<Box sx={{ p: 3 }}>
				<Paper sx={{ p: 3 }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column',
							py: 8,
						}}
					>
						<CircularProgress size={60} thickness={4} />
						<Typography variant='h6' sx={{ mt: 2 }}>
							Загрузка...
						</Typography>
					</Box>
				</Paper>
			</Box>
		</Container>
	)
}
