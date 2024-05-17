import type { SlashCommand } from "@core/types";
import {
  AdminOptionSelectMenuRow,
  AdminSettingsEmbed,
  FAutoSlashBuilder,
} from "@modules/automation/builder";
import { AdminOption } from "@modules/automation/type";

export const command: SlashCommand = {
  builder: FAutoSlashBuilder,
  async execute(interaction) {
    if (interaction.user.id !== "283502903958700032")
      return await interaction.reply({
        content: "You don't have enough permission to execute the command",
        ephemeral: true,
      });

    return await interaction.reply({
      embeds: [AdminSettingsEmbed],
      components: [AdminOptionSelectMenuRow(AdminOption.None)],
    });
  },
};
