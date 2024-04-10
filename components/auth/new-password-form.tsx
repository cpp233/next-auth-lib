'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';

import { NewPasswordSchema } from '@/schemas';
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
import { newPassword } from '@/actions/new-password';
import { ROUTE_AUTH_LOGIN } from '@/lib/getEnv';

const NewPasswordForm = () => {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    console.log(values);
    setError('');
    setSuccess('');

    startTransition(() => {
      newPassword(values, token).then(data => {
        if (!data) {
          return;
        }
        const { type, message } = data;
        type === 'error' ? setError(message) : setSuccess(message);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='输入一个新密码'
      backButtonLabel='返回登录'
      backButtonHref={ROUTE_AUTH_LOGIN}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>新密码</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='请输入新密码'
                      type='password'
                      disabled={isPending}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
          </div>
          {/*  */}
          <FormError message={error}></FormError>
          <FormSuccess message={success}></FormSuccess>
          <Button type='submit' className='w-full' disabled={isPending}>
            重置密码
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
