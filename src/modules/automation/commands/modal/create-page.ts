import type { ModalSubmit } from "@core/types";
import {
  CreatePageActionRow,
  CreatePageModal,
  PageInfoEmbed,
} from "@modules/automation/builder";
import FApi from "@modules/facebook/api";
import ApiKey from "@modules/prisma/apikey";
import Page from "@modules/prisma/page";
import { logger } from "@shared/logger";
import { ComponentType } from "discord.js";

export const command: ModalSubmit = {
  builder: CreatePageModal,
  async execute(interaction, client) {
    if (!interaction.isFromMessage()) return;
    const fields = interaction.fields;
    const apiKey = fields.getTextInputValue("apiKeyInput");

    const pageInfo = await FApi.info(apiKey);
    if (!pageInfo) return;

    const response = await interaction.update({
      embeds: [PageInfoEmbed(pageInfo)],
      components: [CreatePageActionRow],
    });
    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter: (i) => i.user.id === interaction.user.id,
      max: 1,
      time: 360_000,
    });
    collector.on("end", async (collection) => {
      if (!collection.hasAny())
        await interaction.editReply(
          "This session is ended, please start a new one!",
        );
      else {
        try {
          await Page.create(pageInfo);
          const key = await ApiKey.create(apiKey, pageInfo.id);
          client?.autoService.addApi(key);

          await interaction.editReply({
            content: "The page has been hooked to the [F-Auto]",
            components: [],
          });
        } catch (error) {
          logger.error(`Create Page Error: `, error);
          await interaction.editReply(
            "An error occurred, please contact the admin",
          );
        }
      }
    });
  },
};
