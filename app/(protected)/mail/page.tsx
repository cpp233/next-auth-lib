import { EmailTemplate } from '@/lib/EmailTemplate';

const MailPage = () => {
  return (
    <EmailTemplate
      title='验证你的邮箱'
      href='https://example.com/verify'
    ></EmailTemplate>
  );
};

export default MailPage;
