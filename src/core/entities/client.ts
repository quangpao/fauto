import { config } from "@config/config";
import { logger } from "@shared/logger";
import { isImgUrl } from "@shared/utils";
import { Client, GatewayIntentBits } from "discord.js";

export class FClient extends Client {
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
  }

  public async start() {
    logger.info(`Starting F-Auto`);
    await this.initEvents();

    try {
      await this.login(config.discord.tokenID);

      logger.info(`Logged in as ${this.user?.tag}`);
    } catch (error) {
      logger.error(`Failed to login to Discord: `, error);
      process.exit(1);
    }
  }

  private async initEvents() {
    logger.info("[FEvents] Initializing...");

    this.on("ready", async () => {
      logger.info("[FEvents] Triggered |ready| event -- DONE");
    });

    this.on("messageCreate", async (message) => {
      if (message.author.username !== "quangpao") return;
      let imageUrl;

      if (message.attachments.size > 0) {
        if (message.attachments.first()?.contentType?.startsWith("image")) {
          imageUrl = message.attachments.first()?.url;
        }
      } else if (await isImgUrl(message.content)) {
        imageUrl = message.content;
      }

      console.log(imageUrl);
    });
  }
}
