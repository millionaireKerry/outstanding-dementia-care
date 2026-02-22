import { getDb } from './server/db';
import { blogPosts } from './drizzle/schema';
import { readFileSync } from 'fs';

const AUTHOR_ID = 1;

const newBlogs = [
  {
    title: 'Different Generations, Same Care: Why a 40-Year Age Gap Is Not a Minor Detail',
    slug: 'different-generations-same-care',
    excerpt: 'A person born in 1923 and a person born in 1958 sitting in the same care home lounge are not the same. They have different music, different food, different politics, different expectations—and treating them as the same is a systematic failure to see either of them clearly.',
    content: readFileSync('/home/ubuntu/upload/different-generations-same-care-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/EoGfXTAOWrxxYORO.png',
    category: 'Person-Centred Care',
    tags: 'generational differences, person-centred care, personhood, life story work, activities',
    readTime: 14,
  },
  {
    title: 'Put Down the Pool Noodle: On the Right to Do Absolutely Nothing',
    slug: 'pool-noodle-right-to-do-nothing',
    excerpt: 'Some people are energised by company and bustle. Others prefer quiet and solitude. These preferences do not evaporate when someone moves into a care home—and the right to rest, to be still, to decline the aqua aerobics, is just as valid as the right to participate.',
    content: readFileSync('/home/ubuntu/upload/pool-noodle-right-to-do-nothing-dementia-care-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/mCYMBxDvUwFbxfwk.png',
    category: 'Person-Centred Care',
    tags: 'activities, autonomy, person-centred care, wellbeing, dignity of risk',
    readTime: 13,
  },
];

async function addBlogs() {
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    process.exit(1);
  }

  console.log(`Adding ${newBlogs.length} final blog posts...\n`);

  for (const blog of newBlogs) {
    try {
      await db.insert(blogPosts).values({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        coverImageUrl: blog.coverImage,
        category: blog.category,
        tags: blog.tags,
        readTime: blog.readTime,
        authorId: AUTHOR_ID,
        featured: false,
        published: true,
        publishedAt: new Date('2026-02-22'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✓ Added: ${blog.title}`);
    } catch (error) {
      console.error(`✗ Failed to add: ${blog.title}`);
      console.error(error);
    }
  }

  console.log(`\n✓ All blog posts added successfully!`);
  process.exit(0);
}

addBlogs().catch(console.error);
