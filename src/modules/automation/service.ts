import FApi from "@modules/facebook/api";
import ApiKey from "@modules/prisma/apikey";
import { getMetadata } from "@shared/utils";
import { AttachmentBuilder, Collection, type Message } from "discord.js";
import { PostPreviewEmbed } from "./builder/embed";
import { PageSelectMenuRow } from "./builder";
import { PostType, type Page } from "@prisma/client";
import type { PostImageType } from "./type";
import Post from "@modules/prisma/post";
import got from "got";
import sharp from "sharp";
import type { ApiKeyWithPage } from "@modules/prisma/type";

export default class AutoService {
  public fApis: Collection<string, FApi> = new Collection<string, FApi>();
  private pages: Page[] = [];

  public async init() {
    const apiKeys = await ApiKey.getAll();
    const pages: Page[] = [];

    for (const apiKey of apiKeys) {
      const fApi = new FApi(apiKey);
      this.fApis.set(fApi.page.pageId, fApi);
      pages.push(apiKey.page);
    }
    this.pages = pages;
  }

  public addApi(apiKey: ApiKeyWithPage) {
    if (this.fApis.get(apiKey.page.pageId))
      throw new Error("This page is already existed.");
    const fApi = new FApi(apiKey);
    this.fApis.set(fApi.page.pageId, fApi);
    this.pages.push(apiKey.page);
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

  public async postImage(params: PostImageType) {
    const fApi = this.fApis.get(params.pageId);
    if (!fApi) throw new Error("[AutoService] Cannot get API of the page");

    const postResponse = await fApi.postPhoto({
      url: params.url,
      caption: params.caption,
      published: params.published,
      scheduled_publish_time: params.scheduledPublishTime,
    });
    const getResponse = await fApi.getPhoto(postResponse.id);

    return await Post.create({
      postId: getResponse.id,
      postUrl: getResponse.link,
      message: params.caption,
      postType: params.postType,
      scheduled: params.scheduledPublishTime,
      pageId: params.pageId,
      idealScheduled: params.idealScheduled,
    });
  }

  private async decryptInput(message: Message<boolean>) {
    const [type, url] = await this.checkImage(message);
    if (!url) return [];

    return [type, url];
  }

  private async checkImage(message: Message<boolean>) {
    let url;
    const imageMetadata = (
      await getMetadata(message.content)
    )?.contentType?.startsWith("image")
      ? await getMetadata(message.content)
      : message.attachments.first()?.contentType?.startsWith("image")
        ? message.attachments.first()
        : null;

    if (!imageMetadata) return [];
    url = imageMetadata.url;

    if ((imageMetadata.size || 0) / 1024 / 1024 > 10) {
      if (imageMetadata.contentType?.includes("png")) {
        let imageBuffer = await got(url).buffer();
        imageBuffer = await sharp(imageBuffer).toFormat("jpg").toBuffer();
        const newMessage = await message.channel.send({
          content: "Your image has been modified for better performance.",
          files: [new AttachmentBuilder(imageBuffer)],
        });
        await message.delete();
        url = newMessage.attachments.first()?.url;
      } else url = null;
    }

    return [PostType.PHOTO, url];
  }
}
