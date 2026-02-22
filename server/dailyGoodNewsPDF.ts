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

      // News Stories
      content.stories.forEach((story: NewsStory, index: number) => {
        if (index > 0) {
          doc.moveDown(0.8);
        }

        // Story title
        doc.fontSize(16)
          .font('Helvetica-Bold')
          .text(story.title);

        doc.moveDown(0.3);

        // Story content
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

      // Add footer to page 1 before moving to page 2
      const addFooter = (pageNum: number) => {
        doc.fontSize(9)
          .font('Helvetica')
          .fillColor('#666666')
          .text(
            `Daily Good News • ${dateStr} • Page ${pageNum} of 2`,
            50,
            doc.page.height - 40,
            {
              align: 'center',
              width: doc.page.width - 100
            }
          );
        doc.fillColor('#000000');
      };

      addFooter(1);

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

      doc.fontSize(11)
        .font('Helvetica')
        .text(content.reminiscenceContent, {
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

      // Add footer to page 2
      doc.fontSize(9)
        .font('Helvetica')
        .fillColor('#666666')
        .text(
          `Daily Good News • ${dateStr} • Page 2 of 2`,
          50,
          doc.page.height - 40,
          {
            align: 'center',
            width: doc.page.width - 100
          }
        );
      doc.fillColor('#000000');

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
