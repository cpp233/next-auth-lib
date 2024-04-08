'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Loginschema } from '@/schemas';
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
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';

const LoginForm = () => {
  const form = useForm<z.infer<typeof Loginschema>>({
    resolver: zodResolver(Loginschema),
    defaultValues: {
      email: '',
      passwork: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof Loginschema>) => {
    console.log(values);
  };

  return (
    <CardWrapper
      headerLabel='欢迎回来'
      backButtonLabel='没有账号？'
      backButtonHref='/auth/register'
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
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name='passwork'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // placeholder='******'
                      type='passwork'
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
          </div>
          {/*  */}
          <FormError message='test'></FormError>
          <FormSuccess message='test'></FormSuccess>
          <Button type='submit' className='w-full'>
            登录
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
