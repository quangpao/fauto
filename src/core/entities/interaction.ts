import type { ButtonInteraction, Interaction } from "discord.js";
import type { FClient } from "./client";

export class FInteraction {
  static async execute(client: FClient, interaction: Interaction) {
    if (interaction.isButton()) {
      this.execButtonInteraction(client, interaction);
    }
  }

  private static async execButtonInteraction(
    client: FClient,
    interaction: ButtonInteraction,
  ) {
    console.log(interaction.message.embeds);
  }
}
