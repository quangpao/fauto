import { DATE_FORMAT, LOCALE, TJ, TZ } from "@core/constants";
import type { Page } from "@prisma/client";
import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { DateTime } from "luxon";
import { AdminAction, AdminOption } from "@modules/automation/type";

export const ScheduleSelectMenu = (lastTimestamp?: number) => {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("scheduleSelectMenu")
    .setPlaceholder("Choose a timestamp!");

  if (!lastTimestamp) return selectMenu;
  for (let i = 1; i <= 10; i++) {
    const dateTime = DateTime.fromSeconds(lastTimestamp + i * TJ)
      .setZone(TZ)
      .setLocale(LOCALE);
    const dateString = dateTime.toFormat(DATE_FORMAT);

    selectMenu.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel(dateString)
        .setValue(dateTime.toSeconds().toString()),
    );
  }

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

export const AdminOptionSelectMenu = (currentOption: AdminOption) => {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("adminOptionSelectMenu")
    .setPlaceholder("Choose an option!")
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("⇀ 𝐅𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ↽")
        .setValue(AdminOption.Channel)
        .setDefault(currentOption === AdminOption.Channel),
    )
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("⇀ 𝐅𝐔𝐬𝐞𝐫 ↽")
        .setValue(AdminOption.User)
        .setDefault(currentOption === AdminOption.User),
    )
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("⇀ 𝐅𝐏𝐚𝐠𝐞 ↽")
        .setValue(AdminOption.Page)
        .setDefault(currentOption === AdminOption.Page),
    );

  return selectMenu;
};

export const AdminActionSelectMenu = (currentAction: AdminAction) => {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId("adminActionSelectMenu")
    .setPlaceholder("Choose an action!");

  if (currentAction !== AdminAction.Create) {
    selectMenu.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("⇀ 𝐂𝐫𝐞𝐚𝐭𝐞 ↽")
        .setValue(AdminAction.Create),
    );
  }
  if (currentAction !== AdminAction.Update) {
    selectMenu.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("⇀ 𝐔𝐩𝐝𝐚𝐭𝐞 ↽")
        .setValue(AdminAction.Update),
    );
  }
  if (currentAction !== AdminAction.Delete) {
    selectMenu.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("⇀ 𝐃𝐞𝐥𝐞𝐭𝐞 ↽")
        .setValue(AdminAction.Delete),
    );
  }
  if (currentAction !== AdminAction.List) {
    selectMenu.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("⇀ 𝐋𝐢𝐬𝐭 ↽")
        .setValue(AdminAction.List),
    );
  }

  return selectMenu;
};
