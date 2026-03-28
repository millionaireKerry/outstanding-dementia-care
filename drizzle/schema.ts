import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

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
 * Blog posts table for dementia care articles and resources
 */
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImageUrl: varchar("coverImageUrl", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // Stored as comma-separated values
  authorId: int("authorId").notNull(),
  published: boolean("published").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  publishedAt: timestamp("publishedAt"),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Ebooks table for downloadable PDF resources
 */
export const ebooks = mysqlTable("ebooks", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  coverImageUrl: varchar("coverImageUrl", { length: 500 }),
  fileUrl: varchar("fileUrl", { length: 500 }).notNull(),
  fileKey: varchar("fileKey", { length: 500 }).notNull(),
  fileSize: int("fileSize"), // in bytes
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // Stored as comma-separated values
  downloadCount: int("downloadCount").default(0).notNull(),
  authorId: int("authorId").notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Ebook = typeof ebooks.$inferSelect;
export type InsertEbook = typeof ebooks.$inferInsert;

/**
 * Support groups directory for external resources
 */
export const supportGroups = mysqlTable("supportGroups", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  url: varchar("url", { length: 500 }).notNull(),
  category: varchar("category", { length: 100 }),
  country: varchar("country", { length: 100 }),
  region: varchar("region", { length: 100 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 50 }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SupportGroup = typeof supportGroups.$inferSelect;
export type InsertSupportGroup = typeof supportGroups.$inferInsert;

/**
 * Voice agent conversations for Dementia Pocket Expert
 */
export const voiceConversations = mysqlTable("voiceConversations", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 100 }).notNull(),
  userId: int("userId"),
  transcript: text("transcript").notNull(),
  response: text("response").notNull(),
  audioUrl: varchar("audioUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VoiceConversation = typeof voiceConversations.$inferSelect;
export type InsertVoiceConversation = typeof voiceConversations.$inferInsert;

/**
 * Newsletter subscribers table for email updates
 */
export const newsletterSubscribers = mysqlTable("newsletterSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  status: mysqlEnum("status", ["active", "unsubscribed"]).default("active").notNull(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  source: varchar("source", { length: 100 }), // e.g., "homepage", "footer", "blog"
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

/**
 * Daily Good News editions table for generated newspapers
 */
export const dailyGoodNewsEditions = mysqlTable("dailyGoodNewsEditions", {
  id: int("id").autoincrement().primaryKey(),
  editionDate: timestamp("editionDate").notNull().unique(), // Date of the edition
  headline: varchar("headline", { length: 255 }).notNull(),
  stories: text("stories").notNull(), // JSON array of news stories
  reminiscenceContent: text("reminiscenceContent"), // "On This Day" historical content
  quote: text("quote"), // Uplifting quote of the day
  pdfUrl: varchar("pdfUrl", { length: 500 }), // URL to generated PDF
  pdfKey: varchar("pdfKey", { length: 500 }), // S3 key for PDF
  downloadCount: int("downloadCount").default(0).notNull(),
  generatedBy: int("generatedBy"), // User ID who generated it (if manual)
  isExample: boolean("isExample").default(false).notNull(), // Flag for public example edition
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DailyGoodNewsEdition = typeof dailyGoodNewsEditions.$inferSelect;
export type InsertDailyGoodNewsEdition = typeof dailyGoodNewsEditions.$inferInsert;
/**
 * Booked training dates — auto-populated by Stripe webhook.
 * When a checkout.session.completed event arrives with a booking_date in metadata,
 * that date is inserted here and the calendar marks it as sold out.
 */
export const bookedDates = mysqlTable("bookedDates", {
  id: int("id").autoincrement().primaryKey(),
  bookingDate: varchar("bookingDate", { length: 10 }).notNull().unique(), // "YYYY-MM-DD"
  courseKey: varchar("courseKey", { length: 100 }).notNull(),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).notNull().unique(),
  customerEmail: varchar("customerEmail", { length: 320 }),
  amount: int("amount"), // in pence
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type BookedDate = typeof bookedDates.$inferSelect;
export type InsertBookedDate = typeof bookedDates.$inferInsert;
