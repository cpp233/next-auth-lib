'use server';
import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
): Promise<{ type: 'success' | 'error'; message: string }> => {
  if (!token) {
    return { type: 'error', message: '缺少 Token' };
  }

  const validationSchema = NewPasswordSchema.safeParse(values);

  if (!validationSchema.success) {
    return { type: 'error', message: '无效字段' };
  }

  const { password } = validationSchema.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { type: 'error', message: '无效的 Token' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { type: 'error', message: '验证码过期！' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { type: 'error', message: '无效用户' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { type: 'success', message: '密码修改成功' };
};
