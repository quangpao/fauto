export enum Environment {
  Development = "dev",
  Production = "prod",
  Local = "local",
  Test = "test",
}

export interface Config {
  env: Environment;
  db: DBConfig;
  discord: DiscordConfig;
  fileSystem?: FileSystemConfig;
}

export interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
}

export interface DiscordConfig {
  tokenID: string;
  clientID: string;
}

export interface ProcessVariables extends NodeJS.ProcessEnv {
  APP_ENV: Environment;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_HOST: string;
  DB_PORT: number;
  TOKEN_ID: string;
  CLIENT_ID: string;
}
