import type { ButtonCommand } from "@core/types";
import { ScheduleButton } from "@modules/automation/builder";

export const command: ButtonCommand = {
  builder: ScheduleButton,
  async execute(interaction) {
    const embeds = interaction.message.embeds[0];
    if (!embeds) {
      await interaction.reply({
        content: "Some thing weird happened, please contact the Admin",
      });
      return;
    }

    // return await interaction.update({
    //   components: [ScheduleSelectMenuRow()],
    // });
  },
};
