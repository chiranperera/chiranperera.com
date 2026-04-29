import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const inquiryStatus = pgEnum("inquiry_status", [
  "new",
  "in_review",
  "responded",
  "archived",
  "spam",
]);

export const auditStatus = pgEnum("audit_status", [
  "pending",
  "scanning",
  "drafting",
  "ready",
  "sent",
  "failed",
]);

export const bookingStatus = pgEnum("booking_status", [
  "held",
  "pending",
  "confirmed",
  "declined",
  "cancelled",
]);

export const inquiries = pgTable(
  "inquiries",
  {
    id: serial("id").primaryKey(),
    source: varchar("source", { length: 32 }).notNull().default("audit"),
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    url: varchar("url", { length: 500 }).notNull(),
    industry: varchar("industry", { length: 80 }).notNull(),
    message: text("message"),
    status: inquiryStatus("status").notNull().default("new"),
    ipAddress: varchar("ip_address", { length: 64 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => sql`now()`),
  },
  (t) => [index("inquiries_email_idx").on(t.email), index("inquiries_status_idx").on(t.status)],
);

export const audits = pgTable(
  "audits",
  {
    id: serial("id").primaryKey(),
    inquiryId: integer("inquiry_id")
      .notNull()
      .references(() => inquiries.id, { onDelete: "cascade" }),
    targetUrl: varchar("target_url", { length: 500 }).notNull(),
    status: auditStatus("status").notNull().default("pending"),
    scanData: jsonb("scan_data"),
    llmResults: jsonb("llm_results"),
    score: integer("score"),
    draftPdfUrl: varchar("draft_pdf_url", { length: 500 }),
    sentPdfUrl: varchar("sent_pdf_url", { length: 500 }),
    adminNotes: text("admin_notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => sql`now()`),
    sentAt: timestamp("sent_at", { withTimezone: true }),
  },
  (t) => [index("audits_status_idx").on(t.status), index("audits_inquiry_idx").on(t.inquiryId)],
);

export const bookings = pgTable(
  "bookings",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    slotStart: timestamp("slot_start", { withTimezone: true }).notNull(),
    slotEnd: timestamp("slot_end", { withTimezone: true }).notNull(),
    projectBrief: text("project_brief"),
    status: bookingStatus("status").notNull().default("pending"),
    icsToken: varchar("ics_token", { length: 64 }).notNull(),
    holdExpiresAt: timestamp("hold_expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  },
  (t) => [
    index("bookings_slot_idx").on(t.slotStart),
    index("bookings_email_idx").on(t.email),
  ],
);

export const availability = pgTable("availability", {
  id: serial("id").primaryKey(),
  dateStart: timestamp("date_start", { withTimezone: true }).notNull(),
  dateEnd: timestamp("date_end", { withTimezone: true }).notNull(),
  reason: varchar("reason", { length: 200 }),
  kind: varchar("kind", { length: 20 }).notNull().default("blocked"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  role: varchar("role", { length: 20 }).notNull().default("owner"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
export type Audit = typeof audits.$inferSelect;
export type NewAudit = typeof audits.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
export type Availability = typeof availability.$inferSelect;
