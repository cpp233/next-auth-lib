import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
//   firstName,
// }) => (
//   <div>
//     <h1>Welcome, {firstName}!</h1>
//   </div>
// );

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3001/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: '验证你的邮箱',
    html: `<p>点击<a href="${confirmLink}">这里</a>验证你的邮箱。</p>
    `,
  });
};
