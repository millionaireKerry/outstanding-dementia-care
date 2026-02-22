import { getDb } from './server/db';
import { blogPosts } from './drizzle/schema';
import { desc } from 'drizzle-orm';

async function checkBlogOrder() {
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    process.exit(1);
  }

  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.featured), desc(blogPosts.publishedAt), desc(blogPosts.createdAt));
  
  console.log('=== BLOG POST ORDER (as will appear on page) ===\n');
  
  posts.forEach((post, idx) => {
    console.log(`${idx + 1}. ${post.title}`);
    console.log(`   Featured: ${post.featured ? 'YES ⭐' : 'NO'}`);
    console.log(`   Published: ${post.publishedAt ? post.publishedAt.toISOString().split('T')[0] : 'NULL'}`);
    console.log(`   Created: ${post.createdAt.toISOString().split('T')[0]}`);
    console.log('');
  });
  
  process.exit(0);
}

checkBlogOrder().catch(console.error);
