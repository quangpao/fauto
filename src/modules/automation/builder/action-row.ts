import {
  ActionRowBuilder,
  type MessageActionRowComponentBuilder as Me,
  type ModalActionRowComponentBuilder as Mo,
} from "discord.js";
import {
  AddCaptionButton,
  PostButton,
  ScheduleButton,
  SkipCaptionButton,
  SubmitCreatePageButton,
} from "./button";
import {
  CaptionTxtInput,
  CreditTxtInput,
  PageApiKeyTxtInput,
} from "./text-input";
import {
  AdminActionSelectMenu,
  AdminOptionSelectMenu,
  PageSelectMenu,
  ScheduleSelectMenu,
} from "./select-menu";
import type { Page } from "@prisma/client";
import { AdminOption, type AdminAction } from "../type";

/** ⟾ Select Menu Action Row ⟽ **/
export const ScheduleSelectMenuRow = (lastTimestamp: number) =>
  new ActionRowBuilder<Me>().addComponents(ScheduleSelectMenu(lastTimestamp));

export const PageSelectMenuRow = (pages: Page[]) =>
  new ActionRowBuilder<Me>().addComponents(PageSelectMenu(pages));

export const AdminOptionSelectMenuRow = (currentOption: AdminOption) =>
  new ActionRowBuilder<Me>().addComponents(
    AdminOptionSelectMenu(currentOption),
  );

export const AdminActionSelectMenuRow = (currentAction: AdminAction) =>
  new ActionRowBuilder<Me>().addComponents(
    AdminActionSelectMenu(currentAction),
  );

/** ⟾ Button Action Row ⟽ **/
export const ScheduleRow = new ActionRowBuilder<Me>().addComponents(
  PostButton,
  ScheduleButton,
);

export const CaptionRow = new ActionRowBuilder<Me>().addComponents(
  AddCaptionButton,
  SkipCaptionButton,
);

export const CreatePageActionRow = new ActionRowBuilder<Me>().addComponents(
  SubmitCreatePageButton,
);

/** ⟾ Text Input Action Row ⟽ **/

export const CaptionActionRow = new ActionRowBuilder<Mo>().addComponents(
  CaptionTxtInput,
);
export const CreditActionRow = new ActionRowBuilder<Mo>().addComponents(
  CreditTxtInput,
);

export const PageApiKeyActionRow = new ActionRowBuilder<Mo>().addComponents(
  PageApiKeyTxtInput,
);
