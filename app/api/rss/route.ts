// app/api/rss/route.ts
import { NextResponse } from 'next/server'
import { allReleases, BASE_URL } from '@/lib/changelog'

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function GET() {
  const items = allReleases()
    .map((r) => {
      const link = `${BASE_URL}/resources/changelog/${r.id}`
      const pubDate = new Date(r.date).toUTCString()
      return `
<item>
  <title>${esc(`${r.version} — ${r.summary}`)}</title>
  <link>${link}</link>
  <guid isPermaLink="true">${link}</guid>
  <pubDate>${pubDate}</pubDate>
  <description>${esc(r.summary)}</description>
</item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Build AI Startups — Changelog</title>
    <link>${BASE_URL}/resources/changelog</link>
    <description>Release notes for HyperNova and Build AI Startups</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=600, stale-while-revalidate=86400',
    },
  })
}
