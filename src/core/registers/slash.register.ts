import type { FClient } from "@core/entities/client";
import { logger } from "@shared/logger";
import { readdirSync, existsSync } from "node:fs";

/**
 * Load slash commands to `this.client.commands.modal` Collection
 */
export default async (client: FClient) => {
  logger.info("[FAuto] Loading slash commands...");
  const folders = readdirSync("./src/modules", { withFileTypes: true }).filter(
    (folder) => folder.isDirectory(),
  );

  for (const folder of folders) {
    if (!existsSync(`./src/modules/${folder.name}/commands/slash`)) continue;

    const files = readdirSync(`./src/modules/${folder.name}/commands/slash`, {
      withFileTypes: true,
    }).filter((file) => file.isFile() && file.name.endsWith(".ts"));

    for (const file of files) {
      const { command } = await import(
        `@modules/${folder.name}/commands/slash/${file.name}`
      );
      client.commands.slash.set(command.builder.name, command);
      logger.info(`*** ${command.builder.name}`);
    }
  }
};
