import crypto from 'node:crypto';

import { put } from '@vercel/blob';

function ensureBlobConfig() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is required for private PDF storage.');
  }
}

export async function uploadPrivatePdf({ folder, fileName, buffer }) {
  ensureBlobConfig();

  const safeFolder = folder.replace(/^\/+|\/+$/g, '');
  const blobPath = `${safeFolder}/${crypto.randomUUID()}-${fileName}`;
  const result = await put(blobPath, buffer, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/pdf',
    cacheControlMaxAge: 0,
  });

  return {
    url: result.url,
    path: blobPath,
  };
}

export async function fetchBlobBuffer(url) {
  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch blob asset (${response.status}).`);
  }

  return Buffer.from(await response.arrayBuffer());
}
