// components/ui/CTA.tsx
import { Button } from "@/components/ui/button"

export type CTAProps = {
  title: string
  subtitle: string
  buttons: {
    label: string
    href: string
  }[]
}

export function CTA({ title, subtitle, buttons }: CTAProps) {
  return (
    <section className="py-24 text-center bg-background">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold sm:text-4xl mb-4">{title}</h2>
        <p className="text-muted-foreground text-lg mb-8">{subtitle}</p>
        <div className="flex justify-center flex-wrap gap-4">
          {buttons.map((btn, idx) => (
            <Button key={idx} asChild>
              <a href={btn.href} target="_blank" rel="noopener noreferrer">
                {btn.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
