import PDFDocument from 'pdfkit';
import fs from 'fs';

const doc = new PDFDocument({ size: 'A4', margins: { top: 50, bottom: 50, left: 50, right: 50 } });
doc.pipe(fs.createWriteStream('/home/ubuntu/test-simple.pdf'));

// Page 1
doc.fontSize(20).text('Page 1 Content');
const y1 = doc.y;
doc.text('Footer 1', 50, doc.page.height - 50, { lineBreak: false });
doc.y = y1;  // Restore position

// Page 2
doc.addPage();
doc.fontSize(20).text('Page 2 Content');
const y2 = doc.y;
doc.text('Footer 2', 50, doc.page.height - 50, { lineBreak: false });
doc.y = y2;  // Restore position

doc.end();
