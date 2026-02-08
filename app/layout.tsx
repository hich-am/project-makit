import React from "react"
import type { Metadata, Viewport } from 'next'
import { Manrope, Space_Grotesk } from 'next/font/google';

import './globals.css';

const _manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'makit - Your Kit to Make It',
  description: 'Makit creates hyper-realistic AI video and photography campaigns for clothing brands. Impossible shoots made possible.',
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${_manrope.variable} ${_spaceGrotesk.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
