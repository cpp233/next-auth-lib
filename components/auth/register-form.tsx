'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useTransition } from 'react';

import { RegisterSchema } from '@/schemas';
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
import CountdownButton from '@/components/countdown-button';
import { register } from '@/actions/register';
import { ROUTE_AUTH_LOGIN } from '@/lib/getEnv';

const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [countdown, setCountdown] = useState<number>(0);

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    // console.log(values);
    setError('');
    setSuccess('');
    startTransition(() => {
      register(values).then(data => {
        const { type, message } = data;

        switch (type) {
          case 'error':
            setError(message);
            break;
          case 'success':
            setSuccess(message);
            break;
          case 'success':
            setSuccess(message);
            break;
          case 'too_frequent':
            const now = new Date().getTime();
            const distance = Number(message) - now;
            setError('验证邮件已发送，请稍后再试！');
            setCountdown(distance);
            break;

          default:
            setError('未知错误，请联系管理员！');
            break;
        }
        //
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='注册账号'
      backButtonLabel='已经有了账号？'
      backButtonHref={ROUTE_AUTH_LOGIN}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>昵称</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='请输入昵称'
                      type='text'
                      disabled={isPending}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
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
                </FormItem>
              )}
            ></FormField>
          </div>
          {/*  */}
          <FormError message={error}></FormError>
          <FormSuccess message={success}></FormSuccess>
          {/* <Button type='submit' className='w-full' disabled={isPending}>
            创建账号
          </Button> */}
          <CountdownButton
            type='submit'
            className='w-full'
            disabled={isPending}
            millisecond={countdown}
          >
            创建账号
          </CountdownButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
