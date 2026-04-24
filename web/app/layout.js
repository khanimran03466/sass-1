import './globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SuperApp - One Stop Fintech Solution',
  description: 'Pay rent, bills, book flights and more with ease.',
};

import ProtectedRoute from '../components/ProtectedRoute';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
        <script src="https://accounts.google.com/gsi/client" async></script>
      </body>
    </html>
  );
}
