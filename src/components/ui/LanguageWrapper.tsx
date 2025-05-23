'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useEffect, useState } from 'react'
import Footer from '../layout/Footer'
import Header from '../layout/Header'

interface LanguageWrapperProps {
	children: ReactNode
	params: {
		lang: string
	}
}

const LanguageWrapper = ({ children, params }: LanguageWrapperProps) => {
	const { lang } = params
	const pathname = usePathname()
	const router = useRouter()
	const [isHomePage, setIsHomePage] = useState(false)

	useEffect(() => {
		// Check if current page is home page
		setIsHomePage(pathname === `/${lang}` || pathname === '/')
	}, [pathname, lang])

	// Validate language
	useEffect(() => {
		const validLanguages = ['uz', 'ru', 'en']
		if (!validLanguages.includes(lang)) {
			router.push('/en')
		}
	}, [lang, router])

	return (
		<>
			<Header transparent={isHomePage} />
			<main>{children}</main>
			<Footer lang={lang} />
		</>
	)
}

export default LanguageWrapper
