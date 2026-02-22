import PDFDocument from 'pdfkit';
import { DailyGoodNewsContent, NewsStory } from './dailyGoodNews';
import axios from 'axios';

/**
 * Strip markdown formatting from text
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove **bold**
    .replace(/\*([^*]+)\*/g, '$1')     // Remove *italic*
    .replace(/__([^_]+)__/g, '$1')     // Remove __bold__
    .replace(/_([^_]+)_/g, '$1')       // Remove _italic_
    .replace(/##\s/g, '')              // Remove ## headers
    .replace(/#\s/g, '');              // Remove # headers
}

/**
 * Generate a PDF for Daily Good News edition
 * Returns a Buffer containing the PDF data
 */
export async function generateDailyGoodNewsPDF(
  content: DailyGoodNewsContent,
  date: Date
): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
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

      // Download banner image
      const bannerUrl = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663195447750/bfksglZjahpOnzyr.png';
      const bannerResponse = await axios.get(bannerUrl, { responseType: 'arraybuffer' });
      const bannerBuffer = Buffer.from(bannerResponse.data);

      // Page 1: Front Page with Banner and News Stories
      // Add banner image at top
      const bannerWidth = 495; // A4 width minus margins
      const bannerHeight = 80; // Proportional height
      doc.image(bannerBuffer, 50, 50, {
        width: bannerWidth,
        height: bannerHeight
      });

      // Move down after banner
      doc.y = 50 + bannerHeight + 20;

      // Date
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

      // News Stories - display all stories with full content
      content.stories.forEach((story: NewsStory, index: number) => {
        // Check if we need a new page (approaching bottom)
        if (doc.y > 680) {
          doc.addPage();
          // Add page header
          doc.fontSize(24)
            .font('Helvetica-Bold')
            .text('DAILY GOOD NEWS', { align: 'center' });
          doc.moveDown(0.3);
          doc.fontSize(10)
            .font('Helvetica')
            .text(dateStr, { align: 'center' });
          doc.moveDown(0.8);
        }

        if (index > 0) {
          doc.moveDown(0.8);
        }

        // Story title
        doc.fontSize(14)
          .font('Helvetica-Bold')
          .text(story.title, {
            continued: false
          });

        doc.moveDown(0.3);

        // Story content - display full content
        doc.fontSize(11)
          .font('Helvetica')
          .text(story.content, {
            align: 'justify',
            lineGap: 2
          });

        // Source attribution
        if (story.source) {
          doc.moveDown(0.2);
          doc.fontSize(9)
            .font('Helvetica-Oblique')
            .fillColor('#666666')
            .text(`— ${story.source}`, { align: 'right' });
          doc.fillColor('#000000');
        }
      });

      // Reminiscence & Quote page
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

      // Display full reminiscence content (strip markdown)
      doc.fontSize(11)
        .font('Helvetica')
        .text(stripMarkdown(content.reminiscenceContent), {
          align: 'justify',
          lineGap: 3
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
