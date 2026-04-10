import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { vpsRouter } from "./routes/vps";
import { hostingRouter } from "./routes/hosting";
import { domainsRouter } from "./routes/domains";
import { invoicesRouter } from "./routes/invoices";
import { ticketsRouter } from "./routes/tickets";
import { adminRouter } from "./routes/admin";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  vps: vpsRouter,
  hosting: hostingRouter,
  domains: domainsRouter,
  invoices: invoicesRouter,
  tickets: ticketsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
