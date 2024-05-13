import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type MessageActionRowComponentBuilder as M,
} from "discord.js";

const post = new ButtonBuilder()
  .setCustomId("postButton")
  .setLabel("Post Now")
  .setStyle(ButtonStyle.Success);

const schedule = new ButtonBuilder()
  .setCustomId("scheduleButton")
  .setLabel("Schedule")
  .setStyle(ButtonStyle.Primary);

export const ScheduleRow = new ActionRowBuilder<M>().addComponents(
  post,
  schedule,
);
