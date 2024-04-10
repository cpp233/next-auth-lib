'use client';

import UserButton from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className='bg-secondary flex justify-between items-center p-2 rounded-xl w-full max-w-2xl lg:w-2/4 2xl:w-1/4 shadow-sm'>
      <div className='flex gap-x-2'>
        <Button
          variant={pathname === '/server' ? 'default' : 'outline'}
          asChild
        >
          <Link href='/server'>Server</Link>
        </Button>
        <Button
          variant={pathname === '/client' ? 'default' : 'outline'}
          asChild
        >
          <Link href='/client'>Client</Link>
        </Button>
        <Button variant={pathname === '/admin' ? 'default' : 'outline'} asChild>
          <Link href='/admin'>Admin</Link>
        </Button>
        <Button
          variant={pathname === '/settings' ? 'default' : 'outline'}
          asChild
        >
          <Link href='/settings'>设置</Link>
        </Button>
      </div>
      <UserButton></UserButton>
    </div>
  );
};

export default Navbar;
