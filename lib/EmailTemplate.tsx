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

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
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
      <Button variant='link' className='bg-sky-100'>
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
