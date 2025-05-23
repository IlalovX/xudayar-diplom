'use client'

import React from 'react'

import { DocumentsService } from '@/src/service/documents.service'
import { NewsService } from '@/src/service/news.service'
import { TeacherService } from '@/src/service/teacher.service'
import type { News } from '@/src/types'
import {
	Article as ArticleIcon,
	Description as DescriptionIcon,
	People as PeopleIcon,
	School as SchoolIcon,
} from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
	const router = useRouter()
	const [newsCount, setNewsCount] = useState<number>(0)
	const [documentsCount, setDocumentsCount] = useState<number>(0)
	const [teachersCount, setTeachersCount] = useState<number>(0)
	const [recentNews, setRecentNews] = useState<News[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				const [newsData, documentsData, teachersData] = await Promise.all([
					NewsService.getAll({ limit: 5 }),
					DocumentsService.getAll({ limit: 1 }),
					TeacherService.getAll({ limit: 1 }),
				])

				setNewsCount(newsData.count || 0)
				setRecentNews(newsData.results || [])
				setDocumentsCount(documentsData.count || 0)
				setTeachersCount(teachersData.count || 0)
			} catch (error) {
				console.error('Error fetching dashboard data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchDashboardData()
	}, [])

	const handleNavigate = (path: string) => {
		router.push(path)
	}

	const statistics = {
		newsCount: newsCount,
		documentsCount: documentsCount,
		teachersCount: teachersCount,
		visitorsToday: 0,
		visitorsWeek: 0,
		visitorsMonth: 0,
	}

	return (
		<Container maxWidth='xl'>
			<Typography
				variant='h4'
				component='h1'
				gutterBottom
				sx={{ fontWeight: 700, color: 'primary.main', mb: 4 }}
			>
				Admin Panel
			</Typography>

			{/* Statistics Cards */}
			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid size={3}>
					<Paper
						elevation={2}
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 140,
							backgroundColor: '#bbdefb',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: -15,
								right: -15,
								backgroundColor: 'rgba(255, 255, 255, 0.3)',
								borderRadius: '50%',
								width: 100,
								height: 100,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<ArticleIcon sx={{ fontSize: 40, color: '#0D47A1' }} />
						</Box>
						<Typography variant='h6' component='h2' gutterBottom>
							News
						</Typography>
						<Typography
							variant='h3'
							component='p'
							sx={{ mt: 'auto', fontWeight: 700 }}
						>
							{statistics.newsCount}
						</Typography>
					</Paper>
				</Grid>
				<Grid size={3}>
					<Paper
						elevation={2}
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 140,
							backgroundColor: '#c8e6c9',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: -15,
								right: -15,
								backgroundColor: 'rgba(255, 255, 255, 0.3)',
								borderRadius: '50%',
								width: 100,
								height: 100,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<DescriptionIcon sx={{ fontSize: 40, color: '#2E7D32' }} />
						</Box>
						<Typography variant='h6' component='h2' gutterBottom>
							Documents
						</Typography>
						<Typography
							variant='h3'
							component='p'
							sx={{ mt: 'auto', fontWeight: 700 }}
						>
							{statistics.documentsCount}
						</Typography>
					</Paper>
				</Grid>
				<Grid size={3}>
					<Paper
						elevation={2}
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 140,
							backgroundColor: '#ffecb3',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: -15,
								right: -15,
								backgroundColor: 'rgba(255, 255, 255, 0.3)',
								borderRadius: '50%',
								width: 100,
								height: 100,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<PeopleIcon sx={{ fontSize: 40, color: '#FF8F00' }} />
						</Box>
						<Typography variant='h6' component='h2' gutterBottom>
							Teachers
						</Typography>
						<Typography
							variant='h3'
							component='p'
							sx={{ mt: 'auto', fontWeight: 700 }}
						>
							{statistics.teachersCount}
						</Typography>
					</Paper>
				</Grid>
				<Grid size={3}>
					<Paper
						elevation={2}
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 140,
							backgroundColor: '#e1bee7',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: -15,
								right: -15,
								backgroundColor: 'rgba(255, 255, 255, 0.3)',
								borderRadius: '50%',
								width: 100,
								height: 100,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<SchoolIcon sx={{ fontSize: 40, color: '#6A1B9A' }} />
						</Box>
						<Typography variant='h6' component='h2' gutterBottom>
							Visitors Today
						</Typography>
						<Typography
							variant='h3'
							component='p'
							sx={{ mt: 'auto', fontWeight: 700 }}
						>
							{statistics.visitorsToday}
						</Typography>
					</Paper>
				</Grid>
			</Grid>

			<Grid container spacing={3}>
				{/* Recent News */}
				<Grid size={6}>
					<Card elevation={2}>
						<CardHeader
							title='Recent News'
							action={
								<Button
									color='primary'
									onClick={() => handleNavigate('/admin/news')}
								>
									View All
								</Button>
							}
						/>
						<Divider />
						<CardContent sx={{ p: 0 }}>
							<List sx={{ width: '100%' }}>
								{recentNews.length > 0 ? (
									recentNews.map(news => (
										<React.Fragment key={news.id}>
											<ListItem alignItems='flex-start'>
												<ListItemAvatar>
													<Avatar
														variant='rounded'
														src={news.image || '/placeholder.svg'}
														alt={news.title}
														sx={{ width: 60, height: 60 }}
													/>
												</ListItemAvatar>
												<ListItemText
													primary={news.title}
													secondary={
														<>
															<Typography
																component='span'
																variant='body2'
																color='text.primary'
																sx={{
																	display: '-webkit-box',
																	WebkitLineClamp: 2,
																	WebkitBoxOrient: 'vertical',
																	overflow: 'hidden',
																	mb: 1,
																}}
															>
																{news.content.substring(0, 100)}
																{news.content.length > 100 ? '...' : ''}
															</Typography>
															<Typography
																component='span'
																variant='caption'
																color='text.secondary'
															>
																{new Date(news.createdAt).toLocaleDateString()}
															</Typography>
														</>
													}
												/>
											</ListItem>
											<Divider variant='inset' component='li' />
										</React.Fragment>
									))
								) : (
									<ListItem>
										<ListItemText primary='No news available' />
									</ListItem>
								)}
							</List>
						</CardContent>
					</Card>
				</Grid>

				{/* Quick Actions */}
				<Grid size={6}>
					<Card elevation={2} sx={{ mb: 3 }}>
						<CardHeader title='Quick Actions' />
						<Divider />
						<CardContent>
							<Grid container spacing={2}>
								<Grid size={3}>
									<Button
										variant='contained'
										fullWidth
										startIcon={<ArticleIcon />}
										onClick={() => handleNavigate('/admin/news/create')}
										sx={{ py: 1.5, height: 1 }}
									>
										Add News
									</Button>
								</Grid>
								<Grid size={3}>
									<Button
										variant='contained'
										fullWidth
										startIcon={<DescriptionIcon />}
										onClick={() => handleNavigate('/admin/documents/create')}
										sx={{ py: 1.5 }}
									>
										Add Document
									</Button>
								</Grid>
								<Grid size={3}>
									<Button
										variant='contained'
										fullWidth
										startIcon={<PeopleIcon />}
										onClick={() => handleNavigate('/admin/teachers/create')}
										sx={{ py: 1.5, height: 1 }}
									>
										Add Teacher
									</Button>
								</Grid>
								<Grid size={3}>
									<Button
										variant='contained'
										fullWidth
										startIcon={<SchoolIcon />}
										onClick={() => handleNavigate('/admin/education')}
										sx={{ py: 1.5 }}
									>
										Manage Education
									</Button>
								</Grid>
							</Grid>
						</CardContent>
					</Card>

					{/* Visitors Statistics */}
					<Card elevation={2}>
						<CardHeader title='Visitor Statistics' />
						<Divider />
						<CardContent>
							<Grid container spacing={2}>
								<Grid size={3}>
									<Box sx={{ textAlign: 'center' }}>
										<Typography
											variant='h4'
											component='p'
											sx={{ fontWeight: 700, color: 'primary.main' }}
										>
											{statistics.visitorsToday}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											Today
										</Typography>
									</Box>
								</Grid>
								<Grid size={3}>
									<Box sx={{ textAlign: 'center' }}>
										<Typography
											variant='h4'
											component='p'
											sx={{ fontWeight: 700, color: 'primary.main' }}
										>
											{statistics.visitorsWeek}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											This Week
										</Typography>
									</Box>
								</Grid>
								<Grid size={3}>
									<Box sx={{ textAlign: 'center' }}>
										<Typography
											variant='h4'
											component='p'
											sx={{ fontWeight: 700, color: 'primary.main' }}
										>
											{statistics.visitorsMonth}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											This Month
										</Typography>
									</Box>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	)
}
