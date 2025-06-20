'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Introduction', href: '/docs/introduction' },
  { label: 'Getting Started', href: '/docs/getting-started' },
  { label: 'Middleware', href: '/docs/middleware' },
  { label: 'Error Handling', href: '/docs/error-handling' },
]

export function DocNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`block px-2 py-1 rounded text-sm font-medium transition ${
            pathname === link.href
              ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
