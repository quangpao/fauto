import type { Page } from "@prisma/client";
import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { DateTime } from "luxon";
const TJ = 60 * 60 * 4; //4 Hours
const TZ = "UTC+7";

export const ScheduleSelectMenu = (lastTimestamp: number) => {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("scheduleSelectMenu")
    .setPlaceholder("Choose a timestamp!");

  for (let i = 1; i <= 10; i++) {
    const dateTime = DateTime.fromSeconds(lastTimestamp + i * TJ)
      .setZone(TZ)
      .setLocale("vi-VN");
    const dateString = dateTime.toFormat("HH:mm (EEEE, LLL) (Z)");

    selectMenu.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel(dateString)
        .setValue(dateTime.toSeconds().toString()),
    );
  }

  selectMenu.options[0].setDefault(true);

  return selectMenu;
};

export const PageSelectMenu = (pages?: Page[]) => {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("pageSelectMenu")
    .setPlaceholder("Choose a page to post!");

  if (!pages) return selectMenu;
  for (const page of pages) {
    selectMenu.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel(`${page.pageName} (${page.pageUsername})`)
        .setValue(page.pageId),
    );
  }

  return selectMenu;
};
