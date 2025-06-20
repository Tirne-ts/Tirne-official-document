'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsPages } from '@/config/docs.config'

export function NextPrevNav() {
  const path = usePathname()
  const slug = path?.split('/').pop()
  const idx = docsPages.findIndex((p) => p.slug === slug)
  const prev = docsPages[idx - 1]
  const next = docsPages[idx + 1]

  return (
    <div className="mt-12 flex justify-between text-sm text-indigo-600 dark:text-indigo-400">
      {prev ? (
        <Link href={`/docs/${prev.slug}`} className="hover:underline">
          ← {prev.title}
        </Link>
      ) : <div />}
      {next ? (
        <Link href={`/docs/${next.slug}`} className="hover:underline">
          {next.title} →
        </Link>
      ) : <div />}
    </div>
  )
}
