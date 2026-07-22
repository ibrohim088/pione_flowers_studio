import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_BUCKET } from '../../config/s3';
import { AppError } from '../../middleware/errorHandler';
import { env } from '../../config/env';
import crypto from 'crypto';

const ALLOWED_MIME = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
  'image/bmp',
  'image/tiff',
  'image/heic',
  'image/heif',
];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const uploadService = {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!ALLOWED_MIME.includes(file.mimetype)) {
      throw new AppError('Faqat jpeg, png, webp, gif, avif, svg, bmp, tiff, heic formatlar qabul qilinadi', 400);
    }
    if (file.size > MAX_SIZE_BYTES) {
      throw new AppError('Fayl hajmi 5MB dan oshmasligi kerak', 400);
    }

    const key = `products/${crypto.randomUUID()}-${file.originalname}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    // Bucket ochiq (public) emas, shuning uchun to'g'ridan-to'g'ri S3 havolasi
    // brauzerda ochilmaydi (403 Forbidden). Backend orqali proxy qilib beramiz.
    return `${env.PAYMENT_CALLBACK_BASE_URL}/api/upload/file/${key}`;
  },

  async streamImage(key: string, res: import('express').Response): Promise<void> {
    try {
      const result = await s3Client.send(new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }));
      if (result.ContentType) res.setHeader('Content-Type', result.ContentType);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      const body = result.Body as NodeJS.ReadableStream;
      body.pipe(res);
    } catch (err) {
      throw new AppError('Rasm topilmadi', 404);
    }
  },

  extractKey(url: string): string {
    // Yangi format: {baseUrl}/api/upload/file/{key}
    const marker = '/api/upload/file/';
    const markerIndex = url.indexOf(marker);
    if (markerIndex !== -1) {
      const key = url.slice(markerIndex + marker.length);
      if (key) return key;
    }
    // Eski format bilan orqaga moslik: https://{bucket}.s3.amazonaws.com/{key}
    const s3Marker = '.amazonaws.com/';
    const s3MarkerIndex = url.indexOf(s3Marker);
    if (s3MarkerIndex !== -1) {
      const key = url.slice(s3MarkerIndex + s3Marker.length);
      if (key) return key;
    }
    throw new AppError('URL noto\'g\'ri formatda', 400);
  },

  async deleteImage(url: string): Promise<void> {
    const key = uploadService.extractKey(url);
    if (!key) throw new AppError('URL noto\'g\'ri formatda', 400);

    await s3Client.send(new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: key }));
  },
};