'use client';

import { useCurUser } from '@/hooks/use-current-user';

const SettingsPage = () => {
  const user = useCurUser();

  return <div className='bg-white p-10 rounded-xl'>{JSON.stringify(user)}</div>;
};

export default SettingsPage;
