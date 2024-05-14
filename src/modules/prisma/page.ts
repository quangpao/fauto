import prisma from "@shared/db";

export default class Page {
  public static async getOne(pageId: string) {
    return await prisma.page.findUnique({
      where: {
        pageId: pageId,
      },
    });
  }
}
