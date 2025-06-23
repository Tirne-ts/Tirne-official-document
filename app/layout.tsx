// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Providers } from "../components/Provider"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className='flex-1 p-4 sm:p-6 md:p-10 max-w-screen-lg w-full mx-auto'> {children}</div>
         
        </Providers>
      </body>
    </html>
  )
}
