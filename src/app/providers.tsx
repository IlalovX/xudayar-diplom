'use client'

import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type PropsWithChildren, useState } from 'react'
import { Toaster } from 'sonner'

export function Providers({ children }: PropsWithChildren) {
	const theme = createTheme({
		typography: {
			fontFamily: 'Inter, sans-serif',
		},
		palette: {
			primary: {
				main: '#0D47A1', // Deep blue for Uzbekistan government sites
				light: '#3F72AF',
				dark: '#002171',
				contrastText: '#FFFFFF',
			},
			secondary: {
				main: '#4CAF50', // Green from Uzbekistan flag
				light: '#80E27E',
				dark: '#087F23',
				contrastText: '#FFFFFF',
			},
		},
	})

	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					staleTime: 5 * 60 * 1000, // 5 minutes
				},
			},
		})
	)

	return (
		<QueryClientProvider client={client}>
			<ThemeProvider theme={theme}>
				<Toaster position='top-right' richColors />
				{children}
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
