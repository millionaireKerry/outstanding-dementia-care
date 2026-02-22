import { getDb } from './server/db';
import { blogPosts } from './drizzle/schema';

async function checkBlogIssues() {
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    process.exit(1);
  }

  const posts = await db.select().from(blogPosts).orderBy(blogPosts.createdAt);
  
  console.log('=== BLOG POSTS STATUS ===\n');
  
  posts.forEach((post, idx) => {
    console.log(`${idx + 1}. ${post.title}`);
    console.log(`   Slug: ${post.slug}`);
    console.log(`   Featured: ${post.featured ? 'YES' : 'NO'}`);
    console.log(`   Published: ${post.published ? 'YES' : 'NO'}`);
    console.log(`   Published At: ${post.publishedAt || 'NULL'}`);
    console.log(`   Cover Image: ${post.coverImageUrl ? 'YES' : 'MISSING'}`);
    console.log(`   Created: ${post.createdAt}`);
    console.log('');
  });
  
  console.log(`\nTotal: ${posts.length} blog posts`);
  
  // Check for issues
  const missingImages = posts.filter(p => !p.coverImageUrl);
  const unpublished = posts.filter(p => !p.published);
  const missingPublishDate = posts.filter(p => p.published && !p.publishedAt);
  
  console.log('\n=== ISSUES FOUND ===');
  console.log(`Posts missing cover images: ${missingImages.length}`);
  if (missingImages.length > 0) {
    missingImages.forEach(p => console.log(`  - ${p.title}`));
  }
  
  console.log(`\nUnpublished posts: ${unpublished.length}`);
  if (unpublished.length > 0) {
    unpublished.forEach(p => console.log(`  - ${p.title}`));
  }
  
  console.log(`\nPublished posts missing publishedAt date: ${missingPublishDate.length}`);
  if (missingPublishDate.length > 0) {
    missingPublishDate.forEach(p => console.log(`  - ${p.title}`));
  }
  
  process.exit(0);
}

checkBlogIssues().catch(console.error);
