import { ReactNode } from 'react'
import Sidebar from '../../lib/Sidebar'


export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-screen-lg w-full mx-auto">
        {children}
      </main>
    </div>
  )
}
