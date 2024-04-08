'use server';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { LoginSchema } from '@/schemas';

export const register = async (values: z.infer<typeof LoginSchema>) => {
  // console.log(values);
  const validationSchema = LoginSchema.safeParse(values);

  if (!validationSchema.success) {
    return { type: 'error', message: '无效字段' };
  }

  return {
    type: 'success',
    message: '登陆成功',
  };
};
