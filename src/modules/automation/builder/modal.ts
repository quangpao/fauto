import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  type ModalActionRowComponentBuilder as M,
} from "discord.js";

const captionInput = new TextInputBuilder()
  .setCustomId("captionInput")
  .setLabel("What is the caption?")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Some randomly caption")
  .setValue("Linh ta linh tinh");

const creditInput = new TextInputBuilder()
  .setCustomId("creditInput")
  .setLabel("Where is the source?")
  .setStyle(TextInputStyle.Short)
  .setPlaceholder("Internet")
  .setValue("Internet");

const captionActionRow = new ActionRowBuilder<M>().addComponents(captionInput);
const creditActionRow = new ActionRowBuilder<M>().addComponents(creditInput);

export const PostImageModal = new ModalBuilder()
  .setCustomId("postImageModal")
  .setTitle("Input the information")
  .addComponents(captionActionRow, creditActionRow);
