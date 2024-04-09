'use server';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // console.log(values);
  const validationSchema = LoginSchema.safeParse(values);

  if (!validationSchema.success) {
    return { type: 'error', message: '无效字段' };
  }

  const { email, password } = validationSchema.data;

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
