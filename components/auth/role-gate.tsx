'use client';

import { UserRole } from '@prisma/client';

import { useCurRole } from '@/hooks/user-currnet.role';
import { FormError } from '@/components/form-error';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurRole();

  if (role !== allowedRole) {
    return <FormError message='未授权'></FormError>;
  }

  return <>{children}</>;
};
