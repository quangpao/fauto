import type { PageInfoResponse } from "@modules/facebook/type";
import prisma from "@shared/db";

export default class Page {
  public static async getOne(pageId: string) {
    return await prisma.page.findUnique({
      where: {
        pageId: pageId,
      },
    });
  }

  public static async create(info: PageInfoResponse) {
    if (!info || !info.username)
      throw new Error(
        "Page Username must be specified, please update it first!",
      );
    return await prisma.page.create({
      data: {
        pageId: info.id,
        pageName: info.name,
        pageUsername: info.username,
      },
    });
  }
}
