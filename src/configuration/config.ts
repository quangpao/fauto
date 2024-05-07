import type { ProcessVariables, Config } from "@core/types";

const processVariables = process.env as ProcessVariables;

export const config: Config = {
  env: processVariables.APP_ENV,
  discord: {
    tokenID: processVariables.TOKEN_ID,
    clientID: processVariables.CLIENT_ID,
  },
};
