import type { ModalSubmit } from "@core/types";
import {
  PostDoneEmbed,
  PostImageModal,
  PostPreviewEmbed,
  ScheduleRow,
} from "@modules/automation/builder";
import Post from "@modules/prisma/post";
import { extractEmbed } from "@shared/utils";
import { DateTime } from "luxon";

export const command: ModalSubmit = {
  builder: PostImageModal,
  async execute(interaction, client) {
    if (!interaction.isFromMessage()) return;
    const oldEmbed = interaction.message?.embeds[0];
    const fields = interaction.fields;

    const caption = `${fields.getTextInputValue("captionInput")}\n\nCre: ${fields.getTextInputValue("creditInput")}\n————————\n#vtmeyes`;

    if (client?.fOptions.autoSchedule) {
      const extracted = extractEmbed(oldEmbed);

      await interaction.update({
        content: "[FAuto] Uploading your photo with auto-schedule...",
        embeds: [],
        components: [],
      });

      const latestPost = await Post.getLatest(extracted["id"]);
      let currentTime = DateTime.now();
      let oldIdealSchedule: number = latestPost?.idealScheduled || -1;
      let idealSchedule: number;
      let actualSchedule: number;
      if (latestPost && latestPost.scheduled >= currentTime.toSeconds()) {
        const oldScheduled = DateTime.fromSeconds(latestPost.scheduled);
        if (oldIdealSchedule === -1) {
          if (oldScheduled.hour < 11) {
            oldIdealSchedule = 2;
          } else if (oldScheduled.hour > 12) {
            oldIdealSchedule = 1;
          } else {
            oldIdealSchedule = 0;
          }
        }
        idealSchedule = (oldIdealSchedule + 1) % 3;
        actualSchedule = oldScheduled
          .set({ minute: 0, second: 0 })
          .plus({ hours: 4 * (idealSchedule + 1) })
          .plus({ seconds: Math.floor(Math.random() * 3600) })
          .toSeconds();
      } else {
        currentTime = currentTime.plus({ minutes: 20 });
        let isNewDay = false;
        if (currentTime.hour < 11) {
          oldIdealSchedule = 0;
        } else if (currentTime.hour > 12) {
          oldIdealSchedule = 2;
          isNewDay = true;
        } else {
          oldIdealSchedule = 1;
        }
        const fakeIdealSchedule = (oldIdealSchedule + 1) % 3;
        idealSchedule = oldIdealSchedule;
        actualSchedule = currentTime
          .set({
            hour: 7 + 4 * (fakeIdealSchedule + (oldIdealSchedule % 2)),
            minute: 0,
            second: 0,
          })
          .plus({ days: isNewDay ? 1 : 0 })
          .plus({ seconds: Math.floor(Math.random() * 3600) })
          .toSeconds();
      }

      const postResult = await client?.autoService.postImage({
        pageId: extracted["id"],
        caption: caption,
        postType: extracted["postType"].toUpperCase(),
        published: true,
        url: oldEmbed.image?.url as string,
        scheduledPublishTime: actualSchedule,
        idealScheduled: idealSchedule,
      });

      return await interaction.editReply({
        content: null,
        components: [],
        embeds: [PostDoneEmbed(postResult, oldEmbed.image?.url as string)],
      });
    } else {
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
    }
  },
};
