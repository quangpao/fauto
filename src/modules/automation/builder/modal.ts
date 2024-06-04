import { ModalBuilder } from "discord.js";
import { CaptionActionRow, CreditActionRow, PageApiKeyActionRow } from ".";

export const PostImageModal = new ModalBuilder()
  .setCustomId("postImageModal")
  .setTitle("Input the information")
  .addComponents(CaptionActionRow, CreditActionRow);

export const CreatePageModal = new ModalBuilder()
  .setCustomId("createPageModal")
  .setTitle("FAuto - Create Page")
  .addComponents(PageApiKeyActionRow);
