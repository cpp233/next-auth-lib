import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import CardWrapper from '@/components/auth/card-wrapper';

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='登录出错'
      backButtonLabel='返回登录'
      backButtonHref='/auth/login'
    >
      <div className='w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
