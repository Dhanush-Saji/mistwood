import { DM_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header';
import AuthContext from '@/context/AuthContext';
import ToastContext from '@/context/ToastContext';

const inter = DM_Sans({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'] });

export const metadata = {
  title: 'Mistwood',
  description: '3D E-commerce',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <body className={inter.className}>
        <ToastContext>
      <ThemeProvider attribute='class' defaultTheme='system'>
      <AuthContext>
      {children}
    </AuthContext>
      </ThemeProvider>
      </ToastContext>
        </body>
    </html>
  )
}
