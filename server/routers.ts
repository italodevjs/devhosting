import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";
import { vpsRouter } from "./routes/vps";
import { hostingRouter } from "./routes/hosting";
import { domainsRouter } from "./routes/domains";
import { invoicesRouter } from "./routes/invoices";
import { ticketsRouter } from "./routes/tickets";
import { adminRouter } from "./routes/admin";
import { authRouter } from "./routes/auth";

export const appRouter = router({
  system: systemRouter,
  auth: authRouter,
  vps: vpsRouter,
  hosting: hostingRouter,
  domains: domainsRouter,
  invoices: invoicesRouter,
  tickets: ticketsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
