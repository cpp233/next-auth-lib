import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface EmailTemplateProps {
  title: string;
  href: string;
}

export const EmailTemplate1: React.FC<Readonly<EmailTemplateProps>> = ({
  title,
  href,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent className='space-y-6'>
      <Separator orientation='horizontal' />
      <p className='text-md font-medium leading-none'>
        要确认您的操作，请点击下面的链接：
      </p>
      <Button variant='link' className='bg-sky-100' asChild>
        <a href={href}>验证邮件</a>
      </Button>
      <p className='text-sm text-muted-foreground'>
        如果您没有进行过相关操作，可以忽略这封邮件。
      </p>
      <Separator orientation='horizontal' />
      <p>点击此链接有问题？请将以下链接复制到浏览器中打开：{href}</p>
    </CardContent>
  </Card>
);

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  title,
  href,
}) => (
  <div className='rounded-xl border bg-card text-card-foreground shadow'>
    <div className='flex flex-col space-y-1.5 p-6'>
      <div className='font-semibold leading-none tracking-tight text-center'>
        {title}
      </div>
    </div>
    <div className='p-6 pt-0 space-y-6'>
      <div className='shrink-0 bg-border h-[1px] w-full'></div>
      <p className='text-md font-medium leading-none'>
        要确认您的操作，请点击下面的链接：
      </p>

      <div className='text-primary underline-offset-4 hover:underline'>
        <a href={href} target='_blank'>
          点击确认
        </a>
      </div>

      <p className='text-sm text-muted-foreground'>
        如果您没有进行过相关操作，可以忽略这封邮件。
      </p>

      <div className='shrink-0 bg-border h-[1px] w-full'></div>
      <p>点击此链接有问题？请将以下链接复制到浏览器中打开：{href}</p>
    </div>
  </div>
);
