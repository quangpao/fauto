import type { ButtonCommand } from "@core/types";
import { PostButton } from "@modules/automation/builder/button";

export const command: ButtonCommand = {
  builder: PostButton,

  async execute(interaction) {
    const embeds = interaction.message.embeds[0];
    console.log(embeds);
  },
};
