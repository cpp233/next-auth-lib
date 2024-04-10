import { db } from '@/lib/db';

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passswordToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    return passswordToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passswordToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return passswordToken;
  } catch (error) {
    return null;
  }
};
