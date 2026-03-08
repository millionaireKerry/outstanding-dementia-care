import mysql from 'mysql2/promise';

const content = `# The Backbone of Dementia Care: Celebrating Women on International Women's Day

*8th March 2026*

---

Today is International Women's Day, and in care homes, community care settings, and family living rooms across the UK, the vast majority of the people holding hands, wiping tears, and quietly making life better for someone living with dementia are women.

That is not a small thing. It is the foundation on which dementia care is built.

---

## The Numbers Tell a Story

The UK care sector employs approximately 1.52 million people, and around 78% of them are women. In dementia-specific care roles, that proportion is even higher. When you add the estimated 700,000 unpaid carers supporting someone with dementia at home, the picture becomes even clearer: women are the invisible infrastructure of dementia care in this country.

They are care assistants, registered nurses, activities coordinators, home managers, and deputy managers. They are daughters who have quietly rearranged their lives around a parent's diagnosis. They are wives who have become full-time carers without ever being asked if they were ready.

They do this work with extraordinary skill, compassion, and dedication. And they do it, far too often, without adequate recognition, pay, or support.

---

## The Emotional Labour Nobody Talks About

There is a particular kind of work that goes on in dementia care that rarely appears in a job description. It is the work of holding someone's distress without absorbing it. Of finding the right words when there are no right words. Of sitting with grief, confusion, and fear, and somehow transforming the atmosphere of a room through sheer human presence.

This is emotional labour. And research consistently shows it falls disproportionately on women, both in professional care settings and at home.

The woman who spends forty minutes coaxing a resident into the bath, not through force but through patience, humour, and a deep knowledge of that person's life history, is performing a skilled clinical and relational act. The fact that it looks like kindness does not make it any less expert.

We need to name this work for what it is: professional, skilled, and essential.

---

## Women Leading the Way in Dementia Research and Advocacy

It is not only in direct care that women are shaping the landscape of dementia. Some of the most important voices in dementia research, policy, and advocacy are women.

Professor Alistair Burns may be a familiar name, but so too should be Professor Gill Livingston, whose landmark Lancet Commission reports on dementia prevention have changed how the world understands the condition. Professor Dawn Brooker, who developed the VIPS framework for person-centred care, has influenced practice in care homes across the globe. Kate Swaffer, a woman living with dementia herself, co-founded Dementia Alliance International and has spent years insisting that people with dementia are experts in their own experience.

These women, and many others like them, have pushed the field forward. Their work sits behind every good care plan, every compassionate interaction, every training programme that takes personhood seriously.

---

## The Pay Gap in Care

We cannot celebrate women in care without being honest about the conditions in which they work.

The median hourly pay for a care worker in England is still below the Real Living Wage in many settings. The gender pay gap in health and social care, while narrowing, persists. Women in care are more likely to work part-time, more likely to be on zero-hours contracts, and less likely to progress into senior leadership roles despite making up the majority of the workforce.

This is not a reflection of the value of the work. It is a reflection of how society has historically valued work that is associated with women, with care, and with emotion.

If we are serious about improving the quality of dementia care in this country, we have to be serious about the pay, conditions, and career development of the women who deliver it.

---

## A Note to the Women Reading This

If you are a care worker, a nurse, a manager, or a family carer supporting someone with dementia, this is for you.

What you do is not easy. It is not simple. It is not something that anyone could do. It requires knowledge, skill, resilience, creativity, and a depth of compassion that is genuinely rare.

On the days when it feels invisible, when the thank-yous do not come and the paperwork piles up and someone you have cared for deeply is no longer there, please know that what you do matters profoundly. The moments of connection you create, the dignity you protect, the fear you ease: these things are real, and they are lasting.

You are not just doing a job. You are holding someone's world together.

---

## What Outstanding Dementia Care Believes

At Outstanding Dementia Care, we believe that the quality of care a person with dementia receives is directly connected to how well the people delivering that care are supported, trained, and valued.

That is why we are committed to providing free resources, practical tools, and evidence-based training for carers, whether you are a professional in a care home or a family member navigating this journey at home.

On International Women's Day, we want to say clearly: we see you, we value you, and we are here to support you.

---

*Written by Outstanding Dementia Care | 8th March 2026*

*If this post resonated with you, share it with a woman in care who deserves to hear it today. And if you are looking for free resources, downloadable guides, or training for your team, explore the rest of our site. Everything here is for you.*`;

const excerpt = "On International Women's Day, we celebrate the women who form the backbone of dementia care in the UK — the professionals, the family carers, and the researchers who hold the world together, often without the recognition they deserve.";

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);

  // Check if post already exists
  const [existing] = await conn.execute(
    "SELECT id FROM blogPosts WHERE slug = 'women-in-dementia-care-international-womens-day' LIMIT 1"
  );
  if (existing.length > 0) {
    console.log('Blog post already exists, skipping insert.');
    await conn.end();
    return;
  }

  await conn.execute(
    `INSERT INTO blogPosts (title, slug, excerpt, content, coverImageUrl, category, tags, authorId, published, featured, publishedAt, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`,
    [
      "The Backbone of Dementia Care: Celebrating Women on International Women's Day",
      'women-in-dementia-care-international-womens-day',
      excerpt,
      content,
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/iwd-blog-cover_5879ad4a.png',
      'Carers & Wellbeing',
      "International Women's Day,Women in Care,Dementia Carers,Care Workers,Unpaid Carers,Gender Pay Gap",
      1,
      1, // published
      1, // featured
    ]
  );

  console.log('IWD blog post inserted successfully.');
  await conn.end();
}

main().catch(console.error);
