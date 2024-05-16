import type { ButtonCommand } from "@core/types";
import {
  PostPreviewEmbed,
  ScheduleRow,
  SkipCaptionButton,
} from "@modules/automation/builder";

export const command: ButtonCommand = {
  builder: SkipCaptionButton,
  async execute(interaction) {
    const oldEmbed = interaction.message?.embeds[0];

    const caption = `Linh ta linh tinh\nCre: Internet\n————————\n#vtmeyes`;
    const embed = PostPreviewEmbed(
      {
        caption,
        title: "[FAuto] Update post caption",
      },
      oldEmbed,
    );

    return await interaction.update({
      embeds: [embed],
      components: [ScheduleRow],
    });
  },
};
