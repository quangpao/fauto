import { TextInputBuilder, TextInputStyle } from "discord.js";

export const CaptionTxtInput = new TextInputBuilder()
  .setCustomId("captionInput")
  .setLabel("What is the caption?")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Some randomly caption");

export const CreditTxtInput = new TextInputBuilder()
  .setCustomId("creditInput")
  .setLabel("Where is the source?")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Internet");
