import FApi from "@modules/facebook/api";
import ApiKey from "@modules/prisma/apikey";
import { isImgUrl } from "@shared/utils";
import { Collection, type Message } from "discord.js";
import { PostPreviewEmbed } from "./builder/embed";
import { PageSelectMenuRow } from "./builder";
import type { Page } from "@prisma/client";

export default class AutoService {
  public fApis: Collection<string, FApi> = new Collection<string, FApi>();
  private pages: Page[] = [];

  public async init() {
    const apiKeys = await ApiKey.getAll();

    for (const apiKey of apiKeys) {
      const fApi = new FApi(apiKey);
      this.fApis.set(fApi.page.pageId, fApi);
      this.pages.push(apiKey.page);
    }
  }

  public async verifyInput(message: Message<boolean>) {
    const [type, url] = await this.decryptInput(message);
    if (!type || !url)
      return await message.reply({
        content: "Your input is invalid, please try again!",
      });

    const embed = PostPreviewEmbed({
      title: "[FAuto] Post has been created",
      description: "Please choose the next action",
      type,
      url,
    });

    return await message.reply({
      embeds: [embed],
      components: [PageSelectMenuRow(this.pages)],
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
