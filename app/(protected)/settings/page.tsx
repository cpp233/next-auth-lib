'use client';
import { useSession, signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

const SettingsPage = () => {
  const session = useSession();

  const onClick = () => {
    signOut();
  };

  return (
    <div>
      {JSON.stringify(session)}
      <Button type='submit' onClick={onClick}>
        点我退出
      </Button>
    </div>
  );
};

export default SettingsPage;
