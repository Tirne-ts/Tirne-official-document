'use client'

import React from 'react'
import { DocNav } from "./DocNav"

export function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-64 w-full border-b md:border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-100">📘 Documentation</h2>
        <DocNav />
      </aside>

      <main className="flex-1 px-6 py-10 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
          {children}
        </div>
      </main>
    </div>
  )
}
