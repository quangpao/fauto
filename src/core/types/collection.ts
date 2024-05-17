import type { ListenerChannel } from "@prisma/client";
import type { Collection } from "discord.js";

export interface Map {
  [key: string]: string;
}

export interface ListenerChannels {
  ids: string[];
  collection: Collection<string, ListenerChannel>;
}
