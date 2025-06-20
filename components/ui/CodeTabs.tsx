'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'
import { cn } from '@/lib/utils'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
interface CodeTab {
  title: string
  code: string
  language: string
}

interface CodeTabsProps {
  title?: string
  tabs: CodeTab[]
}

export function CodeTabs({ title, tabs }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.title || '')

  return (
    <div className="py-10 px-4 bg-white dark:bg-gray-950 rounded-2xl shadow-md">
      {title && (
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          {title}
        </h2>
      )}

      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-4xl mx-auto"
      >
        <TabsList className="flex flex-wrap gap-2 justify-center mb-6">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.title}
              value={tab.title}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                tab.title === activeTab
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.title} value={tab.title}>
            <div className="overflow-hidden rounded-xl shadow-sm border">
              <SyntaxHighlighter
                language={tab.language}
                style={nightOwl}
                customStyle={{
                  margin: 0,
                   backgroundColor: '#011627', // ← nightOwl の本来の背景色

                  padding: '1.5rem',
                  fontSize: '0.875rem',
     
                  
                }}
              >
                {tab.code.trim()}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
