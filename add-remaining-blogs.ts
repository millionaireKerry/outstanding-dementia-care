import { getDb } from './server/db';
import { blogPosts } from './drizzle/schema';
import { readFileSync } from 'fs';

const AUTHOR_ID = 1; // Default admin user ID

const newBlogs = [
  {
    title: 'Activities Are Not a Tick Box: Why the Schedule Should Come from Your Residents, Not Your Head Office',
    slug: 'meaningful-activities-not-tick-box',
    excerpt: 'The evidence on meaningful activity in dementia care is unambiguous. Research consistently identifies meaningful activity and social engagement as among the most persistently and critically unmet needs in residential care settings.',
    content: readFileSync('/home/ubuntu/upload/meaningful-activities-not-tick-box-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/zWlKUntdEvyBsjSm.png',
    category: 'Person-Centred Care',
    tags: 'activities, person-centred care, autonomy, meaningful engagement, CQC',
    readTime: 15,
  },
  {
    title: 'A Walk Down Memory Lane: Using Google Street View to Reconnect People with Dementia to the Places That Shaped Them',
    slug: 'walk-down-memory-lane-streetview',
    excerpt: 'Place is not just geography. It is memory, identity, and connection. For people with dementia, returning to the places that shaped them can unlock stories, emotions, and a sense of self that daily life in a care home rarely reaches.',
    content: readFileSync('/home/ubuntu/upload/walk-down-memory-lane-streetview-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/cUPIzoIMttPgNlOB.png',
    category: 'Activities & Engagement',
    tags: 'technology, memory, life story work, Google Street View, reminiscence',
    readTime: 12,
  },
  {
    title: "That's My Spot: Why Familiarity and Routine Are Not Boring—They're Essential",
    slug: 'comfort-of-familiarity-dementia',
    excerpt: 'For people with dementia, familiarity is not a limitation. It is a lifeline. It is the difference between a day that feels safe and a day that feels chaotic.',
    content: readFileSync('/home/ubuntu/upload/comfort-of-familiarity-dementia-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/LGWLRRDyCpzgpbkG.png',
    category: 'Person-Centred Care',
    tags: 'routine, familiarity, environment, person-centred care, wellbeing',
    readTime: 10,
  },
  {
    title: 'Mealtimes Are Not Just About Food: Creating a Dining Experience That Respects the Person',
    slug: 'mealtimes-dining-experience-dementia',
    excerpt: 'Mealtimes in care homes are often treated as logistical events. They should be social, sensory, and deeply personal experiences that honour who each person is.',
    content: readFileSync('/home/ubuntu/upload/mealtimes-dining-experience-dementia-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/VxxqjOMfBThnwNVY.png',
    category: 'Person-Centred Care',
    tags: 'mealtimes, dining, nutrition, environment, person-centred care',
    readTime: 11,
  },
  {
    title: 'The Daily Good News: Why Every Care Home Should Start the Day with Something Positive',
    slug: 'daily-good-news-dementia-care',
    excerpt: 'Starting each day with good news is not frivolous. It is a deliberate, evidence-based intervention that improves mood, reduces anxiety, and creates a culture of positivity.',
    content: readFileSync('/home/ubuntu/upload/daily-good-news-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/QyOwRYKHKdyzMolW.png',
    category: 'Activities & Engagement',
    tags: 'wellbeing, activities, positive psychology, mood, culture',
    readTime: 9,
  },
  {
    title: 'Dementia Pocket Expert: Your On-Demand Resource for Evidence-Based Dementia Care',
    slug: 'dementia-pocket-expert-app',
    excerpt: 'Dementia Pocket Expert is a voice-activated AI assistant designed specifically for dementia care professionals, providing instant access to evidence-based guidance when you need it most.',
    content: readFileSync('/home/ubuntu/upload/dementia-pocket-expert-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/ynIXCXOLTOEKDqHo.png',
    category: 'Products',
    tags: 'technology, training, AI, voice assistant, products',
    readTime: 8,
  },
  {
    title: 'Care Home Survey Dashboard: Understanding What Residents, Families, and Staff Really Think',
    slug: 'care-home-survey-dashboard',
    excerpt: 'The Care Home Survey Dashboard provides a simple, powerful way to collect and analyse feedback from residents, families, and staff—turning insights into action.',
    content: readFileSync('/home/ubuntu/upload/care-home-survey-dashboard-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/NYAULPPFzrUjGQsC.png',
    category: 'Products',
    tags: 'quality improvement, feedback, surveys, CQC, products',
    readTime: 7,
  },
  {
    title: 'Care Documentation Audit: Ensuring Your Care Plans Meet CQC Standards',
    slug: 'care-documentation-audit-app',
    excerpt: 'The Care Documentation Audit app helps care homes systematically review and improve their care documentation, ensuring compliance with CQC standards and best practice.',
    content: readFileSync('/home/ubuntu/upload/care-documentation-audit-app-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/eFKwcKMIdhzKvscs.png',
    category: 'Products',
    tags: 'care plans, documentation, CQC, audit, products',
    readTime: 7,
  },
  {
    title: 'The Listening Pod: Capturing Life Stories That Matter',
    slug: 'listening-pod-life-stories',
    excerpt: 'The Listening Pod is a simple, powerful tool for recording and preserving the life stories of people with dementia—creating a lasting legacy for families and invaluable context for care staff.',
    content: readFileSync('/home/ubuntu/upload/listening-pod-blog.md', 'utf-8'),
    coverImage: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/XKJEYKKiPMVjWUhP.png',
    category: 'Products',
    tags: 'life story work, reminiscence, technology, products, families',
    readTime: 8,
  },
];

async function addBlogs() {
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    process.exit(1);
  }

  console.log(`Adding ${newBlogs.length} new blog posts...\n`);

  for (const blog of newBlogs) {
    try {
      await db.insert(blogPosts).values({
        ...blog,
        authorId: AUTHOR_ID,
        featured: false,
        published: true,
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
