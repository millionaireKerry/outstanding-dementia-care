import { generateDailyGoodNewsContent } from '../server/dailyGoodNews';
import { generateDailyGoodNewsPDF } from '../server/dailyGoodNewsPDF';
import { storagePut } from '../server/storage';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  console.log('Generating content...');
  const today = new Date();
  const content = await generateDailyGoodNewsContent(today);
  console.log('Content generated. Headline:', content.headline);
  
  console.log('Generating PDF...');
  const pdfBuffer = await generateDailyGoodNewsPDF(content, today);
  console.log('PDF size:', pdfBuffer.length, 'bytes');
  
  const dateStr = today.toISOString().split('T')[0];
  const fileKey = `daily-good-news/${dateStr}.pdf`;
  console.log('Uploading to S3...');
  const { url } = await storagePut(fileKey, pdfBuffer, 'application/pdf');
  console.log('Uploaded to:', url);
  
  const conn = await mysql.createConnection(process.env.DATABASE_URL!);
  // Use correct column names from schema: stories, reminiscenceContent, quote
  await conn.execute(
    'INSERT INTO dailyGoodNewsEditions (headline, stories, reminiscenceContent, quote, pdfUrl, pdfKey, editionDate, downloadCount) VALUES (?, ?, ?, ?, ?, ?, ?, 0)',
    [
      content.headline,
      JSON.stringify(content.stories),
      content.reminiscenceSection ? JSON.stringify(content.reminiscenceSection) : null,
      content.quote ? JSON.stringify(content.quote) : null,
      url,
      fileKey,
      today
    ]
  );
  await conn.end();
  console.log('Saved to database. Done!');
}

main().catch(e => { console.error(e); process.exit(1); });
