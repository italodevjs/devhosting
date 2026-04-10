import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { domainRegistrations } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";

export const domainsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(domainRegistrations).where(eq(domainRegistrations.userId, ctx.user.id));
  }),

  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;
      const result = await db
        .select()
        .from(domainRegistrations)
        .where(and(eq(domainRegistrations.id, input.id), eq(domainRegistrations.userId, ctx.user.id)))
        .limit(1);
      return result[0] ?? null;
    }),

  toggleAutoRenew: protectedProcedure
    .input(z.object({ id: z.number(), autoRenew: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db
        .update(domainRegistrations)
        .set({ autoRenew: input.autoRenew })
        .where(and(eq(domainRegistrations.id, input.id), eq(domainRegistrations.userId, ctx.user.id)));
      return { success: true };
    }),

  updateNameservers: protectedProcedure
    .input(z.object({ id: z.number(), nameservers: z.array(z.string()).min(2).max(6) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db
        .update(domainRegistrations)
        .set({ nameservers: input.nameservers })
        .where(and(eq(domainRegistrations.id, input.id), eq(domainRegistrations.userId, ctx.user.id)));
      return { success: true };
    }),
});
