import { ButtonBuilder, ButtonStyle } from "discord.js";

export const PostButton = new ButtonBuilder()
  .setCustomId("postButton")
  .setLabel("Post Now")
  .setStyle(ButtonStyle.Success);

export const ScheduleButton = new ButtonBuilder()
  .setCustomId("scheduleButton")
  .setLabel("Schedule")
  .setStyle(ButtonStyle.Primary);

export const AddCaptionButton = new ButtonBuilder()
  .setCustomId("addCaptionButton")
  .setLabel("Add Caption")
  .setStyle(ButtonStyle.Success);

export const SkipCaptionButton = new ButtonBuilder()
  .setCustomId("skipCaptionButton")
  .setLabel("Skip Caption")
  .setStyle(ButtonStyle.Danger);
