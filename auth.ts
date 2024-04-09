import NextAuth from 'next-auth';
// import GitHub from 'next-auth/providers/github';
import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { getUserById } from './data/user';
import { UserRole } from '@prisma/client';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error', // 错误路由
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    // async signIn({ user }) {
    //   // console.log('[signIn]', user);
    //   return true;
    //   if (!user.id) {
    //     return false;
    //   }

    //   const existingUser = await getUserById(user.id);
    //   if (!existingUser || !existingUser?.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
    async session({ session, token }) {
      // console.log('[session]', session, token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.sub && session.user && token.role) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      // console.log('[jwt]', token);
      // token.addFiled = 'new token field';

      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;
      return token;
    },
  },
  // 兼容 prisma 的 edge
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' }, // 使用 jwt 作为 session 策略
  ...authConfig,
  // providers: [GitHub],
});
