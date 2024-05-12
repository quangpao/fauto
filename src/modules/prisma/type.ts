import type { Prisma } from "@prisma/client";

export type ApiKeyWithPage = Prisma.ApiKeyGetPayload<{
  include: { page: true };
}>;
