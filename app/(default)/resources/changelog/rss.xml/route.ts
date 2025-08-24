// app/(default)/resources/changelog/rss.xml/route.ts
// Reuse the same handler as /api/rss so this path returns identical XML (200 OK)
import { GET as rss } from '@/app/api/rss/route'

// Match /api/rss cache behavior if you set it there
export const revalidate = 600

export async function GET() {
  return rss()
}
