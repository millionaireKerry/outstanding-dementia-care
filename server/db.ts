import { eq, desc, like, or, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, blogPosts, InsertBlogPost, ebooks, InsertEbook, supportGroups, InsertSupportGroup, newsletterSubscribers, InsertNewsletterSubscriber } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Blog Post Helpers
export async function getAllBlogPosts(publishedOnly: boolean = true) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = publishedOnly ? eq(blogPosts.published, true) : undefined;
  const result = await db
    .select()
    .from(blogPosts)
    .where(conditions)
    .orderBy(desc(blogPosts.createdAt));
  
  return result;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(blogPosts).values(post);
  return result;
}

export async function updateBlogPost(id: number, post: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

export async function searchBlogPosts(query: string) {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.published, true),
        or(
          like(blogPosts.title, `%${query}%`),
          like(blogPosts.content, `%${query}%`),
          like(blogPosts.tags, `%${query}%`)
        )
      )
    )
    .orderBy(desc(blogPosts.createdAt));
  
  return result;
}

// Ebook Helpers
export async function getAllEbooks(publishedOnly: boolean = true) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = publishedOnly ? eq(ebooks.published, true) : undefined;
  const result = await db
    .select()
    .from(ebooks)
    .where(conditions)
    .orderBy(desc(ebooks.createdAt));
  
  return result;
}

export async function getEbookById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(ebooks).where(eq(ebooks.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createEbook(ebook: InsertEbook) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(ebooks).values(ebook);
  return result;
}

export async function updateEbook(id: number, ebook: Partial<InsertEbook>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(ebooks).set(ebook).where(eq(ebooks.id, id));
}

export async function deleteEbook(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(ebooks).where(eq(ebooks.id, id));
}

export async function incrementEbookDownload(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const ebook = await getEbookById(id);
  if (ebook) {
    await db.update(ebooks).set({ downloadCount: (ebook.downloadCount || 0) + 1 }).where(eq(ebooks.id, id));
  }
}

// Support Group Helpers
export async function getAllSupportGroups(publishedOnly: boolean = true) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = publishedOnly ? eq(supportGroups.published, true) : undefined;
  const result = await db
    .select()
    .from(supportGroups)
    .where(conditions)
    .orderBy(desc(supportGroups.createdAt));
  
  return result;
}

export async function getSupportGroupById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(supportGroups).where(eq(supportGroups.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createSupportGroup(group: InsertSupportGroup) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(supportGroups).values(group);
  return result;
}

export async function updateSupportGroup(id: number, group: Partial<InsertSupportGroup>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(supportGroups).set(group).where(eq(supportGroups.id, id));
}

export async function deleteSupportGroup(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(supportGroups).where(eq(supportGroups.id, id));
}

// Newsletter Subscriber Helpers
export async function getAllNewsletterSubscribers(activeOnly: boolean = true) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = activeOnly ? eq(newsletterSubscribers.status, 'active') : undefined;
  const result = await db
    .select()
    .from(newsletterSubscribers)
    .where(conditions)
    .orderBy(desc(newsletterSubscribers.subscribedAt));
  
  return result;
}

export async function getNewsletterSubscriberByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(newsletterSubscribers).values(subscriber);
  return result;
}

export async function unsubscribeNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(newsletterSubscribers)
    .set({ status: 'unsubscribed', unsubscribedAt: new Date() })
    .where(eq(newsletterSubscribers.email, email));
}
