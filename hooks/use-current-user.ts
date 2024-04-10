import { useSession } from 'next-auth/react';

export const useCurUser = () => {
  const session = useSession();

  return session.data?.user;
};
