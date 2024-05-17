import { ModalBuilder } from "discord.js";
import { CaptionActionRow, CreditActionRow } from ".";

export const PostImageModal = new ModalBuilder()
  .setCustomId("postImageModal")
  .setTitle("Input the information")
  .addComponents(CaptionActionRow, CreditActionRow);
