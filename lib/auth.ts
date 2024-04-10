import { auth } from '@/auth';

export const curUser = async () => {
  const session = await auth();

  return session?.user;
};

export const curRole = async () => {
  const session = await auth();

  return session?.user.role;
};
