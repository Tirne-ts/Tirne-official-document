// components/ui/Hero.tsx
'use client'

import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"

export type HeroProps = {
  title: string
  subtitle: string
  buttons: {
    label: string
    href: string
  }[]
  starCount?: number
}

export function Hero({ title, subtitle, buttons, starCount }: HeroProps) {
  return (
    <section className="text-center py-8 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{title}</h1>
        <p className="text-muted-foreground text-lg mb-16">{subtitle}</p>
        <div className="flex justify-center gap-12 flex-wrap">
          {buttons.map((btn, idx) => (
            <Button key={idx} asChild>
              <a href={btn.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                {btn.label === 'Star on GitHub' && starCount != null ? (
                  <>
                    <FaGithub className="w-4 h-4" />
                    ⭐ {btn.label} ({starCount})
                  </>
                ) : (
                  btn.label
                )}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}