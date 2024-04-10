'use server';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthError } from 'next-auth';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/data/user';
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from '@/lib/tokens';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<{ type: 'success' | 'error' | '2FA'; message: string }> => {
  // console.log(values);
  const validationSchema = LoginSchema.safeParse(values);

  if (!validationSchema.success) {
    return { type: 'error', message: '无效字段' };
  }

  const { email, password, code2FA } = validationSchema.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { type: 'error', message: '无效用户' };
  }

  // 邮件验证
  // 这里也加一个邮件验证判定，防止失效。
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token
    // );

    return { type: 'success', message: '邮件已发送，请在您的邮箱验证确认邮件' };
  }

  // 2FA 验证
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (!code2FA) {
      // const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      // await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return {
        type: '2FA',
        message: '邮件已发送，请在您的邮箱查看 2FA 验证码',
      };
    }

    const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
    if (!twoFactorToken || twoFactorToken.token !== code2FA) {
      return { type: 'error', message: '无效的 2FA 验证码' };
    }

    const hasExpired = new Date(twoFactorToken.expires) < new Date();
    if (hasExpired) {
      return { type: 'error', message: '2FA 验证码已过期' };
    }

    await db.twoFactorToken.delete({
      where: {
        id: twoFactorToken.id,
      },
    });

    const existingConfirmation = await getTwoFactorConfirmationByUserId(
      existingUser.id
    );

    // 如果有删掉已有的，创建新的。
    if (existingConfirmation) {
      await db.twoFactorConfirmation.delete({
        where: {
          id: existingConfirmation.id,
        },
      });
    }

    // 创建新的，用来登录
    await db.twoFactorConfirmation.create({
      data: {
        userId: existingUser.id,
      },
    });
    //
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { type: 'error', message: '用户名或密码错误' };
        default:
          return { type: 'error', message: '未知错误' };
      }
    }

    // 非 AuthError 则继续抛出
    throw error;
  }

  return {
    type: 'success',
    message: '登陆成功',
  };
};
