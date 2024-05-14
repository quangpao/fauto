/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Page } from "@prisma/client";
import type { Colors } from "./constant";

export type PostPreviewEmbedType = {
  title: string;
  description: string;
  type: string;
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
