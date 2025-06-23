"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, FileText } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// ドキュメント項目リスト
const DOC_ENTRIES = [
  'introduction',
  'getting-started',
  'middleware',
  'rate-Limit-Middleware',
  'auth-Middleware',
  'cookieAuth-Middleware',
  'CORS',
  'routing',
  'utilities',
  'error-Handling',
]

// ✅ モバイル判定フック
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}

// 🎯 メイン Sidebar コンポーネント
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // ページ遷移時にモバイルメニューを閉じる
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (name: string) => pathname === `/docs/${name}`

  return (
    <>
      {/* 🍔 モバイルメニュー・トグル */}
      {isMobile && !isOpen && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      )}

      {/* 📱 モバイル用サイドバー */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <>
            {/* オーバーレイ */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />

            {/* スライドメニュー */}
            <motion.aside
              className="fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-xl p-6"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-blue-800">📘 Docs</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="hover:text-red-500 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <SidebarContent entries={DOC_ENTRIES} isActive={isActive} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 🖥 デスクトップ用サイドバー（常に表示） */}
      {!isMobile && (
        <aside className="block w-64 border-r bg-white p-6 sticky top-0 h-screen overflow-y-auto shadow-sm">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">📘 Docs</h2>
          <SidebarContent entries={DOC_ENTRIES} isActive={isActive} />
        </aside>
      )}
    </>
  )
}

// 📚 Sidebar内リスト表示コンポーネント
function SidebarContent({
  entries,
  isActive,
}: {
  entries?: string[]
  isActive: (name: string) => boolean
}) {
  return (
    <ul className="space-y-1 text-sm">
      {entries?.map((name) => (
        <li key={name}>
          <Link
            href={`/docs/${name}`}
            className={`flex items-center gap-2 px-10 py-2 rounded-lg transition-colors group ${
              isActive(name)
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
            aria-current={isActive(name) ? 'page' : undefined}
          >
            <FileText
              className={`w-4 h-4 transition-colors ${
                isActive(name)
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-blue-500'
              }`}
            />
            <span className="capitalize">{name.replace(/-/g, ' ')}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}