'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Header from './header';
import { Social } from './social';
import { BackButton } from './back-button';
import { cn } from '@/lib/utils';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  modal?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = false,
  modal = false,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(
        'shadow-md',
        modal ? '' : 'w-11/12 max-w-2xl lg:w-2/4 2xl:w-1/4'
      )}
    >
      <CardHeader>
        <Header label={headerLabel}></Header>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social></Social>
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
