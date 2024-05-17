import { Embed, EmbedBuilder } from "discord.js";
import { Colors } from "@modules/automation/constant";
import {
  isPostPreviewEmbedType,
  isUpdatePostPreviewEmbedType,
  type PostPreviewEmbedType,
  type UpdatePostPreviewEmbedType,
} from "@modules/automation/type";
import type { Post } from "@prisma/client";
import { DateTime } from "luxon";
import { DATE_FORMAT, TZ } from "@core/constants";

export const PostPreviewEmbed = (
  params: PostPreviewEmbedType | UpdatePostPreviewEmbedType,
  oldEmbed?: Embed,
) => {
  if (isPostPreviewEmbedType(params)) {
    return new EmbedBuilder()
      .setColor(Colors.Preview)
      .setTitle(params.title)
      .setDescription(params.description)
      .setImage(params.url)
      .setFields({
        name: "postType",
        value: params.type,
        inline: true,
      });
  } else if (isUpdatePostPreviewEmbedType(params) && oldEmbed) {
    const embed = EmbedBuilder.from(oldEmbed)
      .setColor(params.color || oldEmbed.data.color || Colors.Preview)
      .setTitle(params.title || oldEmbed.data.title || "")
      .setDescription(params.description || oldEmbed.data.description || "");

    if (params.page) {
      embed.addFields({
        name: "page",
        value: params.page.pageName,
        inline: true,
      });
      embed.addFields({ name: "id", value: params.page.pageId, inline: true });
    }

    if (params.caption) {
      embed.addFields({ name: "caption", value: params.caption });
    }
    if (params.time) {
      embed.addFields({ name: "timestamp", value: params.time });
    }

    return embed;
  } else throw new Error("[PostPreviewEmbed] Invalid Parameter");
};

export const PostDoneEmbed = (post: Post, url: string) =>
  new EmbedBuilder()
    .setTitle("[FAuto] Post has been published/scheduled")
    .setColor(Colors.Submit)
    .setImage(url)
    .setTimestamp()
    .addFields(
      {
        name: "Link:",
        value: post.postUrl,
      },
      {
        name: "Schedule:",
        value: DateTime.fromSeconds(post.scheduled)
          .setZone(TZ)
          .toFormat(DATE_FORMAT),
      },
    );

export const AdminSettingsEmbed = new EmbedBuilder()
  .setAuthor({
    name: "Kun",
    url: "https://facebook.com/quangpou",
    iconURL:
      "https://cdn.discordapp.com/attachments/1061689974057095268/1240935060803289179/407197258_364647035946569_7346774278956793541_n.png?ex=66485e55&is=66470cd5&hm=55cd4d14da021d1485cbee611a9eefe0b4b231c0eea19eed7866e15ec764bdbe&",
  })
  .setTitle("[F-Auto] Admin Settings - General")
  .addFields(
    {
      name: "● 𝐅𝐂𝐡𝐚𝐧𝐧𝐞𝐥",
      value: "⤷ Manage the **listener channel** whitelist of the bot",
      inline: false,
    },
    {
      name: "● 𝐅𝐔𝐬𝐞𝐫",
      value: "⤷ Manage the **user** whitelist to access the bot",
      inline: false,
    },
    {
      name: "● 𝐅𝐏𝐚𝐠𝐞",
      value:
        "⤷ Manage the **\u001dfacebook \u001dpages** can be access via the bot",
      inline: false,
    },
  );
