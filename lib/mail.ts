import { Resend } from 'resend';
import {
  ROUTE_AUTH_NEW_VERIFICATION,
  ROUTE_AUTH_NEW_PASSWORK,
} from '@/lib/getEnv';

const resend = new Resend(process.env.RESEND_API_KEY);

// export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
//   firstName,
// }) => (
//   <div>
//     <h1>Welcome, {firstName}!</h1>
//   </div>
// );

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:${process.env.PORT}${ROUTE_AUTH_NEW_VERIFICATION}?token=${token}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: '验证你的邮箱',
    html: `<p>点击<a href="${confirmLink}">这里</a>验证你的邮箱。</p>
    `,
  });
};

export const sendePasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:${process.env.PORT}${ROUTE_AUTH_NEW_PASSWORK}?token=${token}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: '重置密码',
    html: `<p>点击<a href="${resetLink}">这里</a>重置你的密码。</p>
    `,
  });
};
