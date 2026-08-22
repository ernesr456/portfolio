import { NextResponse } from 'next/server'

const PROJECT_URLS = {
  xgame: 'https://xgame.live/',
  multipayx: 'https://multipayx.net/',
  nipt: 'https://www.hiro-clinic.or.jp/',
} as const

async function isWebsiteOnline(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (compatible; PortfolioStatusCheck/1.0)',
      },
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })

    return response.status < 500
  } catch {
    return false
  }
}

export async function GET() {
  const statusEntries = await Promise.all(
    Object.entries(PROJECT_URLS).map(async ([id, url]) => [
      id,
      (await isWebsiteOnline(url)) ? 'online' : 'offline',
    ]),
  )

  return NextResponse.json(
    { statuses: Object.fromEntries(statusEntries) },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  )
}
