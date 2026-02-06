import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'Salon Zuza - Moderní kadeřnictví v Dobříši',
  description: 'Profesionální kadeřnictví v Dobříši. Střihy, barvy, účesy pro ženy. Online rezervace termínů.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <body className={`${montserrat.variable} font-sans antialiased bg-white text-[#212121]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
