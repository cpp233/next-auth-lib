'use client';
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface CountdownButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  millisecond: number;
}

const CountdownButton = ({
  millisecond,
  children,
  ...props
}: CountdownButtonProps) => {
  const [timeLeft, setTimeLeft] = useState(millisecond);

  useEffect(() => {
    if (!timeLeft) {
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(Math.floor(millisecond / 1000));
  }, [millisecond]);

  return (
    <div className=''>
      <Button
        {...props}
        disabled={timeLeft > 1 ? true : props.disabled}
        className={cn('space-x-2', props.className)}
      >
        {timeLeft > 1 && (
          <div className='text-md font-bold text-white'>{timeLeft}</div>
        )}
        <div>{children}</div>
      </Button>
    </div>
  );
};
export default CountdownButton;
