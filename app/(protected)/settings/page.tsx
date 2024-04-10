'use client';

import { useSession } from 'next-auth/react';
import { useTransition, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SettingsSchema } from '@/schemas';
import { settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurUser } from '@/hooks/use-current-user';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserRole } from '@prisma/client';
import { Switch } from '@/components/ui/switch';

const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const user = useCurUser();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      // 需要使用 undefined 而不是 空字符串 ''，方便后续解构
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError(''); // 重置错误消息
    setSuccess(''); // 重置成功消息

    startTransition(() => {
      settings(values)
        .then(data => {
          const { type, message } = data;
          if (type === 'success') {
            update(); // 更新会话信息
            setSuccess(message); // 设置成功消息
          }

          if (type === 'error') {
            setError(message); // 设置错误消息
          }
        })
        .catch(error => {
          setError(error);
        });
    });
  };

  return (
    <Card className='w-11/12 max-w-2xl lg:w-2/4 2xl:w-1/4'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center'>设置</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='space-y6' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名称</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='请输入昵称'
                        disabled={isPending}
                      ></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              {/*  */}
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>权限</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='选择'></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              {/*  */}

              {/* 前端防护 */}
              {/*  如果是OAuth用户，则不允许修改邮箱和密码 */}
              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='请输入邮箱'
                            type='email'
                            disabled={isPending}
                          ></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  ></FormField>
                  {/*  */}
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // placeholder='请输入密码'
                            type='password'
                            disabled={isPending}
                          ></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>新密码</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // placeholder='请输入密码'
                            type='password'
                            disabled={isPending}
                          ></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name='isTwoFactorEnabled'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <FormLabel>2FA</FormLabel>
                        <FormDescription>开启 2FA 为您的账户</FormDescription>
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          ></Switch>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  ></FormField>
                </>
              )}

              {/*  */}
            </div>
            {/*  */}
            <FormSuccess message={success}></FormSuccess>
            <FormError message={error}></FormError>
            {/*  */}
            <Button type='submit' disabled={isPending}>
              修改
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
