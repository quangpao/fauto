import { EmbedBuilder } from "discord.js";
import { Colors } from "../constant";

export const InputConfirmEmbed = (type: string, url: string) =>
  new EmbedBuilder()
    .setColor(Colors.Preview)
    .setTitle("Preview your input")
    .setDescription("Please choose the next action")
    .setImage(url)
    .addFields({ name: "Type", value: type, inline: true });
