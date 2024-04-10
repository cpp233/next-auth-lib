import NextAuth from 'next-auth';
// import GitHub from 'next-auth/providers/github';
import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { getUserById } from './data/user';
import { UserRole } from '@prisma/client';
import { ROUTE_AUTH_ERROR, ROUTE_AUTH_LOGIN } from '@/lib/getEnv';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getAccountByUserid } from './data/account';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: ROUTE_AUTH_LOGIN,
    error: ROUTE_AUTH_ERROR, // 用来处理错误的路由
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
    // 登陆守护
    async signIn({ user, account }) {
      // console.log('[signIn]', user, account);

      // OAuth 账号通过
      if (account?.provider !== 'credentials') {
        return true;
      }

      if (!user || !user.id) {
        return false;
      }

      // 防止未验证邮箱登陆
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) {
        return false;
      }

      // 2FA 守护
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) {
          return false;
        }

        // 删除 2FA 防止下次登录
        // TODO: 设置过期时间
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async session({ session, token }) {
      // console.log('[session]', session, token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.sub && session.user && token.role) {
        session.user.role = token.role;
      }

      if (token.sub && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      // 更改设置后更新 session 信息
      if (session.user) {
        session.user.name = token.name;
        if (token.email) {
          session.user.email = token.email;
        }
        session.user.isOAuth = token.isOAuth;
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

      // 防止非邮箱账户意外修改
      const existingAccount = await getAccountByUserid(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },
  // 兼容 prisma 的 edge
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' }, // 使用 jwt 作为 session 策略
  ...authConfig,
  // providers: [GitHub],
});
