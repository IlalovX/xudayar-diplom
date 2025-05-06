import LanguageWrapper from '@/src/components/ui/LanguageWrapper'
import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
	title: 'Министерство Высшего Образования - Республика Узбекистан',
	description:
		'Официальный сайт Министерства Высшего Образования Республики Узбекистан',
}

export default function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { lang: string }
}) {
	return <LanguageWrapper params={params}>{children}</LanguageWrapper>
}
