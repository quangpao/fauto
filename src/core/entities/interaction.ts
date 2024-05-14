import type {
  AnySelectMenuInteraction,
  ButtonInteraction,
  Interaction,
  ModalSubmitInteraction,
} from "discord.js";
import type { FClient } from "./client";

export class FInteraction {
  static async execute(client: FClient, interaction: Interaction) {
    if (interaction.isButton()) {
      this.execButtonInteraction(client, interaction);
    }
    if (interaction.isModalSubmit()) {
      this.execModalSubmitInteraction(client, interaction);
    }
    if (interaction.isAnySelectMenu()) {
      this.execSelectMenuInteraction(client, interaction);
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
}
