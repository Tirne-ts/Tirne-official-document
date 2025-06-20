'use client'

import React, { ReactNode } from 'react'
import slugify from 'slugify'

interface DocSectionProps {
  title: string
  children: ReactNode
}

export function DocSection({ title, children }: DocSectionProps) {
  const id = slugify(title, { lower: true, strict: true })

  return (
    <section id={id} className="mt-16 scroll-mt-24">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
