import type { FClient } from "@core/entities/client";
import type {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  InteractionResponse,
  InteractionUpdateOptions,
  ModalBuilder,
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  SlashCommandBuilder,
  ButtonBuilder,
} from "discord.js";

interface Command {
  execute: (interaction: Interaction) => Promise<void>;
}

export interface ButtonCommand extends Command {
  builder: ButtonBuilder;
  execute: (
    interaction: ButtonInteraction,
    client?: FClient,
  ) => Promise<InteractionResponse<T> | InteractionUpdateOptions<T> | void>;
}

export interface SlashCommand extends Command {
  builder: SlashCommandBuilder;
  execute: (
    interaction: ChatInputCommandInteraction,
    client?: FClient,
  ) => Promise<InteractionResponse<T> | InteractionUpdateOptions<T> | void>;
}

export interface ModalSubmit extends Command {
  builder: ModalBuilder;
  execute: (
    interaction: ModalSubmitInteraction,
    client?: FClient,
  ) => Promise<InteractionResponse<T> | InteractionUpdateOptions<T> | void>;
}

export interface SelectMenu extends Command {
  builder: BaseSelectMenuBuilder;
  execute: (
    interaction: AnySelectMenuInteraction,
    client?: FClient,
  ) => Promise<InteractionResponse<T> | InteractionUpdateOptions<T> | void>;
}

export interface StringSelectMenu extends SelectMenu {
  builder: StringSelectMenuBuilder;
  execute: (
    interaction: StringSelectMenuInteraction,
    client?: FClient,
  ) => Promise<InteractionResponse<T> | InteractionUpdateOptions<T> | void>;
}
