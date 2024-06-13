import type { ButtonCommand } from "@core/types";
import { PostDoneEmbed } from "@modules/automation/builder";
import { PostButton } from "@modules/automation/builder/button";
import type { Post } from "@prisma/client";
import { extractEmbed } from "@shared/utils";
import { DateTime } from "luxon";

export const command: ButtonCommand = {
  builder: PostButton,

  async execute(interaction, client) {
    const oldEmbed = interaction.message.embeds[0];
    const extracted = extractEmbed(oldEmbed);

    await interaction.update({
      content: "[FAuto] Uploading your photo...",
      embeds: [],
      components: [],
    });
    const postResult = (await client?.autoService.postImage({
      pageId: extracted["id"],
      caption: extracted["caption"],
      postType: extracted["postType"].toUpperCase(),
      published: true,
      url: oldEmbed.image?.url as string,
      scheduledPublishTime: DateTime.now().toSeconds(),
      idealScheduled: -1,
    })) as Post;

    return await interaction.editReply({
      content: null,
      components: [],
      embeds: [PostDoneEmbed(postResult, oldEmbed.image?.url as string)],
    });
  },
};
