'use client'

import { useEffect, useState } from 'react'

export function TOC() {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('h2')).map((el) => ({
      id: el.id,
      text: el.textContent || '',
    }))
    setHeadings(els)
  }, [])

  return (
    <nav className="hidden lg:block fixed right-8 top-32 w-64 text-sm space-y-2">
      <h3 className="text-gray-500 uppercase text-xs mb-2">On this page</h3>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-gray-700 hover:text-indigo-600 dark:text-gray-300">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
