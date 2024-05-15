import type { StringSelectMenu } from "@core/types";
import { PostDoneEmbed, ScheduleSelectMenu } from "@modules/automation/builder";
import type { Post } from "@prisma/client";
import { extractEmbed } from "@shared/utils";

export const command: StringSelectMenu = {
  builder: ScheduleSelectMenu(),
  async execute(interaction, client) {
    const oldEmbed = interaction.message.embeds[0];
    const extracted = extractEmbed(oldEmbed);
    const scheduled = interaction.values[0];

    await interaction.update({
      content: "[FAuto] Uploading your photo...",
      embeds: [],
      components: [],
    });
    const postResult = (await client?.autoService.postImage({
      pageId: extracted["id"],
      caption: extracted["caption"],
      postType: extracted["postType"].toUpperCase(),
      published: false,
      url: oldEmbed.image?.url as string,
      scheduledPublishTime: Math.floor(+scheduled),
    })) as Post;

    return await interaction.editReply({
      content: null,
      components: [],
      embeds: [PostDoneEmbed(postResult, oldEmbed.image?.url as string)],
    });
  },
};
