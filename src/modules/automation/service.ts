import FApi from "@modules/facebook/api";
import ApiKey from "@modules/prisma/apikey";
import { isImgUrl } from "@shared/utils";
import type { Message } from "discord.js";
import { InputConfirmEmbed } from "./builder/embed";
import { ScheduleRow } from "./builder/button";

export default class AutoService {
  private fApis: FApi[] = [];

  public async init() {
    const apiKeys = await ApiKey.getAll();
    const fApis: FApi[] = [];

    for (const apiKey of apiKeys) {
      const fApi = new FApi(apiKey);
      fApis.push(fApi);
    }
    this.fApis = fApis;
  }

  public async verifyInput(message: Message<boolean>) {
    const [type, url] = await this.decryptInput(message);
    if (!type || !url)
      return await message.reply({
        content: "Your input is invalid, please try again!",
      });

    const embed = InputConfirmEmbed(type, url);

    message.reply({
      content: `Your ${type} post has been created`,
      embeds: [embed],
      components: [ScheduleRow],
    });
  }

  private async decryptInput(message: Message<boolean>) {
    const [type, url] = await this.checkImage(message);
    if (!url) return [];

    return [type, url];
  }

  private async checkImage(message: Message<boolean>) {
    let url;
    if (message.attachments.size > 0) {
      if (message.attachments.first()?.contentType?.startsWith("image")) {
        url = message.attachments.first()?.url;
      }
    } else if (await isImgUrl(message.content)) {
      url = message.content;
    }

    return ["image", url];
  }
}
