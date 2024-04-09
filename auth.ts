import NextAuth from 'next-auth';
// import GitHub from 'next-auth/providers/github';
import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // 兼容 prisma 的 edge
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' }, // 使用 jwt 作为 session 策略
  ...authConfig,
  // providers: [GitHub],
});
