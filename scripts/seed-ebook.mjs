/**
 * Seed the family ebook into the database.
 * Run: node scripts/seed-ebook.mjs
 */
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const EBOOK_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/understanding-dementia-family-guide_a4f46195.pdf";
const EBOOK_KEY = "310519663195447750/C4sZdm4AzTGBpMWqRug5mc/understanding-dementia-family-guide_a4f46195.pdf";

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(conn);

  // Get the owner user id (admin)
  const [ownerRows] = await conn.execute("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
  const owner = ownerRows[0];
  if (!owner) {
    console.error("No admin user found. Please log in to the site first to create your account.");
    process.exit(1);
  }
  const authorId = owner.id;
  console.log("Found admin user id:", authorId);

  // Check if ebook already exists
  const [existing] = await conn.execute("SELECT id FROM ebooks WHERE slug = 'understanding-dementia-family-guide' LIMIT 1");
  if (existing.length > 0) {
    console.log("Ebook already exists. Updating...");
    await conn.execute(
      `UPDATE ebooks SET 
        title = ?,
        description = ?,
        fileUrl = ?,
        fileKey = ?,
        fileSize = ?,
        category = ?,
        tags = ?,
        published = 1,
        authorId = ?
       WHERE slug = 'understanding-dementia-family-guide'`,
      [
        "Understanding Dementia: A Practical Guide for Families",
        "A warm, accessible 7-page guide for families caring for someone with dementia. Covers what dementia is, how it feels, communication tips, practical day-to-day support, self-care, and where to find help. Ends with a soft call to action for the £25 Family Workshop.",
        EBOOK_URL,
        EBOOK_KEY,
        16038,
        "Families",
        "dementia,families,guide,communication,self-care",
        authorId,
      ]
    );
    console.log("Ebook updated successfully.");
  } else {
    console.log("Inserting new ebook...");
    await conn.execute(
      `INSERT INTO ebooks (title, slug, description, fileUrl, fileKey, fileSize, category, tags, downloadCount, authorId, published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, 1)`,
      [
        "Understanding Dementia: A Practical Guide for Families",
        "understanding-dementia-family-guide",
        "A warm, accessible 7-page guide for families caring for someone with dementia. Covers what dementia is, how it feels, communication tips, practical day-to-day support, self-care, and where to find help. Ends with a soft call to action for the £25 Family Workshop.",
        EBOOK_URL,
        EBOOK_KEY,
        16038,
        "Families",
        "dementia,families,guide,communication,self-care",
        authorId,
      ]
    );
    console.log("Ebook inserted successfully.");
  }

  await conn.end();
}

main().catch(console.error);
