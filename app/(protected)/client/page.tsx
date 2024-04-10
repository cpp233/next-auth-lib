'use client';
import { UserInfo } from '@/components/user-info';
import { useCurUser } from '@/hooks/use-current-user';

const ClientPage = () => {
  const user = useCurUser();
  return <UserInfo label='Client Component' user={user}></UserInfo>;
};

export default ClientPage;
