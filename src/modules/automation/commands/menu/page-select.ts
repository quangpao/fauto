import type { StringSelectMenu } from "@core/types";
import {
  CaptionRow,
  PageSelectMenu,
  PostPreviewEmbed,
} from "@modules/automation/builder";
import Page from "@modules/prisma/page";

export const command: StringSelectMenu = {
  builder: PageSelectMenu(),
  async execute(interaction) {
    const oldEmbed = interaction.message.embeds[0];
    const page = await Page.getOne(interaction.values[0]);
    if (!page)
      return interaction.reply({
        content: "Page selected is invalid, please try again!",
        ephemeral: true,
      });
    const embed = PostPreviewEmbed(
      { page, title: "[FAuto] Updated post page target" },
      oldEmbed,
    );

    return interaction.update({
      embeds: [embed],
      components: [CaptionRow],
    });
  },
};
