// 如果从 server 导入，则为 server 组件
// 如果从 client 导入，则为 client 组件

import { ExtendUser } from '@/next-auth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface UserInfoProps {
  user?: ExtendUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className='w-[600px] shadow-md'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>{label}</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        {Object.keys(user || {}).map(key => {
          const value = user?.[key as keyof ExtendUser];
          // console.log(key, value);
          return (
            <div
              key={key}
              className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'
            >
              <p className='text-sm font-medium'>{key}</p>
              <p className='truncate text-xs max-w-[180px] font-mono [-1 bg-slate-100 rounded-md'>
                {value}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
