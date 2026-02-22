import { describe, it, expect } from 'vitest';
import { generateDailyGoodNewsContent } from './dailyGoodNews';
import { generateDailyGoodNewsPDF } from './dailyGoodNewsPDF';

describe('Daily Good News', () => {
  it('should generate daily good news content with all required fields', async () => {
    const testDate = new Date('2026-02-22');
    
    const content = await generateDailyGoodNewsContent(testDate);
    
    // Check all required fields exist
    expect(content).toHaveProperty('headline');
    expect(content).toHaveProperty('stories');
    expect(content).toHaveProperty('reminiscenceContent');
    expect(content).toHaveProperty('quote');
    
    // Check headline is not empty
    expect(content.headline).toBeTruthy();
    expect(typeof content.headline).toBe('string');
    
    // Check stories array
    expect(Array.isArray(content.stories)).toBe(true);
    expect(content.stories.length).toBeGreaterThan(0);
    
    // Check each story has required fields
    content.stories.forEach((story) => {
      expect(story).toHaveProperty('title');
      expect(story).toHaveProperty('content');
      expect(story).toHaveProperty('source');
      expect(typeof story.title).toBe('string');
      expect(typeof story.content).toBe('string');
      expect(story.title.length).toBeGreaterThan(0);
      expect(story.content.length).toBeGreaterThan(0);
    });
    
    // Check reminiscence content
    expect(typeof content.reminiscenceContent).toBe('string');
    expect(content.reminiscenceContent.length).toBeGreaterThan(0);
    
    // Check quote
    expect(typeof content.quote).toBe('string');
    expect(content.quote.length).toBeGreaterThan(0);
  }, 60000); // 60 second timeout for LLM calls

  it('should generate a valid PDF buffer', async () => {
    const testDate = new Date('2026-02-22');
    const testContent = {
      headline: 'Test Headline',
      stories: [
        {
          title: 'Test Story 1',
          content: 'This is a test story about something positive and uplifting. It should be long enough to demonstrate the PDF generation working correctly with proper formatting and layout.',
          source: 'Test Source'
        },
        {
          title: 'Test Story 2',
          content: 'Another test story with positive content. This one also needs to be sufficiently long to test the PDF layout and ensure everything renders properly.',
          source: 'Test Source 2'
        }
      ],
      reminiscenceContent: 'On this day in history, something wonderful happened. This is a test of the reminiscence content section.',
      quote: '"This is a test quote for the day." - Test Author'
    };
    
    const pdfBuffer = await generateDailyGoodNewsPDF(testContent, testDate);
    
    // Check PDF buffer is valid
    expect(Buffer.isBuffer(pdfBuffer)).toBe(true);
    expect(pdfBuffer.length).toBeGreaterThan(0);
    
    // Check PDF header (PDF files start with %PDF)
    const pdfHeader = pdfBuffer.toString('utf8', 0, 4);
    expect(pdfHeader).toBe('%PDF');
  }, 10000);

  it('should handle multiple stories in PDF generation', async () => {
    const testDate = new Date('2026-02-22');
    const testContent = {
      headline: 'Multiple Stories Test',
      stories: [
        {
          title: 'Story 1',
          content: 'Content for story 1 with enough text to test layout.',
          source: 'Source 1'
        },
        {
          title: 'Story 2',
          content: 'Content for story 2 with enough text to test layout.',
          source: 'Source 2'
        },
        {
          title: 'Story 3',
          content: 'Content for story 3 with enough text to test layout.',
          source: 'Source 3'
        }
      ],
      reminiscenceContent: 'Reminiscence content test.',
      quote: '"Test quote" - Author'
    };
    
    const pdfBuffer = await generateDailyGoodNewsPDF(testContent, testDate);
    
    expect(Buffer.isBuffer(pdfBuffer)).toBe(true);
    expect(pdfBuffer.length).toBeGreaterThan(0);
  }, 10000);
});
