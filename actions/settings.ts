'use server';
import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { getUserByEmail, getUserById } from '@/data/user';
import { curUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import {
  TOKEN_LIMIT_IN_MINUTES,
  generateVerificationToken,
} from '@/lib/tokens';
import { SettingsSchema } from '@/schemas';

export const settings = async (
  values: z.infer<typeof SettingsSchema>
): Promise<{ type: 'success' | 'error' | 'too_frequent'; message: string }> => {
  const user = await curUser();

  if (!user || !user.id) {
    return { type: 'error', message: '用户不存在' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { type: 'error', message: '用户不存在' };
  }

  // 服务端防护
  // 如果是OAuth用户，则不允许修改邮箱和密码
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // 邮件有变化
  if (values.email && values.email !== dbUser.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { type: 'error', message: '该邮箱已被注册' };
    }
    const data = await generateVerificationToken(values.email);

    const { isNew, token: verificationToken } = data;
    if (!isNew) {
      return {
        type: 'too_frequent',
        message: `${
          verificationToken.createdAt.getTime() + TOKEN_LIMIT_IN_MINUTES
        }`,
      };
    }

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { type: 'success', message: '验证邮件已发送' };
  }

  // 密码有变化
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) {
      return { type: 'error', message: '密码不正确' };
    }
    const hashPassword = await bcrypt.hash(values.password, 10);
    values.password = hashPassword;
    values.newPassword = undefined;
  }

  // 如果只有密码，而无新密码，是浏览器自动填充。
  if (values.password && !values.newPassword) {
    values.password = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { type: 'success', message: '设置已保存' };
};
