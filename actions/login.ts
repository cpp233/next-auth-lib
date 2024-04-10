'use server';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthError } from 'next-auth';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<{ type: 'success' | 'error'; message: string }> => {
  // console.log(values);
  const validationSchema = LoginSchema.safeParse(values);

  if (!validationSchema.success) {
    return { type: 'error', message: '无效字段' };
  }

  const { email, password } = validationSchema.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { type: 'error', message: '无效用户' };
  }

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
