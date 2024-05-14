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
} from "./button";
import { CaptionTxtInput, CreditTxtInput } from "./text-input";
import { PageSelectMenu, ScheduleSelectMenu } from "./select-menu";
import type { Page } from "@prisma/client";

export const CaptionActionRow = new ActionRowBuilder<Mo>().addComponents(
  CaptionTxtInput,
);
export const CreditActionRow = new ActionRowBuilder<Mo>().addComponents(
  CreditTxtInput,
);

export const ScheduleRow = new ActionRowBuilder<Me>().addComponents(
  PostButton,
  ScheduleButton,
);

export const CaptionRow = new ActionRowBuilder<Me>().addComponents(
  AddCaptionButton,
  SkipCaptionButton,
);

export const ScheduleSelectMenuRow = (lastTimestamp: number) =>
  new ActionRowBuilder<Me>().addComponents(ScheduleSelectMenu(lastTimestamp));

export const PageSelectMenuRow = (pages: Page[]) =>
  new ActionRowBuilder<Me>().addComponents(PageSelectMenu(pages));
