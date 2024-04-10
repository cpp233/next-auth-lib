import {
  ROUTE_AUTH_ERROR,
  ROUTE_AUTH_LOGIN,
  ROUTE_AUTH_NEW_VERIFICATION,
  ROUTE_AUTH_REGISTER,
  ROUTE_AUTH_RESET,
} from '@/lib/getEnv';

/**
 * 公共页面
 * @type {string[]}
 */
export const publicRoutes = ['/', '/test-public', ROUTE_AUTH_NEW_VERIFICATION];

/**
 * 用来登录注册的页面
 * @type {string[]}
 */
export const authRoutes = [
  ROUTE_AUTH_LOGIN,
  ROUTE_AUTH_REGISTER,
  ROUTE_AUTH_ERROR,
  ROUTE_AUTH_RESET,
];

/**
 * 用来登录注册的 api 接口
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * 登录后重定向的路由
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
