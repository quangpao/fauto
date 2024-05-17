/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Interaction,
  ModalSubmitInteraction,
} from "discord.js";
import type { FClient } from "./client";
import { logger } from "@shared/logger";

export class FInteraction {
  static async execute(client: FClient, interaction: Interaction) {
    try {
      if (interaction.isButton()) {
        this.execButtonInteraction(client, interaction);
      }
      if (interaction.isModalSubmit()) {
        this.execModalSubmitInteraction(client, interaction);
      }
      if (interaction.isAnySelectMenu()) {
        this.execSelectMenuInteraction(client, interaction);
      }
      if (interaction.isChatInputCommand()) {
        this.execChatInputInteraction(client, interaction);
      }
    } catch (error: any) {
      logger.error(error);
      if (interaction.isRepliable())
        interaction.reply({
          content: error.message,
          embeds: [],
          components: [],
        });
    }
  }

  private static async execButtonInteraction(
    client: FClient,
    interaction: ButtonInteraction,
  ) {
    const button = client.commands.button.get(interaction.customId);
    if (!button) return;

    await button.execute(interaction, client);
  }

  private static async execModalSubmitInteraction(
    client: FClient,
    interaction: ModalSubmitInteraction,
  ) {
    const modalSubmit = client.commands.modal.get(interaction.customId);
    if (!modalSubmit) return;

    await modalSubmit.execute(interaction, client);
  }

  private static async execSelectMenuInteraction(
    client: FClient,
    interaction: AnySelectMenuInteraction,
  ) {
    const selectMenu = client.commands.menu.get(interaction.customId);
    if (!selectMenu) return;

    await selectMenu.execute(interaction, client);
  }

  private static async execChatInputInteraction(
    client: FClient,
    interaction: ChatInputCommandInteraction,
  ) {
    const slash = client.commands.slash.get(interaction.commandName);
    if (!slash) return;

    await slash.execute(interaction, client);
  }
}
