import { Embed, EmbedBuilder } from "discord.js";
import { Colors } from "@modules/automation/constant";
import {
  isPostPreviewEmbedType,
  isUpdatePostPreviewEmbedType,
  type PostPreviewEmbedType,
  type UpdatePostPreviewEmbedType,
} from "@modules/automation/param";

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
        name: "Post Type:",
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
        name: "Page:",
        value: params.page.pageName,
        inline: true,
      });
      embed.addFields({ name: "Id:", value: params.page.pageId, inline: true });
    }

    if (params.caption) {
      embed.addFields({ name: "Caption:", value: params.caption });
    }
    if (params.time) {
      embed.addFields({ name: "Timestamp:", value: params.time });
    }

    return embed;
  } else throw new Error("[PostPreviewEmbed] Invalid Parameter");
};
