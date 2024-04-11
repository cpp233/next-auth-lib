import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/auth';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Auth 组件测试',
  description:
    'Next Auth 组件测试：注册、登陆、邮件验证码、忘记密码、2FA、OAuth 、权限。',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body className={inter.className}>
          <Toaster></Toaster>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
