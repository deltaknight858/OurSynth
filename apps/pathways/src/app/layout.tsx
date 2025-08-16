import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import '../styles/glass.css';
import CommandCenter from 'packages/ui/src/components/CommandCenter';
import GlobalBottomNavBar from 'packages/ui/src/components/GlobalBottomNavBar';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header';
import NoSSR from '@/components/NoSSR';
import CustomThemeProvider from '@/components/theme/CustomThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pathways - AI Component Generator',
  description: 'Generate beautiful React components with AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CustomThemeProvider>
          <AuthProvider>
            <NoSSR fallback={<div style={{ height: '70px' }} />}>
              <Header />
            </NoSSR>
            {children}
            <CommandCenter appContext="pathways" />
            <GlobalBottomNavBar />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                },
              }}
            />
          </AuthProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
