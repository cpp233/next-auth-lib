'use client';

import { admin } from '@/actions/admin';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurRole } from '@/hooks/user-currnet.role';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

const AdminPage = () => {
  const role = useCurRole();

  const onApiRouteClick = () => {
    fetch('/api/admin').then(res => {
      if (res.ok) {
        toast.success('API 成功访问');
      } else {
        toast.error('API 需要授权');
      }
    });
  };

  const onServerActionClick = () => {
    admin().then(data => {
      const { type, message } = data;
      toast[type](message);
    });
  };

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <p className='text-xl font-semibold text-center'>Admin</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message='需要授权的页面'></FormSuccess>
        </RoleGate>
        {/*  */}
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>测试</Button>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>测试</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
