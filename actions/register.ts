'use server';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<{ type: 'success' | 'error' | 'too_frequent'; message: string }> => {
  // console.log(values);
  const validationSchema = RegisterSchema.safeParse(values);

  if (!validationSchema.success) {
    return { type: 'error', message: '无效字段' };
  }

  const { name, email, password } = validationSchema.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      type: 'error',
      message: '该邮箱已注册',
    };
  }

  // 生成验证，用户验证后可登录
  const data = await generateVerificationToken(email);

  const { isNew, token: verificationToken } = data;
  if (!isNew) {
    return {
      type: 'too_frequent',
      message: `${verificationToken.createdAt.getTime() + 60 * 1000}`,
    };
  }

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  // 创建用户，但是待验证
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    type: 'success',
    message: '邮件已发送，请到邮箱中查看',
  };
};
