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
): Promise<{ type: 'success' | 'error'; message: string }> => {
  // console.log(values);
  const validationSchema = RegisterSchema.safeParse(values);

  if (!validationSchema.success) {
    return { type: 'error', message: '无效字段' };
  }

  const { name, email, password } = validationSchema.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    // TODO: 倒计时
    return {
      type: 'error',
      message: '该邮箱已注册',
    };
  }

  // 创建用户，但是待验证
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // 生成验证，用户验证后可登录
  const verificationToken = await generateVerificationToken(email);

  // await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    type: 'success',
    message: '邮件已发送',
  };
};
