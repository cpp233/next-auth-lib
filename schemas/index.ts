import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: '请输入有效的电子邮件地址',
  }),
  password: z.string().min(1, { message: '密码不能为空' }),
  code2FA: z.optional(z.string()),
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

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  // 不需要了
  // 要不然浏览器会自动填充密码，导致每次都需要填两次密码
  // .refine(
  //   data => {
  //     if (data.password && !data.newPassword) {
  //       return false;
  //     }

  //     return true;
  //   },
  //   {
  //     message: '密码和新密码必须同时存在',
  //     path: ['newPassword'],
  //   }
  // )
  .refine(
    data => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: '新密码和密码必须同时存在',
      path: ['password'],
    }
  );
