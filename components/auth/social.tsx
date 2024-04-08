'use client';

import { FaGithub } from 'react-icons/fa';
import { BsTencentQq } from 'react-icons/bs';

import { Button } from '@/components/ui/button';

export const Social = () => {
  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button size='lg' className='w-full' variant='outline' onClick={() => {}}>
        <BsTencentQq className='h-5 w-5' />
      </Button>
      <Button size='lg' className='w-full' variant='outline' onClick={() => {}}>
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  );
};