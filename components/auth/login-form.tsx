import React from 'react';
import CardWrapper from '@/components/auth/card-wrapper';

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel='欢迎回来'
      backButtonLabel='没有账号？'
      backButtonHref='/auth/register'
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
};

export default LoginForm;
