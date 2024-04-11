'use client';
import { useRouter } from 'next/navigation';

import { ROUTE_AUTH_LOGIN } from '@/lib/getEnv';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import LoginForm from '@/components/auth/login-form';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = 'redirect',
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(ROUTE_AUTH_LOGIN);
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className='p-0 min-w-lg bg-transparent border-none'>
          <LoginForm mode={mode}></LoginForm>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  );
};

export default LoginButton;
