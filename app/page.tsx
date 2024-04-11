import LoginButton from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-sky-500'>
      <div className='space-y-6'>
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className='text-white text-lg'>权限认证</p>
        <LoginButton mode='modal' asChild>
          <Button variant='secondary' size='lg'>
            开始体验
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
