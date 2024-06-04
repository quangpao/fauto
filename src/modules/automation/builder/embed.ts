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
import { AuthorOptions, DATE_FORMAT, LOCALE, TZ } from "@core/constants";

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
          .setLocale(LOCALE)
          .toFormat(DATE_FORMAT),
      },
      {
        name: "Caption:",
        value: post.message || "",
      },
    );

export const AdminSettingsEmbed = new EmbedBuilder()
  .setAuthor(AuthorOptions)
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
