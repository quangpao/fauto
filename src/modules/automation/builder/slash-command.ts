import { SlashCommandBuilder } from "discord.js";

export const FAutoSlashBuilder = new SlashCommandBuilder()
  .setName("fauto")
  .setDescription("FAuto Admin Management GUI")
  .setDescriptionLocalization("vi", "GUI Quản lý cho FAuto");

export const ScheduleSlashBuilder = new SlashCommandBuilder()
  .setName("schedule")
  .setDescription("Turn on/off Automatic Schedule")
  .setDescriptionLocalization("vi", "Bật/Tắt tự động lên lịch đăng bài");
