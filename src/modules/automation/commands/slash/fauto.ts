import type { SlashCommand } from "@core/types";
import {
  AdminActionSelectMenuRow,
  AdminOptionSelectMenuRow,
  AdminSettingsEmbed,
  FAutoSlashBuilder,
} from "@modules/automation/builder";
import {
  AdminAction,
  AdminOption,
  isAdminAction,
  isAdminOption,
} from "@modules/automation/type";
import { ComponentType, StringSelectMenuInteraction } from "discord.js";
import { FAutoSelect } from "../menu/fauto-select";

export const command: SlashCommand = {
  builder: FAutoSlashBuilder,
  async execute(interaction) {
    if (interaction.user.id !== "283502903958700032")
      return await interaction.reply({
        content: "You don't have enough permission to execute the command",
        ephemeral: true,
      });

    const CollectOption = {
      option: AdminOption.None,
      action: AdminAction.None,
      interaction: null as unknown as StringSelectMenuInteraction,
    };

    const response = await interaction.reply({
      embeds: [AdminSettingsEmbed],
      components: [AdminOptionSelectMenuRow(CollectOption.option)],
    });

    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      filter: (i) => i.user.id === interaction.user.id,
      max: 2,
      time: 60_000,
    });

    collector.on("collect", async (i) => {
      if (isAdminOption(i.values[0])) {
        CollectOption.option = i.values[0];
        await i.update({
          components: [
            AdminOptionSelectMenuRow(CollectOption.option),
            AdminActionSelectMenuRow(CollectOption.action),
          ],
        });
      } else if (isAdminAction(i.values[0])) {
        CollectOption.action = i.values[0];
        CollectOption.interaction = i;
      }
    });
    collector.on("end", async () => {
      if (
        CollectOption.action === AdminAction.None ||
        CollectOption.option === AdminOption.None ||
        !CollectOption.interaction
      ) {
        await interaction.editReply({ components: [] });
        return;
      }
      await FAutoSelect.handle(CollectOption);
    });
  },
};
