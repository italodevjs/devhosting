import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { vpsInstances } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";

export const vpsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(vpsInstances).where(eq(vpsInstances.userId, ctx.user.id));
  }),

  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;
      const result = await db
        .select()
        .from(vpsInstances)
        .where(and(eq(vpsInstances.id, input.id), eq(vpsInstances.userId, ctx.user.id)))
        .limit(1);
      return result[0] ?? null;
    }),

  toggleStatus: protectedProcedure
    .input(z.object({ id: z.number(), action: z.enum(["start", "stop", "restart"]) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const newStatus = input.action === "stop" ? "stopped" : "running";
      await db
        .update(vpsInstances)
        .set({ status: newStatus })
        .where(and(eq(vpsInstances.id, input.id), eq(vpsInstances.userId, ctx.user.id)));
      return { success: true, status: newStatus };
    }),

  rename: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string().min(1).max(128) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db
        .update(vpsInstances)
        .set({ name: input.name })
        .where(and(eq(vpsInstances.id, input.id), eq(vpsInstances.userId, ctx.user.id)));
      return { success: true };
    }),
});
