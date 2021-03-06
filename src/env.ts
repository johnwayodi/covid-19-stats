export enum EnvType {
  Local = 'local',
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

interface ServerConfig {
  apiUrl: string;
}

const serverEnvironments: {
  local: ServerConfig;
  staging: ServerConfig;
  development: ServerConfig;
  production: ServerConfig;
} = {
  [EnvType.Local]: {
    apiUrl: 'https://api.covid19api.com',
  },
  [EnvType.Development]: {
    apiUrl: 'https://api.covid19api.com',
  },
  [EnvType.Staging]: {
    apiUrl: 'https://api.covid19api.com',
  },
  [EnvType.Production]: {
    apiUrl: 'https://api.covid19api.com',
  },
};

// Node process env variable
export const Env: EnvType = process.env.NODE_ENV as EnvType;

// Node process.env.REACT_APP_BUILD
export const BuildEnv = process.env.REACT_APP_BUILD;

// Env is development
export const __DEV__: boolean = Env === EnvType.Development || BuildEnv === EnvType.Development;

// Env is staging
export const __STAG__: boolean = BuildEnv === EnvType.Staging;

// Env is production
export const __PROD__: boolean = Env === EnvType.Production;

// Server env variables function
export const ServerEnv = () => {
  if (process.env.REACT_APP_BUILD === EnvType.Production) {
    // For production build
    return serverEnvironments[EnvType.Production];
  }

  if (process.env.REACT_APP_BUILD === EnvType.Staging) {
    // For staging build
    return serverEnvironments[EnvType.Staging];
  }

  if (process.env.REACT_APP_BUILD === EnvType.Development) {
    // For development build
    return serverEnvironments[EnvType.Development];
  }

  // In all other cases return local environment config
  return serverEnvironments[EnvType.Local];
};
