import * as z from 'zod';

export const Loginschema = z.object({
  email: z.string().email({
    message: '请输入有效的电子邮件地址',
  }),
  passwork: z.string().min(6, { message: '密码长度至少为6' }),
});
