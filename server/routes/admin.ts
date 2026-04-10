import { eq } from "drizzle-orm";
import { users, vpsInstances, invoices, supportTickets } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if ((ctx.user as any).role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
  }
  return next({ ctx });
});

export const adminRouter = router({
  listUsers: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(users);
  }),

  stats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { users: 0, vps: 0, revenue: 0, openTickets: 0 };
    const [allUsers, allVps, allInvoices, allTickets] = await Promise.all([
      db.select().from(users),
      db.select().from(vpsInstances),
      db.select().from(invoices),
      db.select().from(supportTickets),
    ]);
    const revenue = allInvoices
      .filter(i => i.status === "paid")
      .reduce((sum, i) => sum + Number(i.amount), 0);
    const openTickets = allTickets.filter(t => t.status === "open" || t.status === "in_progress").length;
    const activeVps = allVps.filter(v => v.status === "running").length;
    return { users: allUsers.length, vps: activeVps, revenue, openTickets };
  }),

  listTickets: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(supportTickets);
  }),
});
