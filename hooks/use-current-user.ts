import { useSession } from 'next-auth/react';

export const useCurUser = () => {
  const session = useSession();

  if (session.data?.user) {
    return session.data?.user;
  }

  return null;
};
