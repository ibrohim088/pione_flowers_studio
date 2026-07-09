import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, S3_BUCKET } from '../../config/s3';
import { AppError } from '../../middleware/errorHandler';
import crypto from 'crypto';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const uploadService = {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!ALLOWED_MIME.includes(file.mimetype)) {
      throw new AppError('Faqat jpeg, png, webp formatlar qabul qilinadi', 400);
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

    return `https://${S3_BUCKET}.s3.amazonaws.com/${key}`;
  },

  async deleteImage(url: string): Promise<void> {
    const key = url.split('.amazonaws.com/')[1];
    if (!key) throw new AppError('URL noto\'g\'ri formatda', 400);

    await s3Client.send(new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: key }));
  },
};



// import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
// import { s3Client, S3_BUCKET } from '../../config/s3';
// import { AppError } from '../../middleware/errorHandler';
// import crypto from 'crypto';

// const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
// const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// export const uploadService = {
//   async uploadImage(file: Express.Multer.File): Promise<string> {
//     if (!ALLOWED_MIME.includes(file.mimetype)) {
//       throw new AppError('Faqat jpeg, png, webp formatlar qabul qilinadi', 400);
//     }
//     if (file.size > MAX_SIZE_BYTES) {
//       throw new AppError('Fayl hajmi 5MB dan oshmasligi kerak', 400);
//     }

//     const key = `products/${crypto.randomUUID()}-${file.originalname}`;

//     await s3Client.send(
//       new PutObjectCommand({
//         Bucket: S3_BUCKET,
//         Key: key,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//         ACL: 'public-read',
//       })
//     );

//     return `https://${S3_BUCKET}.s3.amazonaws.com/${key}`;
//   },

//   async deleteImage(url: string): Promise<void> {
//     const key = url.split('.amazonaws.com/')[1];
//     if (!key) throw new AppError('URL noto\'g\'ri formatda', 400);

//     await s3Client.send(new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: key }));
//   },
// };
