/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ROUTE_AUTH_LOGIN: '/auth/login',
    ROUTE_AUTH_REGISTER: '/auth/register',
    ROUTE_AUTH_ERROR: '/auth/error',
    ROUTE_AUTH_NEW_VERIFICATION: '/auth/new-verification',
    ROUTE_AUTH_RESET: '/auth/reset',
  },
};

export default nextConfig;
