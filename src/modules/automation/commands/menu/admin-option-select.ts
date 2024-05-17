import type { StringSelectMenu } from "@core/types";
import {
  AdminActionSelectMenuRow,
  AdminOptionSelectMenu,
  AdminOptionSelectMenuRow,
} from "@modules/automation/builder";
import { AdminAction, AdminOption } from "@modules/automation/type";

export const command: StringSelectMenu = {
  builder: AdminOptionSelectMenu(AdminOption.None),
  async execute(interaction) {
    const currentOption = interaction.values.pop() as AdminOption;
    if (interaction.user.id !== "283502903958700032")
      return await interaction.reply({
        content: "You don't have enough permission to execute the command",
        ephemeral: true,
      });
    interaction.update({
      components: [
        AdminOptionSelectMenuRow(currentOption),
        AdminActionSelectMenuRow(AdminAction.None),
      ],
    });
  },
};
