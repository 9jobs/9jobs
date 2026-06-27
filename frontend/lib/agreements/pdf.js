import fs from 'node:fs';
import path from 'node:path';

import PDFDocument from 'pdfkit';

import { buildAgreementTemplate } from '@/lib/agreements/template';

const LOGO_PATH = path.join(process.cwd(), 'public', 'agreement', '9jobs-logo.png');
const PAGE_MARGIN = 54;

function drawFooter(doc, pageNumber, totalPages) {
  const bottom = doc.page.height - PAGE_MARGIN + 8;

  doc
    .fontSize(9)
    .fillColor('#6b7280')
    .text(`Page ${pageNumber} of ${totalPages}`, PAGE_MARGIN, bottom, {
      align: 'center',
      width: doc.page.width - PAGE_MARGIN * 2,
    });
}

function writeBulletList(doc, items) {
  items.forEach((item) => {
    doc
      .font('Helvetica')
      .fontSize(11)
      .fillColor('#111111')
      .text(`• ${item}`, {
        indent: 14,
        paragraphGap: 5,
        lineGap: 2,
      });
  });
}

function writeSignatureBlock(doc, label, block, anchors) {
  doc.moveDown(0.6);
  doc.font('Helvetica-Bold').fontSize(12).fillColor('#111111').text(`${label}:`);
  doc.font('Helvetica').fontSize(11);
  doc.text(`Name: ${block.name}`);
  doc.text(`Email: ${block.email}`);
  doc.text(`Phone: ${block.phone}`);
  doc.text(`Signature: __________________  `, {
    continued: true,
  });
  doc.fillColor('#ffffff').text(anchors.sign);
  doc.fillColor('#111111');
  doc.text(`Date: __________________  `, {
    continued: true,
  });
  doc.fillColor('#ffffff').text(anchors.date);
  doc.fillColor('#111111');
}

export async function generateAgreementPdfBuffer(agreement) {
  const document = buildAgreementTemplate(agreement);

  if (!fs.existsSync(LOGO_PATH)) {
    throw new Error(`Agreement logo not found at ${LOGO_PATH}.`);
  }

  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: PAGE_MARGIN,
      bottom: PAGE_MARGIN,
      left: PAGE_MARGIN,
      right: PAGE_MARGIN,
    },
    bufferPages: true,
  });

  const chunks = [];

  doc.on('data', (chunk) => chunks.push(chunk));

  doc.image(LOGO_PATH, PAGE_MARGIN, PAGE_MARGIN - 12, {
    fit: [132, 52],
    align: 'left',
  });
  doc.moveDown(3);
  doc.font('Helvetica-Bold').fontSize(20).fillColor('#050505').text(document.title, {
    align: 'center',
  });
  doc.moveDown(0.4);
  doc.font('Helvetica').fontSize(11).fillColor('#111111').text(
    `Service Provider: ${document.provider.legalName} | ABN: ${document.provider.abn} | Phone: ${document.provider.phone}`,
    {
      align: 'center',
    }
  );
  doc.moveDown(1.2);

  doc.font('Helvetica-Bold').fontSize(12).text('Agreement Summary');
  doc.moveDown(0.3);
  doc.font('Helvetica').fontSize(11).text(document.summaryText, {
    lineGap: 3,
  });
  doc.moveDown(1);

  document.sections.forEach((section) => {
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#050505').text(section.heading, {
      paragraphGap: 4,
    });
    writeBulletList(doc, section.paragraphs);
    doc.moveDown(0.8);
  });

  doc.addPage();
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#050505').text('Signature Section');
  writeSignatureBlock(doc, 'Service Provider', document.signatureBlocks.provider, {
    sign: '[[DS_PROVIDER_SIGN_HERE]]',
    date: '[[DS_PROVIDER_DATE_HERE]]',
  });
  doc.moveDown(1.2);
  writeSignatureBlock(doc, 'Customer', document.signatureBlocks.customer, {
    sign: '[[DS_CUSTOMER_SIGN_HERE]]',
    date: '[[DS_CUSTOMER_DATE_HERE]]',
  });

  const range = doc.bufferedPageRange();

  for (let index = range.start; index < range.start + range.count; index += 1) {
    doc.switchToPage(index);
    drawFooter(doc, index + 1, range.count);
  }

  doc.end();

  return await new Promise((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });
}
