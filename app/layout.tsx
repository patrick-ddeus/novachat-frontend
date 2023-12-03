'use client'
import { Ubuntu } from 'next/font/google';
import '@/styles/globals.css';
import { UserProvider } from '../contexts/UserContext';

const ubuntu = Ubuntu({ weight: '400', subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
