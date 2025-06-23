'use client'

import React, { ReactNode } from 'react'
import slugify from 'slugify'

interface DocSectionProps {
  title: string
  children: ReactNode
    subtitle?: string

}

export function DocSection({ title, children, subtitle }: DocSectionProps) {
  const id = slugify(title, { lower: true, strict: true })

  return (
    <section id={id} className="mt-16 scroll-mt-24">
      <h2 className="text-2xl font-extrabold mb-4 text-gray-900 dark:text-white text-center">
        {title}
      </h2>
          {subtitle && <p className="text-lg text-gray-500 mb-4 text-center">{subtitle}</p>}
      <div>{children}</div>

  </section>
  )
}
