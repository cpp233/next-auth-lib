const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const ROUTE_AUTH_LOGIN = process.env.ROUTE_AUTH_LOGIN;
const ROUTE_AUTH_REGISTER = process.env.ROUTE_AUTH_REGISTER;
const ROUTE_AUTH_ERROR = process.env.ROUTE_AUTH_ERROR;
const ROUTE_AUTH_NEW_VERIFICATION = process.env.ROUTE_AUTH_NEW_VERIFICATION;
const ROUTE_AUTH_RESET = process.env.ROUTE_AUTH_RESET;
const ROUTE_AUTH_NEW_PASSWORK = process.env.ROUTE_AUTH_NEW_PASSWORK;

export {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  RESEND_API_KEY,
  // 路由
  ROUTE_AUTH_LOGIN,
  ROUTE_AUTH_REGISTER,
  ROUTE_AUTH_ERROR,
  ROUTE_AUTH_NEW_VERIFICATION,
  ROUTE_AUTH_RESET,
  ROUTE_AUTH_NEW_PASSWORK,
};
