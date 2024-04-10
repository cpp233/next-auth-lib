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
        type === 'error' ? setError(message) : setSuccess(message);
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
                      placeholder='test@exaple.com'
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
          <Button type='submit' className='w-full' disabled={isPending}>
            发送重置密码邮件
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
