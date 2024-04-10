'use server';

import { curRole } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export const admin = async (): Promise<{
  type: 'error' | 'success';
  message: string;
}> => {
  const role = await curRole();

  if (role === UserRole.ADMIN) {
    return { type: 'success', message: 'Action 授权成功' };
  }

  return { type: 'error', message: 'Action 需要授权' };
};
