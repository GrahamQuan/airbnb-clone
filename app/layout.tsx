import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import NavBar from './components/navbar/NavBar'
import ClientOnly from './components/ClientOnly'
import ReduxProvider from './redux/provider'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

const font = Nunito({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Airbnb',
  description:
    'Full Stack Airbnb Clone with Next.js 13 RSC: React, Redux, Tailwind, Prisma, MongoDB, NextAuth',
  icons: {
    icon: '/favicon.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ReduxProvider>
            <NavBar user={user} />
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
          </ReduxProvider>
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
