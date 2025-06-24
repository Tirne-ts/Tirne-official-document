// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Providers } from "../components/Provider"
import Script from 'next/script'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ⭐ Google Analytics gtag.js スニペット */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KY2GZ595WV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KY2GZ595WV');
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <div className='flex-1 p-4 sm:p-6 md:p-10 max-w-screen-lg w-full mx-auto'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
