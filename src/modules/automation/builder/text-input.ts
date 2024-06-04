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

export const PageIdTxtInput = new TextInputBuilder()
  .setCustomId("pageIdInput")
  .setLabel("Facebook Page ID:")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);

export const PageNameTxtInput = new TextInputBuilder()
  .setCustomId("pageNameInput")
  .setLabel("Facebook Page Name:")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);

export const PageUsernameTxtInput = new TextInputBuilder()
  .setCustomId("pageUsernameInput")
  .setLabel("Facebook Page Username:")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);

export const PageApiKeyTxtInput = new TextInputBuilder()
  .setCustomId("apiKeyInput")
  .setLabel("Api Key:")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);
