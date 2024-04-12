import crypto from 'node:crypto';
import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';

// 有效时长
const TOKEN_EXPIRES_IN_MINUTES = 5;
// 发送间隔
export const TOKEN_LIMIT_IN_MINUTES = 60 * 1000;

export const generateVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(
    new Date().getTime() + TOKEN_EXPIRES_IN_MINUTES * 60 * 1000
  );

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    const createdTime = new Date(existingToken.createdAt).getTime();
    const currentTime = new Date().getTime();
    const distance = currentTime - createdTime;

    if (distance < TOKEN_LIMIT_IN_MINUTES) {
      return {
        isNew: false,
        token: existingToken,
      };
    }

    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return {
    isNew: true,
    token: verificationToken,
  };
};

export const generatePasswordResetToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(
    new Date().getTime() + TOKEN_EXPIRES_IN_MINUTES * 60 * 1000
  );

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    const createdTime = new Date(existingToken.createdAt).getTime();
    const currentTime = new Date().getTime();
    const distance = currentTime - createdTime;

    if (distance < TOKEN_LIMIT_IN_MINUTES) {
      return {
        isNew: false,
        token: existingToken,
      };
    }

    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return {
    isNew: true,
    token: passwordResetToken,
  };
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  const expires = new Date(
    new Date().getTime() + TOKEN_EXPIRES_IN_MINUTES * 60 * 1000
  );

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    const createdTime = new Date(existingToken.createdAt).getTime();
    const currentTime = new Date().getTime();
    const distance = currentTime - createdTime;

    if (distance < TOKEN_LIMIT_IN_MINUTES) {
      return {
        isNew: false,
        token: existingToken,
      };
    }

    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return {
    isNew: true,
    token: twoFactorToken,
  };
};
