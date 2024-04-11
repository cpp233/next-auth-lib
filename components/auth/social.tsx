'use client';

import { FaGithub } from 'react-icons/fa';
// import { BsTencentQq } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { useSearchParams } from 'next/navigation';

export const Social = () => {
  const searchParams = useSearchParams();
  // 获取是否含登陆前 url 信息
  const callbackUrl = searchParams?.get('callbackUrl');

  const onClick = (provider: 'github' | 'google') => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => onClick('google')}
      >
        {/* <BsTencentQq className='h-5 w-5' /> */}
        <FcGoogle className='h-5 w-5'></FcGoogle>
      </Button>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => onClick('github')}
      >
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  );
};
