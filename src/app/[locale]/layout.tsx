import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from 'sonner'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Onboarding Intelligent B2B - Smart Client Onboarding',
  description: 'Streamline your B2B client onboarding process with intelligent forms and automated workflows.',
  icons: {
    icon: '/logo-merman.png',
  },
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster position="top-right" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
