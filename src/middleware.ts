import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { type NextRequest, NextResponse } from 'next/server'

const locales = ['uz', 'ru', 'en']
export const defaultLocale = 'en'

// Get the preferred locale from request headers
function getLocale(request: NextRequest): string {
	const negotiatorHeaders: Record<string, string> = {}
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

	const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
	return matchLocale(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	// Skip middleware for static assets and API routes
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api/') ||
		pathname.includes('.')
	) {
		return NextResponse.next()
	}

	// Check if pathname has a locale
	const pathnameHasLocale = locales.some(
		locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	)

	// Skip middleware for auth and admin routes
	if (
		pathname.startsWith('/auth') ||
		pathname.startsWith('/admin') ||
		pathname.startsWith('/profile')
	) {
		return NextResponse.next()
	}

	// Redirect if there is no locale
	if (!pathnameHasLocale) {
		const locale = getLocale(request)

		// e.g. incoming request is /products
		// The new URL is now /en/products
		return NextResponse.redirect(
			new URL(
				`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
				request.url
			)
		)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
