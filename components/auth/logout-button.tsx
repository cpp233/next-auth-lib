'use client';

import { signOut } from 'next-auth/react';

import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/button';

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    // signOut();
    // 或者，使用以下代码手动退出：
    logout();
  };

  return (
    <span className='bg-white rounded-xl' onClick={onClick}>
      {children}
    </span>
  );
};

export default LogoutButton;
