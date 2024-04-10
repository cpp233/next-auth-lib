'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useTransition } from 'react';

import { LoginSchema } from '@/schemas';
import CardWrapper from '@/components/auth/card-wrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ROUTE_AUTH_REGISTER } from '@/lib/getEnv';

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const searchParams = useSearchParams();

  // https://authjs.dev/concepts/faq
  // When I sign in with another account with the same email address, why are accounts not linked automatically?
  const urlError =
    searchParams?.get('error') === 'OAuthAccountNotLinked'
      ? '该邮件已经注册过！'
      : '';

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    // console.log(values);
    setError('');
    setSuccess('');
    startTransition(() => {
      login(values).then(data => {
        if (!data) {
          return;
        }
        const { type, message } = data;
        type === 'error' ? setError(message) : setSuccess(message);
      });

      // TODO: 2FA
    });
  };

  return (
    <CardWrapper
      headerLabel='欢迎回来'
      backButtonLabel='没有账号？'
      backButtonHref={ROUTE_AUTH_REGISTER}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='test@exaple.com'
                      type='email'
                      disabled={isPending}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // placeholder='******'
                      type='password'
                      disabled={isPending}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                  {/*  */}
                  <Button size='sm' variant='link' asChild>
                    <Link href='/auth/reset'>忘记密码？</Link>
                  </Button>
                </FormItem>
              )}
            ></FormField>
          </div>
          {/*  */}
          <FormError message={error || urlError}></FormError>
          <FormSuccess message={success}></FormSuccess>
          <Button type='submit' className='w-full' disabled={isPending}>
            登录
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
