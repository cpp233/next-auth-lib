declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // 继续在这里添加更多的环境变量
    }
  }
}

declare module NodeJS {
  export interface ProcessEnv {
    // 继续在这里添加更多的环境变量
    ROUTE_AUTH_LOGIN: string;
    ROUTE_AUTH_REGISTER: string;
    ROUTE_AUTH_ERROR: string;
    ROUTE_AUTH_NEW_VERIFICATION: string;
    ROUTE_AUTH_RESET: string;
    ROUTE_AUTH_NEW_PASSWORK: string;
  }
}
