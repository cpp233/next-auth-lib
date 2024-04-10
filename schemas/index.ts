import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: '请输入有效的电子邮件地址',
  }),
  password: z.string().min(1, { message: '密码不能为空' }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: '请输入有效的电子邮件地址',
  }),
  password: z.string().min(6, { message: '密码长度至少为6' }),
  name: z.string().min(1, { message: '昵称不能为空' }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: '请输入有效的电子邮件地址',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: '密码长度至少为6' }),
});
