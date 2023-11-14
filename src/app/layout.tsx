import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CMS_NAME,CMS_DESC } from '../../lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: CMS_NAME,
  description: CMS_DESC,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
