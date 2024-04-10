import { UserInfo } from '@/components/user-info';
import { curUser } from '@/lib/auth';

const ServerPage = async () => {
  const user = await curUser();
  return <UserInfo label='Server Component' user={user}></UserInfo>;
};

export default ServerPage;
