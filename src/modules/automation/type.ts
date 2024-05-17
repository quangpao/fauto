/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Page, PostType } from "@prisma/client";
import type { Colors } from "./constant";

export type PostPreviewEmbedType = {
  title: string;
  description: string;
  type: PostType | string;
  url: string;
};

export type UpdatePostPreviewEmbedType = {
  title?: string;
  description?: string;
  page?: Page;
  caption?: string;
  time?: string;
  color?: Colors;
};

export type PostImageType = {
  pageId: string;
  url: string;
  caption: string;
  published: boolean;
  postType: PostType;
  scheduledPublishTime: number;
};

export const enum AdminOption {
  None = "0x000",
  Channel = "0x001",
  User = "0x002",
  Page = "0x003",
}

export const enum AdminAction {
  None = "1x000",
  Create = "1x001",
  Update = "1x002",
  Delete = "1x003",
  List = "1x004",
}

export function isPostPreviewEmbedType(p: any): p is PostPreviewEmbedType {
  return (
    typeof p === "object" &&
    p !== null &&
    "title" in p &&
    "description" in p &&
    "type" in p &&
    "url" in p &&
    typeof p.title === "string" &&
    typeof p.description === "string" &&
    typeof p.type === "string" &&
    typeof p.url === "string"
  );
}

export function isUpdatePostPreviewEmbedType(
  p: any,
): p is UpdatePostPreviewEmbedType {
  return (
    typeof p === "object" &&
    p != null &&
    (p.title === undefined || typeof p.title === "string") &&
    (p.description === undefined || typeof p.description === "string") &&
    (p.page === undefined || typeof p.page === "object") &&
    (p.caption === undefined || typeof p.caption === "string") &&
    (p.color === undefined || typeof p.color === "string") &&
    (p.time === undefined || typeof p.time === "string")
  );
}
