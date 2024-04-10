import { auth } from '@/auth';

export const curUser = async () => {
  const session = await auth();

  return session?.user;
};
