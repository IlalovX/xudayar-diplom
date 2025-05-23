import type { Metadata } from 'next'
import type React from 'react'
import '../styles/globals.scss'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: 'Document Management System – Graduation Project',
	description:
		'This web application was developed as part of a graduation project to automate the document workflow of the Department of Software Engineering and Mathematical Modeling at the Tashkent University of Information Technologies, Nukus Branch, Republic of Uzbekistan. Author: [Your Full Name].',
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
