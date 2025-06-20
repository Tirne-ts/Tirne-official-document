'use client'

import { ReactNode } from 'react'

export function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-4 border-indigo-500 pl-4 text-gray-700 dark:text-gray-300 italic">
      {children}
    </blockquote>
  )
}
