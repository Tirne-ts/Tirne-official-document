'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  children: string
  language?: string
}

export function CodeBlock({ children, language = 'ts' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative my-6">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded hover:bg-gray-700 transition-all"
      >
        {copied ? 'Copied!' : <Copy size={14} />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{
          padding: '1.25rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          overflowX: 'auto',
          background: '#282c34',
          margin: 0,
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
