import type { ListenerChannel } from "@prisma/client";
import prisma from "@shared/db";

export default class Channel {
  public static async getAll(): Promise<ListenerChannel[]> {
    return await prisma.listenerChannel.findMany();
  }

  public static async getAllId(): Promise<string[]> {
    const channels = await Channel.getAll();

    return channels.map((channel) => channel.channelId);
  }
}
