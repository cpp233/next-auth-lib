import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import CardWrapper from '@/components/auth/card-wrapper';
import { ROUTE_AUTH_LOGIN } from '@/lib/getEnv';

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='登录出错'
      backButtonLabel='返回登录'
      backButtonHref={ROUTE_AUTH_LOGIN}
    >
      <div className='w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
