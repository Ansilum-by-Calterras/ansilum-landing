import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, localeCookie } from './i18n/config'
/** Sends unprefixed URLs to a locale: the visitor's explicit choice, otherwise Indonesian. */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const first = pathname.split('/')[1]
  if (isLocale(first)) return NextResponse.next()
  const saved = request.cookies.get(localeCookie)?.value
  const locale = isLocale(saved) ? saved : defaultLocale
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  url.search = search
  return NextResponse.redirect(url, 307)
}
export const config = {
  matcher: [
    '/((?!api|studio|_next|icon|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
}
