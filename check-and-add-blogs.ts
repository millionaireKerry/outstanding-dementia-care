import { getDb } from './server/db';
import { blogPosts } from './drizzle/schema';

async function checkExistingBlogs() {
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    process.exit(1);
  }
  const existing = await db.select({ title: blogPosts.title, slug: blogPosts.slug }).from(blogPosts);
  
  console.log('=== EXISTING BLOG POSTS ===');
  existing.forEach((post, idx) => {
    console.log(`${idx + 1}. ${post.title}`);
    console.log(`   Slug: ${post.slug}\n`);
  });
  
  console.log(`\nTotal: ${existing.length} blog posts`);
  
  process.exit(0);
}

checkExistingBlogs().catch(console.error);
