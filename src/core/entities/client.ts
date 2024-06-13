import {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import AutoService from "@modules/automation/service";
import type { ListenerChannel } from "@prisma/client";
import type { FOptions, ListenerChannels } from "@core/types";
import Channel from "@modules/prisma/channel";
import { FInteraction } from "./interaction";
import { config } from "@config/config";
import { logger } from "@shared/logger";
import FCommands from "./command";
import fs from "node:fs";
import YAML from "yaml";
import { DefaultFOptions } from "@core/constants";

export class FClient extends Client {
  public commands: FCommands;
  public autoService: AutoService;
  public lChannels: ListenerChannels;
  public fOptions: FOptions;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
      ],
      failIfNotExists: false,
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true,
      },
    });

    this.commands = new FCommands();
    this.autoService = new AutoService();
    this.lChannels = {
      ids: [],
      collection: new Collection<string, ListenerChannel>(),
    };
    this.fOptions = {
      autoSchedule: false,
    };
  }

  public async start() {
    this.initOptions();
    await this.initEvents();
    await this.initCommands();
    await this.initChannels();
    await this.autoService.init();

    try {
      await this.login(config.discord.tokenID);

      logger.info(`Logged in as ${this.user?.tag}`);
    } catch (error) {
      logger.error(`Failed to login to Discord: `, error);
      process.exit(1);
    }
  }

  private async initCommands() {
    await this.commands.register(this);
  }

  private async initEvents() {
    this.onReady();
    this.messageCreate();
    this.interactionCreate();
    logger.info("[FEvents] Initialized!");
  }

  private async initChannels() {
    const channels = await Channel.getAll();
    this.lChannels.ids = await Channel.getAllId();
    for (const channel of channels) {
      this.lChannels.collection.set(channel.channelId, channel);
    }
  }

  private initOptions() {
    if (fs.existsSync("config.yml")) {
      logger.info("[FOptions] Loading config.yml file...");

      const configFile = fs.readFileSync("config.yml", "utf-8");
      this.fOptions = YAML.parse(configFile);
    } else {
      logger.warn("[FOptions] config.yml file not found. Creating...");

      this.fOptions = DefaultFOptions;
      const configString = YAML.stringify(DefaultFOptions);
      fs.writeFileSync("config.yml", configString, "utf-8");

      logger.info("[FOptions] Create config.yml file successfully.");
    }
  }

  public updateOptions(options: Partial<FOptions>) {
    this.fOptions = {
      ...this.fOptions,
      ...options,
    };

    const configString = YAML.stringify(this.fOptions);
    fs.writeFileSync("config.yml", configString, "utf-8");
    logger.info("[FOptions] Update config.yml file successfully.");
  }

  private onReady() {
    this.on("ready", async () => {
      const rest = new REST().setToken(config.discord.tokenID);
      await rest.put(Routes.applicationCommands(config.discord.clientID), {
        body: this.commands.slash.map((command) => command.builder.toJSON()),
      });
      /// Cron jobs handle
      logger.info("[FEvents] Triggered |ready| event");
    });
  }

  private messageCreate() {
    this.on("messageCreate", async (message) => {
      if (!this.lChannels.ids.includes(message.channelId)) return;
      if (
        message.author.id !== "283502903958700032" &&
        message.author.id !== "539420179122094082"
      )
        return;

      try {
        await this.autoService.verifyInput(message);
        logger.info("[FEvents] Triggered |messageCreate| event");
      } catch (error) {
        logger.error("An unexpected error happened", error);
      }
    });
  }

  private interactionCreate() {
    this.on("interactionCreate", async (interaction) => {
      try {
        await FInteraction.execute(this, interaction);
      } catch (error) {
        logger.error("An unexpected error happened", error);
      }
    });
  }
}
