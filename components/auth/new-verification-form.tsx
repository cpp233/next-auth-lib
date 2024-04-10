'use client';
import { BeatLoader } from 'react-spinners';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import CardWrapper from '@/components/auth/card-wrapper';
import { newVerification } from '@/actions/new-verification';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
import { ROUTE_AUTH_LOGIN } from '@/lib/getEnv';

function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    // console.log(token);
    if (success || error) {
      return;
    }

    if (!token) {
      setError('未找到验证码!');
      return;
    }

    console.log({ data: new Date().toISOString(), token, success, error });
    newVerification(token)
      .then(data => {
        const { type, message } = data;
        type === 'error' ? setError(message) : setSuccess(message);

        console.log({ data: new Date().toISOString(), token, type, message });
      })
      .catch(err => {
        setError('出现未知错误，请联系开发者！');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel='正在确认验证码'
      backButtonLabel='返回登录'
      backButtonHref={ROUTE_AUTH_LOGIN}
    >
      <div className='flex item-center justify-center'>
        {!error && !success && <BeatLoader></BeatLoader>}
        <FormSuccess message={success}></FormSuccess>
        {!success && <FormError message={error}></FormError>}
      </div>
    </CardWrapper>
  );
}

export default NewVerificationForm;
