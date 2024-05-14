import type { Map } from "@core/types";
import type { Embed } from "discord.js";

export async function isImgUrl(url: string) {
  if (!isUrl(url)) {
    return false;
  }
  const response = await fetch(url, { method: "HEAD" });
  return response.headers.get("Content-Type")?.startsWith("image");
}

export function isUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractEmbed(embed: Embed): any {
  const extractedEmbed: Map = {};

  for (const field of embed.fields) {
    extractedEmbed[field.name] = field.value;
  }

  return extractedEmbed;
}
