import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import os from 'os';

import { env } from './config/env';
import { connectRedis } from './config/redis';
import { logger } from './utils/logger';

import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { requestLogger } from './middleware/requestLogger';
import { globalRateLimiter } from './middleware/rateLimiter';

import authRouter from './modules/auth/auth.router';
import usersRouter from './modules/users/users.router';
import categoriesRouter from './modules/categories/categories.router';
import productsRouter from './modules/products/products.router';
import ordersRouter from './modules/orders/orders.router';
import addressesRouter from './modules/addresses/addresses.router';
import reviewsRouter from './modules/reviews/reviews.router';
import wishlistRouter from './modules/wishlist/wishlist.router';
import notificationsRouter from './modules/notifications/notifications.router';
import uploadRouter from './modules/upload/upload.router';
import paymentsRouter from './modules/payments/payments.router';
import analyticsRouter from './modules/analytics/analytics.router';
import newsletterRouter from './modules/newsletter/newsletter.router';
import contentRouter from './modules/content/content.router';
import flowerImportRouter from './modules/flowerImport/flowerImport.router';

const app = express();

// Kompyuterning joriy tarmoqdagi IPv4 manzilini avtomatik topadi —
// Wi-Fi/tarmoq almashganda LAN_IP qo'lda yangilanishi shart emas.
function getLanIp(): string | null {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] ?? []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

// ==== Global middleware ====
// app.use(helmet());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Frontend/admin localhost'da ham, tarmoqdagi IPv4 orqali ham ochilishi
// mumkin, va bu IP tarmoq almashganda o'zgarib turadi — shu sabab CORS
// aniq manzillar ro'yxati o'rniga naqsh (pattern) orqali tekshiradi:
// localhost yoki istalgan lokal tarmoq IPv4 manzili, faqat 5173/5174 portlar.
const DEV_ORIGIN_PATTERN = /^http:\/\/(localhost|127\.0\.0\.1|(?:10|172\.(?:1[6-9]|2\d|3[01])|192\.168)(?:\.\d{1,3}){2}):(5173|5174)$/;

app.use(
  cors({
    origin(origin, callback) {
      // Brauzerdan tashqari so'rovlarda (Postman, server-server) origin bo'lmaydi.
      if (!origin) return callback(null, true);

      if (env.NODE_ENV !== 'production') {
        if (DEV_ORIGIN_PATTERN.test(origin)) return callback(null, true);
      }

      if (origin === env.FRONTEND_URL || origin === env.ADMIN_URL) {
        return callback(null, true);
      }

      return callback(new Error('CORS: ruxsat etilmagan manzil'));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(globalRateLimiter);

// ==== Health check ====
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ==== API routes ====
const api = express.Router();

api.use('/auth', authRouter);
api.use('/users', usersRouter);
api.use('/categories', categoriesRouter);
api.use('/products', productsRouter);
api.use('/orders', ordersRouter);
api.use('/addresses', addressesRouter);
api.use('/', reviewsRouter); // /products/:id/reviews va /reviews/:id o'zi ichida to'liq path bilan
api.use('/wishlist', wishlistRouter);
api.use('/notifications', notificationsRouter);
api.use('/upload', uploadRouter);
api.use('/payments', paymentsRouter);
api.use('/analytics', analyticsRouter);
api.use('/newsletter', newsletterRouter);
api.use('/content', contentRouter);
api.use('/admin/flower-import', flowerImportRouter);

app.use('/api', api);

// ==== 404 & error handling ====
app.use(notFound);
app.use(errorHandler);

async function bootstrap() {
  await connectRedis();

  app.listen(env.PORT, '0.0.0.0', () => {
    const lanIp = getLanIp();
    logger.info(`🚀 Server ${env.PORT}-portda ishga tushdi (${env.NODE_ENV})`);
    logger.info(`   Local:   http://localhost:${env.PORT}`);
    if (lanIp) {
      logger.info(`   Network: http://${lanIp}:${env.PORT}`);
    }
  });
}

bootstrap().catch((err) => {
  logger.error('Serverni ishga tushirishda xato:', err);
  process.exit(1);
});

export default app;