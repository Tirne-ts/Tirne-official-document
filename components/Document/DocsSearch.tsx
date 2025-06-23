'use client'

import { useState } from 'react'
import Link from 'next/link'
import { docsPages } from '@/config/docs.config'

export function DocsSearch() {
  const [q, setQ] = useState('')

  const filtered = docsPages.filter(
    (p) => p.title.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="mb-6">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search docs..."
        className="w-full px-4 py-2 rounded-md border text-sm dark:bg-gray-900 dark:text-white"
      />
      {q && (
        <ul className="mt-4 space-y-2 text-sm">
          {filtered.map((p) => (
            <li key={p.slug}>
              <Link href={`/docs/${p.slug}`} className="text-indigo-600 hover:underline">
                {p.title}
              </Link>
              <p className="text-gray-500 text-xs">{p.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
