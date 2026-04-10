import {
  boolean,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  json,
} from "drizzle-orm/mysql-core";

// ─── Users ───────────────────────────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  password: text("password"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  githubId: varchar("githubId", { length: 64 }).unique(),
  googleId: varchar("googleId", { length: 64 }).unique(),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── VPS ──────────────────────────────────────────────────────────────────────────────────
export const vpsInstances = mysqlTable("vps_instances", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 128 }).notNull(),
  plan: mysqlEnum("plan", ["nano", "power", "ultra"]).notNull(),
  status: mysqlEnum("status", ["running", "stopped", "suspended", "provisioning"]).default("provisioning").notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  os: varchar("os", { length: 64 }).default("Ubuntu 22.04 LTS"),
  cpu: int("cpu").notNull(),
  ramGb: int("ramGb").notNull(),
  diskGb: int("diskGb").notNull(),
  bandwidthGb: int("bandwidthGb").notNull(),
  datacenter: varchar("datacenter", { length: 64 }).default("São Paulo, BR"),
  priceMonthly: decimal("priceMonthly", { precision: 10, scale: 2 }).notNull(),
  renewsAt: timestamp("renewsAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VpsInstance = typeof vpsInstances.$inferSelect;
export type InsertVpsInstance = typeof vpsInstances.$inferInsert;

// ─── Hosting ──────────────────────────────────────────────────────────────────────────────
export const hostingAccounts = mysqlTable("hosting_accounts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  domain: varchar("domain", { length: 255 }).notNull(),
  plan: mysqlEnum("plan", ["starter", "pro", "business"]).notNull(),
  status: mysqlEnum("status", ["active", "suspended", "provisioning", "cancelled"]).default("provisioning").notNull(),
  username: varchar("username", { length: 64 }),
  diskUsedMb: int("diskUsedMb").default(0),
  diskLimitMb: int("diskLimitMb").notNull(),
  bandwidthUsedGb: decimal("bandwidthUsedGb", { precision: 10, scale: 2 }).default("0"),
  bandwidthLimitGb: int("bandwidthLimitGb").notNull(),
  emailAccounts: int("emailAccounts").default(0),
  databases: int("databases").default(0),
  sslActive: boolean("sslActive").default(false),
  priceMonthly: decimal("priceMonthly", { precision: 10, scale: 2 }).notNull(),
  renewsAt: timestamp("renewsAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HostingAccount = typeof hostingAccounts.$inferSelect;
export type InsertHostingAccount = typeof hostingAccounts.$inferInsert;

// ─── Domains ──────────────────────────────────────────────────────────────────────────────
export const domainRegistrations = mysqlTable("domain_registrations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  domain: varchar("domain", { length: 255 }).notNull().unique(),
  tld: varchar("tld", { length: 32 }).notNull(),
  status: mysqlEnum("status", ["active", "expired", "pending_transfer", "pending_renewal", "cancelled"]).default("active").notNull(),
  autoRenew: boolean("autoRenew").default(true),
  privacyProtection: boolean("privacyProtection").default(true),
  registeredAt: timestamp("registeredAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  priceYearly: decimal("priceYearly", { precision: 10, scale: 2 }).notNull(),
  nameservers: json("nameservers").$type<string[]>().default(["ns1.devhosting.com.br", "ns2.devhosting.com.br"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DomainRegistration = typeof domainRegistrations.$inferSelect;
export type InsertDomainRegistration = typeof domainRegistrations.$inferInsert;

// ─── Invoices ─────────────────────────────────────────────────────────────────────────────────
export const invoices = mysqlTable("invoices", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  invoiceNumber: varchar("invoiceNumber", { length: 32 }).notNull().unique(),
  status: mysqlEnum("status", ["pending", "paid", "overdue", "cancelled", "refunded"]).default("pending").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  serviceType: mysqlEnum("serviceType", ["vps", "hosting", "domain", "ssl", "other"]).notNull(),
  serviceId: int("serviceId"),
  paymentMethod: varchar("paymentMethod", { length: 64 }),
  paidAt: timestamp("paidAt"),
  dueAt: timestamp("dueAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;

// ─── Support Tickets ────────────────────────────────────────────────────────────────────────────
export const supportTickets = mysqlTable("support_tickets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  ticketNumber: varchar("ticketNumber", { length: 16 }).notNull().unique(),
  subject: varchar("subject", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "waiting_reply", "resolved", "closed"]).default("open").notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high", "critical"]).default("medium").notNull(),
  category: mysqlEnum("category", ["billing", "technical", "domain", "vps", "hosting", "other"]).default("other").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
});

export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = typeof supportTickets.$inferInsert;

// ─── Ticket Messages ────────────────────────────────────────────────────────────────────────────
export const ticketMessages = mysqlTable("ticket_messages", {
  id: int("id").autoincrement().primaryKey(),
  ticketId: int("ticketId").notNull(),
  userId: int("userId").notNull(),
  message: text("message").notNull(),
  isStaff: boolean("isStaff").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TicketMessage = typeof ticketMessages.$inferSelect;
export type InsertTicketMessage = typeof ticketMessages.$inferInsert;

// ─── SSH Keys ──────────────────────────────────────────────────────────────────────────────────
export const sshKeys = mysqlTable("ssh_keys", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 128 }).notNull(),
  publicKey: text("publicKey").notNull(),
  fingerprint: varchar("fingerprint", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SshKey = typeof sshKeys.$inferSelect;
export type InsertSshKey = typeof sshKeys.$inferInsert;