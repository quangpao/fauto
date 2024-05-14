import { Collection } from "discord.js";
import type { FClient } from "./client";
import { readdirSync } from "node:fs";
import type {
  ButtonCommand,
  SlashCommand,
  ModalSubmit,
  SelectMenu,
} from "@core/types";

export default class FCommands {
  public slash: Collection<string, SlashCommand>;
  public button: Collection<string, ButtonCommand>;
  public modal: Collection<string, ModalSubmit>;
  public menu: Collection<string, SelectMenu>;

  constructor() {
    this.slash = new Collection<string, SlashCommand>();
    this.button = new Collection<string, ButtonCommand>();
    this.modal = new Collection<string, ModalSubmit>();
    this.menu = new Collection<string, SelectMenu>();
  }

  /**
   * Read folder `registers` to load all the command
   */
  public async register(client: FClient) {
    const files = readdirSync("./src/core/registers", {
      withFileTypes: true,
    }).filter((file) => file.isFile() && file.name.includes("register"));

    for (const file of files) {
      const { default: register } = await import(
        `@core/registers/${file.name}`
      );

      await register(client);
    }
  }
}
