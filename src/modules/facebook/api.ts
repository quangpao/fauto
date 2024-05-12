import adsSdk, { HttpMethod } from "facebook-nodejs-business-sdk";
import { feedsParams, meParams, photoParams, postPhotoParams } from "./param";
import type { PostPhotoParam } from "./type";
import type { ApiKeyWithPage } from "@modules/prisma/type";
import type { Page } from "@prisma/client";
export default class FApi {
  private api;
  private apiKey;
  public page: Page;
  constructor(apiKey: ApiKeyWithPage) {
    this.apiKey = apiKey;
    this.page = apiKey.page;
    this.api = adsSdk.FacebookAdsApi.init(apiKey.key);
  }

  public async info() {
    const response = await this.api.call(HttpMethod.GET, ["me"], meParams);

    return response;
  }

  public async getFeeds() {
    const response = await this.api.call(
      HttpMethod.GET,
      [this.apiKey.pageId, "feed"],
      feedsParams,
    );

    return response;
  }

  public async postPhoto(params: PostPhotoParam) {
    const response = await this.api.call(
      HttpMethod.POST,
      [this.apiKey.pageId, "photos"],
      postPhotoParams(params),
    );

    return response;
  }

  public async getPhoto(photoId: string) {
    const response = await this.api.call(
      HttpMethod.GET,
      [photoId],
      photoParams,
    );

    return response;
  }
}
