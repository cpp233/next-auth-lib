## 技术栈

- next
- next-auth
- tailwindcss
- shadcn-ui
- prisma
- zod
- react-hook-form

## 功能一览

- 🔐 Next-auth v5 (Auth.js)
- 📧 邮件注册
- 📬 注册邮件验证
- 🌍 OAuth 注册 (Google/GitHub 通过 Provider 可扩展更多)
- 🗝️ 邮箱密码登录
- 🛡️ 忘记密码
- 🔒 2FA 登录保护
- 📱 响应式布局
- 🖥️ 通过 server component 获取登陆状态
- 💻 通过 client component 获取登陆状态
- 🗝️ 登陆 component
- 📝 注册 component
- 🤔 忘记密码 component
- ✅ 邮件验证 component
- ⚙️ 设置 component
  - 💌 更改邮箱
  - 🔑 更改密码
  - 🔔 开/关 2FA
- 🔍 扩展 next.js middleware
- 📈 扩展 next-auth session
- 🔄 扩展 next-auth callbacks
- 🚦 获取验证码限制请求数
- 🕰️ 限制时间内倒计时

## 环境变量

| 变量名               | 备注                                                                         | 示例                                                   |
| -------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| DATABASE_URL         | postgresql 数据库地址                                                        | postgresql://user:password@xxx.com/xxx?sslmode=require |
| GITHUB_CLIENT_ID     | Github OAuth                                                                 |                                                        |
| GITHUB_CLIENT_SECRET | Github OAuth                                                                 |                                                        |
| GOOGLE_CLIENT_ID     | Google OAuth                                                                 |                                                        |
| GOOGLE_CLIENT_SECRET | Google OAuth                                                                 |                                                        |
| RESEND_API_KEY       | resend 邮件验证 APi                                                          |                                                        |
| NEXT_PUBLIC_APP_URL  | 域名，邮件验证用                                                             | http://localhost:3001                                  |
| AUTH_SECRET          | [generate-secret.vercel.app](https://generate-secret.vercel.app/32) 在线生成 | 264787eff676bdab14a3bb3bdfb7861b                       |
| FROM_EMAIL           | 发件人，需通过域名验证才能发给其他邮件地址                                   | "Auth <notifications@email.xxx.com>"                   |
| DEV_NOT_SEND_MAIL    | （可选），有此变量则不发送邮件，开发模式调试用                               |
