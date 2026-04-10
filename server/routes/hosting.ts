import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { hostingAccounts } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";

export const hostingRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(hostingAccounts).where(eq(hostingAccounts.userId, ctx.user.id));
  }),

  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;
      const result = await db
        .select()
        .from(hostingAccounts)
        .where(and(eq(hostingAccounts.id, input.id), eq(hostingAccounts.userId, ctx.user.id)))
        .limit(1);
      return result[0] ?? null;
    }),
});
