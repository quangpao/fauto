/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Page, PostType } from "@prisma/client";
import type { Colors } from "./constant";
import type { StringSelectMenuInteraction } from "discord.js";

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
  idealScheduled: number;
};

export enum AdminOption {
  None = "0x000",
  Channel = "1x000",
  User = "2x000",
  Page = "3x000",
}

export enum AdminAction {
  None = "0x00f",
  Create = "0x001",
  Update = "0x002",
  Delete = "0x003",
  List = "0x004",
}

export type CollectOption = {
  option: AdminOption;
  action: AdminAction;
  interaction: StringSelectMenuInteraction;
};

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

export function isAdminOption(p: any): p is AdminOption {
  return Object.values(AdminOption).includes(p as AdminOption);
}

export function isAdminAction(p: any): p is AdminAction {
  return Object.values(AdminAction).includes(p as AdminAction);
}
