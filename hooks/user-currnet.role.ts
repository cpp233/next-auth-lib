import { useSession } from 'next-auth/react';

export const useCurRole = () => {
  const session = useSession();

  return session.data?.user.role;
};
