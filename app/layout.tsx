import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { I18nProvider } from '@/lib/i18n/i18n'
import { Toaster } from 'sonner'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'makit - Your Kit to Make It',
  description: 'Makit creates hyper-realistic AI video and photography campaigns for clothing brands. Impossible shoots made possible.',
}

export const viewport: Viewport = {
  themeColor: '#010101',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#010101]`}>
        <I18nProvider>
          {children}
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f5f5f7',
              },
            }}
          />
        </I18nProvider>
      </body>
    </html>
  )
}

