'use server';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

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
    return {
      type: 'error',
      message: '邮箱已注册',
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: 邮箱验证

  return {
    type: 'success',
    message: '创建成功',
  };
};
