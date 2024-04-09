/**
 * 公共页面
 * @type {string[]}
 */
export const publicRoutes = ['/', '/test-public'];

/**
 * 用来登录注册的页面
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register'];

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
