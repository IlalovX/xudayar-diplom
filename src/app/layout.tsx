import type { Metadata } from 'next'
import type React from 'react'
import '../styles/globals.scss'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: 'Министерство Высшего Образования - Республика Узбекистан',
	description:
		'Официальный сайт Министерства Высшего Образования Республики Узбекистан',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='uz'>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
