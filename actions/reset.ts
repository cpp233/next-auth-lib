'use server';
import * as z from 'zod';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import {
  TOKEN_LIMIT_IN_MINUTES,
  generatePasswordResetToken,
} from '@/lib/tokens';
import { sendPasswordResetEmail } from '@/lib/mail';

export const reset = async (
  values: z.infer<typeof ResetSchema>
): Promise<{ type: 'success' | 'error' | 'too_frequent'; message: string }> => {
  // console.log(values);
  const validationSchema = ResetSchema.safeParse(values);

  if (!validationSchema.success) {
    return { type: 'error', message: '无效字段' };
  }

  const { email } = validationSchema.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { type: 'error', message: '该邮箱未注册' };
  }

  const data = await generatePasswordResetToken(email);

  const { isNew, token: passwordResetToken } = data;
  if (!isNew) {
    return {
      type: 'too_frequent',
      message: `${
        passwordResetToken.createdAt.getTime() + TOKEN_LIMIT_IN_MINUTES
      }`,
    };
  }

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { type: 'success', message: '邮件已发送' };
};
