'use client'

import { ReactNode } from 'react'
import { Info, AlertTriangle, Lightbulb } from 'lucide-react'

type CalloutType = 'info' | 'warning' | 'tip'

const iconMap = {
  info: <Info size={16} />,
  warning: <AlertTriangle size={16} />,
  tip: <Lightbulb size={16} />,
}

const bgMap = {
  info: 'bg-blue-50 dark:bg-blue-900/20',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20',
  tip: 'bg-green-50 dark:bg-green-900/20',
}

export function Callout({
  children,
  type = 'info',
  title,
}: {
  children: ReactNode
  type?: CalloutType
  title?: string
}) {
  return (
    <div
      className={`rounded-md p-4 border text-sm space-y-2 ${bgMap[type]} border-gray-200 dark:border-gray-700 mb-5 mt-6`}
    >
      <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100 mb-6">
        {iconMap[type]}
        {title && <span>{title}</span>}
      </div>
      <div className="text-gray-700 dark:text-gray-300 mb-6">{children}</div>
    </div>
  )
}
