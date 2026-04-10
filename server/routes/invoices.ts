import { eq } from "drizzle-orm";
import { invoices } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";

export const invoicesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(invoices).where(eq(invoices.userId, ctx.user.id));
  }),
});
