import crypto from 'crypto';

/** Click MD5 imzosi kabi holatlar uchun oddiy MD5 hash. */
export function md5(input: string): string {
  return crypto.createHash('md5').update(input).digest('hex');
}
