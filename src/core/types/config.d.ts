export enum Environment {
  Development = "dev",
  Production = "prod",
  Local = "local",
  Test = "test",
}

export interface Config {
  env: Environment;
  fbConfig: FacebookConfig;
  discord: DiscordConfig;
}

export interface FacebookConfig {
  clientID: string;
  secretID: string;
  userID: string;
}

export interface DiscordConfig {
  tokenID: string;
  clientID: string;
}

export interface ProcessVariables extends NodeJS.ProcessEnv {
  APP_ENV: Environment;
  TOKEN_ID: string;
  CLIENT_ID: string;
  FACEBOOK_CLIENT_ID: string;
  FACEBOOK_CLIENT_SECRET: string;
  FACEBOOK_USER_ID: string;
}
