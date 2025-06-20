'use client'
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface PhilosophyItem {
  title: string
  desc: string
}

interface PhilosophyCardsProps {
    title: string;

  items: PhilosophyItem[]
}

export function PhilosophyCards({ title, items }: PhilosophyCardsProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 transition-colors duration-300 hover:text-indigo-600">
          {title}
        </h2>
        <p className="mt-4 text-lg text-gray-600 transition-colors duration-300 hover:text-indigo-600">
          Tirne is not just a framework. It&#39;s a philosophy of structure, clarity, and control.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 min-h-[180px]">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}