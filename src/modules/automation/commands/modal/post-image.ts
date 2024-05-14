import type { ModalSubmit } from "@core/types";
import {
  PostImageModal,
  PostPreviewEmbed,
  ScheduleRow,
} from "@modules/automation/builder";

export const command: ModalSubmit = {
  builder: PostImageModal,
  async execute(interaction) {
    if (!interaction.isFromMessage()) return;
    const oldEmbed = interaction.message?.embeds[0];
    const fields = interaction.fields;

    const caption = `${fields.getTextInputValue("captionInput")}\nCre: ${fields.getTextInputValue("creditInput")}\n————————\n#vtmeyes`;
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
