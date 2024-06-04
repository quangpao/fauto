import { CreatePageModal } from "@modules/automation/builder";
import {
  AdminAction,
  AdminOption,
  type CollectOption,
} from "@modules/automation/type";
import type { StringSelectMenuInteraction as SSMInteraction } from "discord.js";

export class FAutoSelect {
  public static async handle({ option, action, interaction }: CollectOption) {
    switch (option) {
      case AdminOption.Channel:
        await this.handleChannel(action, interaction);
        break;
      case AdminOption.User:
        await this.handleUser(action, interaction);
        break;
      case AdminOption.Page:
        await this.handlePage(action, interaction);
        break;
    }
  }

  private static async handleChannel(
    action: AdminAction,
    interaction: SSMInteraction,
  ) {
    switch (action) {
      case AdminAction.Create:
      case AdminAction.Update:
      case AdminAction.Delete:
      case AdminAction.List:
      default:
        await this.defaultFallback(interaction);
    }
  }

  private static async handleUser(
    action: AdminAction,
    interaction: SSMInteraction,
  ) {
    switch (action) {
      case AdminAction.Create:
      case AdminAction.Update:
      case AdminAction.Delete:
      case AdminAction.List:
      default:
        await this.defaultFallback(interaction);
    }
  }

  private static async handlePage(
    action: AdminAction,
    interaction: SSMInteraction,
  ) {
    switch (action) {
      case AdminAction.Create:
        await interaction.showModal(CreatePageModal);
        break;
      case AdminAction.Update:
      case AdminAction.Delete:
      case AdminAction.List:
      default:
        await this.defaultFallback(interaction);
    }
  }

  private static async defaultFallback(interaction: SSMInteraction) {
    return await interaction.editReply({
      content: "This operation is not supported yet.",
      embeds: [],
      components: [],
    });
  }
}
