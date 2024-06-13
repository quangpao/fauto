import type { PostType, Prisma } from "@prisma/client";

export type ApiKeyWithPage = Prisma.ApiKeyGetPayload<{
  include: { page: true };
}>;

export type PostSchema = {
  postId: string;
  postUrl: string;
  message: string;
  postType: PostType;
  scheduled: number;
  pageId: string;
  idealScheduled: number;
};
