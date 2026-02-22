import PDFDocument from 'pdfkit';
import { DailyGoodNewsContent, NewsStory } from './dailyGoodNews';

/**
 * Generate a PDF for Daily Good News edition
 * Returns a Buffer containing the PDF data
 */
export async function generateDailyGoodNewsPDF(
  content: DailyGoodNewsContent,
  date: Date
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50
        }
      });

      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const dateStr = date.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Page 1: Front Page with News Stories
      // Masthead
      doc.fontSize(32)
        .font('Helvetica-Bold')
        .text('DAILY GOOD NEWS', { align: 'center' });

      doc.moveDown(0.3);
      doc.fontSize(12)
        .font('Helvetica')
        .text(dateStr, { align: 'center' });

      doc.moveDown(0.5);
      doc.strokeColor('#000000')
        .lineWidth(2)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke();

      doc.moveDown(1);

      // Headline
      doc.fontSize(20)
        .font('Helvetica-Bold')
        .text(content.headline, { align: 'center' });

      doc.moveDown(1);

      // News Stories - limit to first 3 and keep content concise
      const displayStories = content.stories.slice(0, 3);
      displayStories.forEach((story: NewsStory, index: number) => {
        // Check if we're approaching bottom of page, leave room for footer
        if (doc.y > 650) {
          return; // Skip remaining stories if running out of space
        }

        if (index > 0) {
          doc.moveDown(0.6);
        }

        // Story title
        doc.fontSize(14)
          .font('Helvetica-Bold')
          .text(story.title, {
            continued: false
          });

        doc.moveDown(0.2);

        // Story content - truncate if too long
        const truncatedContent = story.content.length > 150 
          ? story.content.substring(0, 147) + '...' 
          : story.content;
        
        doc.fontSize(10)
          .font('Helvetica')
          .text(truncatedContent, {
            align: 'justify',
            lineGap: 1
          });

        // Source attribution
        if (story.source) {
          doc.moveDown(0.1);
          doc.fontSize(8)
            .font('Helvetica-Oblique')
            .fillColor('#666666')
            .text(`— ${story.source}`, { align: 'right' });
          doc.fillColor('#000000');
        }
      });

      // Page 2: Reminiscence & Quote
      doc.addPage();

      // "On This Day" Section
      doc.fontSize(18)
        .font('Helvetica-Bold')
        .text('On This Day', { align: 'center' });

      doc.moveDown(0.5);
      doc.strokeColor('#000000')
        .lineWidth(1)
        .moveTo(150, doc.y)
        .lineTo(445, doc.y)
        .stroke();

      doc.moveDown(1);

      // Truncate reminiscence content if too long to fit on one page
      const truncatedReminiscence = content.reminiscenceContent.length > 400
        ? content.reminiscenceContent.substring(0, 397) + '...'
        : content.reminiscenceContent;

      doc.fontSize(10)
        .font('Helvetica')
        .text(truncatedReminiscence, {
          align: 'justify',
          lineGap: 2
        });

      doc.moveDown(2);

      // Quote of the Day
      doc.fontSize(16)
        .font('Helvetica-Bold')
        .text('Thought for Today', { align: 'center' });

      doc.moveDown(0.5);
      doc.strokeColor('#000000')
        .lineWidth(1)
        .moveTo(150, doc.y)
        .lineTo(445, doc.y)
        .stroke();

      doc.moveDown(1);

      doc.fontSize(13)
        .font('Helvetica-Oblique')
        .text(content.quote, {
          align: 'center',
          lineGap: 4
        });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
