import { Resend } from 'resend';

import {
  ROUTE_AUTH_NEW_VERIFICATION,
  ROUTE_AUTH_NEW_PASSWORK,
  NEXT_PUBLIC_APP_URL,
  DEV_NOT_SEND_MAIL,
} from '@/lib/getEnv';
import { EmailTemplate } from './EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  if (DEV_NOT_SEND_MAIL) {
    return;
  }

  const title = '验证你的邮箱';
  const confirmLink = `${NEXT_PUBLIC_APP_URL}${ROUTE_AUTH_NEW_VERIFICATION}?token=${token}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: title,
    // html: `<p>点击<a href="${confirmLink}">这里</a>验证你的邮箱。</p>
    // `,
    text: 'text',
    react: EmailTemplate({ title, href: confirmLink }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  if (DEV_NOT_SEND_MAIL) {
    return;
  }

  const title = '重置密码';
  const resetLink = `${NEXT_PUBLIC_APP_URL}${ROUTE_AUTH_NEW_PASSWORK}?token=${token}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: title,
    // html: `<p>点击<a href="${resetLink}">这里</a>重置你的密码。</p>
    // `,
    text: 'text',
    react: EmailTemplate({ title, href: resetLink }),
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  if (DEV_NOT_SEND_MAIL) {
    return;
  }

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: '2FA 验证码',
    html: `<p>您的 2FA 验证码为： ${token} 。</p>`,
  });
};
