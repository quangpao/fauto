import { FClient } from "@core/entities/client";
import { logger } from "@shared/logger";
import { readdirSync, existsSync } from "node:fs";

/**
 * Load select menu commands to `this.client.commands.menu` Collection
 */
export default async (client: FClient) => {
  logger.info("[FAuto] Loading menu select commands...");
  const folders = readdirSync("./src/modules", { withFileTypes: true }).filter(
    (folder) => folder.isDirectory(),
  );

  for (const folder of folders) {
    if (!existsSync(`./src/modules/${folder.name}/commands/menu`)) continue;

    const files = readdirSync(`./src/modules/${folder.name}/commands/menu`, {
      withFileTypes: true,
    }).filter((file) => file.isFile() && file.name.endsWith(".ts"));

    for (const file of files) {
      const { command } = await import(
        `@modules/${folder.name}/commands/menu/${file.name}`
      );
      if (!command || !command.builder) continue;
      client.commands?.menu.set(command.builder.data.custom_id, command);
      logger.info(`*** ${command.builder.data.custom_id}`);
    }
  }
};
