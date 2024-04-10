'use server';

import { signOut } from '@/auth';

export const logout = async () => {
  // 做一些其他服务端的操作
  await signOut();
};
