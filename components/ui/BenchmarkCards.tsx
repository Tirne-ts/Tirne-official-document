"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import CountUp from "react-countup"

export type BenchmarkCardsProps = {
  title: string
  description?: string
  stats: {
    label: string
    value: string
    description?: string
    emoji?: string
    highlight?: boolean
    unit?: string
  }[]
}

export function BenchmarkCards({ title, stats }: BenchmarkCardsProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-4">
          {title}
        </h2>
<p className="mt-4 text-lg text-gray-800 text-center mb-12 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 hover:text-indigo-600">
          Tirne is best edge framework for Backend
        </p>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => {
          const parsed = parseFloat(stat.value.replace(/,/g, ''))
          const showDecimals = parsed % 1 !== 0

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className={cn(
                  "rounded-2xl transition-shadow duration-300",
                  stat.highlight
                    ? "bg-yellow-50 border-yellow-400 shadow-[0_0_0_2px_#facc15] hover:shadow-2xl"
                    : "bg-white border-gray-200 shadow-xl hover:shadow-2xl"
                )}
              >
                <CardHeader className="flex items-center gap-2">
                  <span className="text-2xl">{stat.emoji}</span>
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    {stat.label} {stat.highlight && <span className="ml-1">👑</span>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-4xl font-extrabold text-black">
                    <CountUp
                      end={parsed}
                      duration={1.5}
                      separator="," 
                      decimals={showDecimals ? 2 : 0}
                    /> {stat.unit}
                  </p>
                  {stat.description && (
                    <p className="text-sm text-gray-500 mt-2 leading-snug">
                      {stat.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
        </div>
      </div>
    </section>
  )
}