import prisma from "@shared/db";
import type { PostSchema } from "./type";

export default class Post {
  public static async getAll() {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public static async create(data: PostSchema) {
    return await prisma.post.create({
      data: {
        postId: data.postId,
        postUrl: data.postUrl,
        message: data.message,
        postType: data.postType,
        scheduled: data.scheduled,
        pageId: data.pageId,
      },
    });
  }

  public static async getOne(postId: string) {
    return await prisma.post.findUniqueOrThrow({
      where: {
        postId: postId,
      },
      include: {
        page: true,
      },
    });
  }

  public static async getLatest(pageId: string) {
    return await prisma.post.findFirst({
      where: {
        pageId: pageId,
      },
      orderBy: {
        scheduled: "desc",
      },
    });
  }

  public static async getLatestByUsername(pageUsername: string) {
    return await prisma.post.findFirst({
      where: {
        page: {
          pageUsername: pageUsername,
        },
      },
      orderBy: {
        scheduled: "desc",
      },
    });
  }
}
