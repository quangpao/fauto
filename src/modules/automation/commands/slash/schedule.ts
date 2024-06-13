import type { SlashCommand } from "@core/types";
import { ScheduleSlashBuilder } from "@modules/automation/builder";

export const command: SlashCommand = {
  builder: ScheduleSlashBuilder,
  async execute(interaction, client) {
    if (interaction.user.id !== "283502903958700032")
      return await interaction.reply({
        content: "You don't have enough permission to execute the command",
        ephemeral: true,
      });

    client?.updateOptions({ autoSchedule: !client?.fOptions.autoSchedule });
    if (client?.fOptions.autoSchedule) {
      await interaction.reply("The auto-schedule has been enabled ✅");
    } else {
      await interaction.reply("The auto-schedule has been disabled ❌");
    }
  },
};
