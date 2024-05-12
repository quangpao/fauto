import prisma from "@shared/db";

export default class ApiKey {
  public static async getAll() {
    return await prisma.apiKey.findMany({
      include: {
        page: true,
      },
    });
  }

  public static async getOne(pageId: string) {
    return await prisma.apiKey.findFirst({
      where: {
        pageId,
      },
    });
  }

  public static async getKey(pageId: string) {
    return (await ApiKey.getOne(pageId))?.key || null;
  }
}
