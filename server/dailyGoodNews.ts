import { invokeLLM } from "./_core/llm";

export interface NewsStory {
  title: string;
  content: string;
  source?: string;
}

export interface DailyGoodNewsContent {
  headline: string;
  stories: NewsStory[];
  reminiscenceContent: string;
  quote: string;
}

/**
 * Generate Daily Good News content for a specific date
 */
export async function generateDailyGoodNewsContent(date: Date): Promise<DailyGoodNewsContent> {
  const dateStr = date.toLocaleDateString('en-GB', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Use LLM to generate positive news stories
  const newsPrompt = `You are creating content for "Daily Good News" - a respectful, dignified newspaper for older people in UK care homes.

Today's date: ${dateStr}

Create 3 heartwarming news stories for today. Each story should be:
- Uplifting and positive (real or realistic scenarios from the UK)
- Respectful (not patronising or condescending)
- 80-120 words
- Written in clear, accessible British English
- Use UK spelling (e.g., colour, organise, centre, favour)
- Use UK terminology ("older people" or "residents", never "seniors")
- Focus on UK locations, communities, and organisations
- Topics: community achievements, acts of kindness, scientific breakthroughs, animal stories, environmental wins, cultural celebrations

Make the stories feel current and relevant to today's date with a distinctly British flavour.

Return your response as JSON with this structure:
{
  "headline": "A cheerful headline for today's edition",
  "stories": [
    {
      "title": "Story title",
      "content": "Story content (80-120 words)",
      "source": "Brief source attribution"
    }
  ]
}`;

  const newsResponse = await invokeLLM({
    messages: [
      { role: "system", content: "You are a British journalist creating uplifting news content for older readers in the UK. Use British English spelling and terminology throughout." },
      { role: "user", content: newsPrompt }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "daily_good_news",
        strict: true,
        schema: {
          type: "object",
          properties: {
            headline: { type: "string", description: "Main headline for today's edition" },
            stories: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  content: { type: "string" },
                  source: { type: "string" }
                },
                required: ["title", "content", "source"],
                additionalProperties: false
              }
            }
          },
          required: ["headline", "stories"],
          additionalProperties: false
        }
      }
    }
  });

  const newsContentRaw = newsResponse.choices[0].message.content;
  const newsContent = JSON.parse(typeof newsContentRaw === 'string' ? newsContentRaw : "{}");

  // Generate "On This Day" reminiscence content
  const reminiscencePrompt = `Create an "On This Day" section for ${dateStr}.

Include 2-3 interesting historical events that happened on this date in history, with preference for British history and events relevant to UK readers. Focus on:
- Positive, memorable events
- Cultural milestones
- Scientific achievements
- Celebrations

Use British English spelling throughout (e.g., colour, organise, favour).
Write in a warm, engaging tone. Keep it to 100-150 words total.`;

  const reminiscenceResponse = await invokeLLM({
    messages: [
      { role: "system", content: "You are a British historian creating engaging reminiscence content for older readers in the UK. Use British English spelling throughout." },
      { role: "user", content: reminiscencePrompt }
    ]
  });

  const reminiscenceContent = typeof reminiscenceResponse.choices[0].message.content === 'string' 
    ? reminiscenceResponse.choices[0].message.content 
    : "";

  // Generate uplifting quote
  const quotePrompt = `Provide one uplifting, inspirational quote suitable for older readers in the UK. 
  
The quote should be:
- Positive and encouraging
- From a well-known British figure, author, or traditional wisdom (prefer British sources when possible)
- Not cliché or patronising
- Include attribution

Format: "Quote text" - Attribution`;

  const quoteResponse = await invokeLLM({
    messages: [
      { role: "system", content: "You are selecting meaningful quotes for older readers in the UK, preferring British authors and figures when possible." },
      { role: "user", content: quotePrompt }
    ]
  });

  const quote = typeof quoteResponse.choices[0].message.content === 'string' 
    ? quoteResponse.choices[0].message.content 
    : "";

  return {
    headline: newsContent.headline || "Today's Good News",
    stories: newsContent.stories || [],
    reminiscenceContent,
    quote
  };
}
