import prisma from "@shared/db";

export default class Channel {
  public static async getAll() {
    return await prisma.listenerChannel.findMany();
  }

  public static async getAllId(): Promise<string[]> {
    const channels = await Channel.getAll();

    return channels.map((channel) => channel.channelId);
  }
}
