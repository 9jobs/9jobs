import fs from 'node:fs';
import path from 'node:path';

import PDFDocument from 'pdfkit';

import { buildAgreementTemplate } from '@/lib/agreements/template';

const LOGO_PATH = path.join(process.cwd(), 'public', 'agreement', '9jobs-logo.png');
const PAGE_MARGIN_LEFT_RIGHT = 54;
const PAGE_MARGIN_TOP = 90; // Large top margin to make room for top-right logo on every page
const PAGE_MARGIN_BOTTOM = 60;

/**
 * Draws the logo on the top right and page number on the bottom of every page.
 */
function drawHeaderAndFooter(doc, logoPath) {
  const range = doc.bufferedPageRange();

  for (let index = range.start; index < range.start + range.count; index += 1) {
    doc.switchToPage(index);

    // Draw top-right logo
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, doc.page.width - PAGE_MARGIN_LEFT_RIGHT - 120, 30, {
        fit: [120, 45],
        align: 'right',
      });
    }

    // Draw footer (page numbers)
    const bottom = doc.page.height - PAGE_MARGIN_BOTTOM + 20;
    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor('#6b7280')
      .text(`Page ${index + 1} of ${range.count}`, PAGE_MARGIN_LEFT_RIGHT, bottom, {
        align: 'center',
        width: doc.page.width - PAGE_MARGIN_LEFT_RIGHT * 2,
      });
  }
}

/**
 * Writes a single section, parsing list items and formatting key phrases (before a colon) in bold.
 */
function writeSection(doc, section) {
  // Heading
  doc.font('Helvetica-Bold').fontSize(13).fillColor('#0f172a').text(section.heading, {
    paragraphGap: 6,
  });

  // Intro text (if exists)
  if (section.intro) {
    doc.font('Helvetica').fontSize(10.5).fillColor('#374151').text(section.intro, {
      paragraphGap: 6,
      lineGap: 3,
    });
  }

  // Paragraphs as alphabetical list (a., b., c., etc.)
  section.paragraphs.forEach((item, index) => {
    const letter = String.fromCharCode(97 + index); // a, b, c...
    
    // Check if the item contains a bold prefix (e.g. "Job Applications:", "Recruiter Follow-Up:")
    const colonIndex = item.indexOf(':');
    if (colonIndex > 0 && colonIndex < 30) {
      const prefix = item.substring(0, colonIndex + 1);
      const rest = item.substring(colonIndex + 1);
      
      doc
        .font('Helvetica')
        .fontSize(10.5)
        .fillColor('#374151')
        .text(`${letter}.  `, { continued: true, indent: 14 })
        .font('Helvetica-Bold')
        .text(prefix, { continued: true })
        .font('Helvetica')
        .text(rest, {
          paragraphGap: 6,
          lineGap: 3,
        });
    } else {
      doc
        .font('Helvetica')
        .fontSize(10.5)
        .fillColor('#374151')
        .text(`${letter}.  `, { continued: true, indent: 14 })
        .font('Helvetica')
        .text(item, {
          paragraphGap: 6,
          lineGap: 3,
        });
    }
  });

  doc.moveDown(0.8);
}

/**
 * Main function to generate the contract PDF as a buffer.
 */
export async function generateAgreementPdfBuffer(agreement) {
  const document = buildAgreementTemplate(agreement);

  if (!fs.existsSync(LOGO_PATH)) {
    throw new Error(`Agreement logo not found at ${LOGO_PATH}.`);
  }

  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: PAGE_MARGIN_TOP,
      bottom: PAGE_MARGIN_BOTTOM,
      left: PAGE_MARGIN_LEFT_RIGHT,
      right: PAGE_MARGIN_LEFT_RIGHT,
    },
    bufferPages: true,
  });

  const chunks = [];
  doc.on('data', (chunk) => chunks.push(chunk));

  // --- PAGE 1: TITLE & DETAILS ---
  doc.font('Helvetica-Bold').fontSize(20).fillColor('#0f172a').text('9 Jobs Service Contract', {
    align: 'center',
    paragraphGap: 12,
  });

  doc.font('Helvetica').fontSize(11).fillColor('#374151').text(
    `This Service Agreement is made and entered into as of ${document.agreementDate || '29 June 2026'}, by and between:`,
    {
      paragraphGap: 18,
      lineGap: 3,
    }
  );

  // Service Provider block
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#111827').text('9 Jobs Pty Ltd ABN:', { paragraphGap: 4 });
  doc.font('Helvetica').text('83679842972', { paragraphGap: 4 });
  doc.font('Helvetica-Bold').text('Phone: ', { continued: true }).font('Helvetica').text('+61 422 279 428', { paragraphGap: 18 });

  // Separator
  doc.font('Helvetica').fillColor('#4b5563').text('And', { paragraphGap: 18 });

  // Customer block
  doc.font('Helvetica-Bold').fillColor('#111827').text(document.signatureBlocks.customer.name, { paragraphGap: 4 });
  doc.font('Helvetica-Bold').text('Email: ', { continued: true }).font('Helvetica').text(document.signatureBlocks.customer.email, { paragraphGap: 4 });
  doc.font('Helvetica-Bold').text('Phone: ', { continued: true }).font('Helvetica').text(document.signatureBlocks.customer.phone, { paragraphGap: 24 });

  // --- SECTIONS (Pages 1 to 4 flow) ---
  document.sections.forEach((section) => {
    writeSection(doc, section);
  });

  // --- SIGNATURE SECTION (Page 5) ---
  doc.addPage();
  
  doc.font('Helvetica').fontSize(11).fillColor('#374151').text(
    'In witness where off, the parties have executed this Agreement as of the date first written above.',
    { paragraphGap: 24 }
  );

  // Service Provider signature block
  doc.font('Helvetica-Bold').fontSize(12).fillColor('#111827').text('Service Provider:', { paragraphGap: 6 });
  doc.font('Helvetica').fontSize(11).text('Name: 9 Jobs Pty Ltd ABN:', { paragraphGap: 4 });
  doc.font('Helvetica').text('83679842972', { paragraphGap: 6 });
  doc.font('Helvetica').text('Signature: Aditya Singh ', { continued: true });
  // Write DocuSign provider signature anchor invisibly in white text
  doc.fillColor('#ffffff').text('[[DS_PROVIDER_SIGN_HERE]]', { continued: true });
  doc.fillColor('#111827').text('___________________', { paragraphGap: 24 });

  // Customer signature block
  doc.font('Helvetica-Bold').fontSize(12).fillColor('#111827').text('Customer:', { paragraphGap: 6 });
  doc.font('Helvetica').fontSize(11).text(`Name: ${document.signatureBlocks.customer.name}`, { paragraphGap: 6 });
  doc.font('Helvetica').text('Signature: ', { continued: true });
  // Write DocuSign customer signature anchor invisibly in white text
  doc.fillColor('#ffffff').text('[[DS_CUSTOMER_SIGN_HERE]]', { continued: true });
  doc.fillColor('#111827').text('___________________', { paragraphGap: 24 });

  // Write date anchors invisibly at the bottom of the page in white text
  doc.fillColor('#ffffff').text('[[DS_PROVIDER_DATE_HERE]] [[DS_CUSTOMER_DATE_HERE]]');

  // --- DRAW HEADERS AND FOOTERS ---
  drawHeaderAndFooter(doc, LOGO_PATH);

  doc.end();

  return await new Promise((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });
}
