import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { supportTickets, ticketMessages } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";

function generateTicketNumber(): string {
  return `TKT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

export const ticketsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.userId, ctx.user.id))
      .orderBy(desc(supportTickets.createdAt));
  }),

  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;
      const result = await db
        .select()
        .from(supportTickets)
        .where(eq(supportTickets.id, input.id))
        .limit(1);
      const ticket = result[0];
      if (!ticket || ticket.userId !== ctx.user.id) return null;
      const messages = await db
        .select()
        .from(ticketMessages)
        .where(eq(ticketMessages.ticketId, input.id))
        .orderBy(desc(ticketMessages.createdAt));
      return { ...ticket, messages };
    }),

  create: protectedProcedure
    .input(z.object({
      subject: z.string().min(5).max(255),
      message: z.string().min(10),
      priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
      category: z.enum(["billing", "technical", "domain", "vps", "hosting", "other"]).default("other"),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const ticketNumber = generateTicketNumber();
      const [result] = await db.insert(supportTickets).values({
        userId: ctx.user.id,
        ticketNumber,
        subject: input.subject,
        priority: input.priority,
        category: input.category,
        status: "open",
      });
      const ticketId = (result as any).insertId;
      await db.insert(ticketMessages).values({
        ticketId,
        userId: ctx.user.id,
        message: input.message,
        isStaff: false,
      });
      return { success: true, ticketNumber, ticketId };
    }),

  reply: protectedProcedure
    .input(z.object({ ticketId: z.number(), message: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const ticket = await db
        .select()
        .from(supportTickets)
        .where(eq(supportTickets.id, input.ticketId))
        .limit(1);
      if (!ticket[0] || ticket[0].userId !== ctx.user.id) throw new Error("Ticket not found");
      await db.insert(ticketMessages).values({
        ticketId: input.ticketId,
        userId: ctx.user.id,
        message: input.message,
        isStaff: false,
      });
      await db
        .update(supportTickets)
        .set({ status: "open" })
        .where(eq(supportTickets.id, input.ticketId));
      return { success: true };
    }),
});
