import { FClient } from "@core/entities/client";
import { logger } from "@shared/logger";
import { readdirSync, existsSync } from "node:fs";

/**
 * Load modal commands to `this.client.commands.modal` Collection
 */
export default async (client: FClient) => {
  const folders = readdirSync("./src/modules", { withFileTypes: true }).filter(
    (folder) => folder.isDirectory(),
  );

  for (const folder of folders) {
    if (!existsSync(`./src/modules/${folder.name}/commands/modal`)) continue;

    const files = readdirSync(`./src/modules/${folder.name}/commands/modal`, {
      withFileTypes: true,
    }).filter((file) => file.isFile() && file.name.endsWith(".ts"));

    for (const file of files) {
      const { command } = await import(
        `@modules/${folder.name}/commands/modal/${file.name}`
      );
      client.commands?.modal.set(command.builder.data.custom_id, command);
      logger.info(`*** ${command.builder.data.custom_id}`);
    }
  }
};
