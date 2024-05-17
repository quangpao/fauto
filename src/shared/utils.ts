import type { Map } from "@core/types";
import type { Embed } from "discord.js";

export async function getMetadata(url: string) {
  if (!isUrl(url)) {
    return;
  }
  const response = await fetch(url, { method: "HEAD" });

  return {
    contentType: response.headers.get("Content-Type"),
    size: +(response.headers.get("Content-Length") || 0),
    url: url,
  };
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
