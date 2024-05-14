import { config } from "@config/config";
import { logger } from "@shared/logger";
import { Client, GatewayIntentBits } from "discord.js";
import FCommands from "./command";
import { FInteraction } from "./interaction";
import AutoService from "@modules/automation/service";

export class FClient extends Client {
  public commands: FCommands;
  public autoService: AutoService;

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
  }

  public async start() {
    await this.initEvents();
    await this.initCommands();
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

  private onReady() {
    this.on("ready", async () => {
      /// Cron jobs handle
      logger.info("[FEvents] Triggered |ready| event");
    });
  }

  private messageCreate() {
    this.on("messageCreate", async (message) => {
      if (message.channelId !== "1237779304738193470") return;
      if (message.author.id !== "283502903958700032") return;

      await this.autoService.verifyInput(message);
      logger.info("[FEvents] Triggered |messageCreate| event");
    });
  }

  private interactionCreate() {
    this.on("interactionCreate", async (interaction) => {
      await FInteraction.execute(this, interaction);
    });
  }
}
