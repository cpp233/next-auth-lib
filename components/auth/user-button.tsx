'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { useCurUser } from '@/hooks/use-current-user';
import LogoutButton from './logout-button';
import { ExitIcon } from '@radix-ui/react-icons';

const UserButton = () => {
  const user = useCurUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''}></AvatarImage>
          <AvatarFallback className='bg-sky-500'>
            <FaUser className='text-white'></FaUser>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className='size-4'></ExitIcon>
            退出
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
