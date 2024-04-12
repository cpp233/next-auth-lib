'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useTransition } from 'react';

import { ResetSchema } from '@/schemas';
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
import { reset } from '@/actions/reset';
import { ROUTE_AUTH_LOGIN } from '@/lib/getEnv';

const ResetForm = () => {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [countdown, setCountdown] = useState<number>(0);

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    // console.log(values);
    setError('');
    setSuccess('');

    startTransition(() => {
      reset(values).then(data => {
        if (!data) {
          return;
        }
        const { type, message } = data;

        switch (type) {
          case 'error':
            // form.reset();
            setError(message);
            break;
          case 'success':
            // form.reset();
            setSuccess(message);
            break;
          case 'too_frequent':
            // form.reset();
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

      //
    });
  };

  return (
    <CardWrapper
      headerLabel='忘记密码？'
      backButtonLabel='返回登录'
      backButtonHref={ROUTE_AUTH_LOGIN}
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
                      placeholder='请输入邮箱'
                      type='email'
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
            发送重置密码邮件
          </Button> */}
          <CountdownButton
            type='submit'
            className='w-full'
            disabled={isPending}
            millisecond={countdown}
          >
            发送重置密码邮件
          </CountdownButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
