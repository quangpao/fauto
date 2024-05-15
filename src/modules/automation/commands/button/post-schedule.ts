import type { ButtonCommand } from "@core/types";
import {
  ScheduleButton,
  ScheduleSelectMenuRow,
} from "@modules/automation/builder";
import Post from "@modules/prisma/post";
import { extractEmbed } from "@shared/utils";
import { EmbedBuilder } from "discord.js";
import { DateTime } from "luxon";

export const command: ButtonCommand = {
  builder: ScheduleButton,
  async execute(interaction) {
    const oldEmbed = interaction.message.embeds[0];
    const extracted = extractEmbed(oldEmbed);

    await interaction.update({
      embeds: [EmbedBuilder.from(oldEmbed)],
    });
    const post = await Post.getLatest(extracted["id"]);
    const lastTimestamp =
      post?.scheduled && post.scheduled > DateTime.now().toSeconds()
        ? post.scheduled
        : DateTime.now().toSeconds();
    return await interaction.editReply({
      components: [ScheduleSelectMenuRow(lastTimestamp)],
    });
  },
};
