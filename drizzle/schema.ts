import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Onboarding submissions table
 * Stores client onboarding form data for admin review
 */
export const onboardingSubmissions = mysqlTable("onboarding_submissions", {
  id: int("id").autoincrement().primaryKey(),
  
  // Company Information
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyPhone: varchar("company_phone", { length: 50 }).notNull(),
  companyEmail: varchar("company_email", { length: 320 }).notNull(),
  companyWebsite: varchar("company_website", { length: 500 }),
  
  // Company Address
  companyAddress: varchar("company_address", { length: 500 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  postalCode: varchar("postal_code", { length: 10 }).notNull(),
  country: varchar("country", { length: 2 }).default("US").notNull(),
  
  // Owner Information
  ownerFirstName: varchar("owner_first_name", { length: 100 }).notNull(),
  ownerLastName: varchar("owner_last_name", { length: 100 }).notNull(),
  ownerEmail: varchar("owner_email", { length: 320 }).notNull(),
  ownerPhone: varchar("owner_phone", { length: 50 }).notNull(),
  
  // Additional Information
  businessHours: text("business_hours"),
  
  // Status tracking
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  
  // GHL sub-account ID (set after approval)
  ghlLocationId: varchar("ghl_location_id", { length: 255 }),
  
  // Admin notes
  adminNotes: text("admin_notes"),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: int("reviewed_by").references(() => users.id),
});

export type OnboardingSubmission = typeof onboardingSubmissions.$inferSelect;
export type InsertOnboardingSubmission = typeof onboardingSubmissions.$inferInsert;