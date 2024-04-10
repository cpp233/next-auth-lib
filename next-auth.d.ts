// https://authjs.dev/getting-started/typescript
import { UserRole } from '@prisma/client';
import type { DefaultSession } from 'next-auth';
export type ExtendUser = DefaultSession['user'] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
};
declare module 'next-auth' {
  interface Session {
    user: ExtendUser;
  }
}

import type { JWT } from 'next-auth/jwt';
export type ExtendJWT = JWT & {
  token: ExtendUser;
};
declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole;
    isTwoFactorEnabled: boolean;
    // fish: string;
  }
}
