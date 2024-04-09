'use server';

import { getUserByEmail, getUserById } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';
import { db } from '@/lib/db';

export const newVerification = async (
  token: string
): Promise<{ type: 'success' | 'error'; message: string }> => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { type: 'error', message: '无效验证码！' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { type: 'error', message: '验证码过期！' };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { type: 'error', message: '邮箱不存在！' };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { type: 'success', message: '验证成功!' };
};
