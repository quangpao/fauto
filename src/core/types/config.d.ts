export enum Environment {
  Development = "dev",
  Production = "prod",
  Local = "local",
  Test = "test",
}

export interface Config {
  env: Environment;
  discord: DiscordConfig;
  fileSystem?: FileSystemConfig;
}

export interface DiscordConfig {
  tokenID: string;
  clientID: string;
}

export interface ProcessVariables extends NodeJS.ProcessEnv {
  APP_ENV: Environment;
  TOKEN_ID: string;
  CLIENT_ID: string;
}
