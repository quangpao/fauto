import type { ButtonCommand } from "@core/types";
import { AddCaptionButton, PostImageModal } from "@modules/automation/builder";

export const command: ButtonCommand = {
  builder: AddCaptionButton,
  async execute(interaction) {
    const embeds = interaction.message.embeds[0];
    if (!embeds) {
      await interaction.reply({
        content: "Some thing weird happened, please contact the Admin",
      });
      return;
    }

    return await interaction.showModal(PostImageModal);
  },
};
