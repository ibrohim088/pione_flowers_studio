import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

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
import couponsRouter from './modules/coupons/coupons.router';
import notificationsRouter from './modules/notifications/notifications.router';
import uploadRouter from './modules/upload/upload.router';
import paymentsRouter from './modules/payments/payments.router';
import analyticsRouter from './modules/analytics/analytics.router';
import newsletterRouter from './modules/newsletter/newsletter.router';

const app = express();

// ==== Global middleware ====
app.use(helmet());
app.use(
  cors({
    origin: [env.FRONTEND_URL, env.ADMIN_URL],
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
api.use('/coupons', couponsRouter);
api.use('/notifications', notificationsRouter);
api.use('/upload', uploadRouter);
api.use('/payments', paymentsRouter);
api.use('/analytics', analyticsRouter);
api.use('/newsletter', newsletterRouter);

app.use('/api', api);

// ==== 404 & error handling ====
app.use(notFound);
app.use(errorHandler);

async function bootstrap() {
  await connectRedis();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server ${env.PORT}-portda ishga tushdi (${env.NODE_ENV})`);
  });
}

bootstrap().catch((err) => {
  logger.error('Serverni ishga tushirishda xato:', err);
  process.exit(1);
});

export default app;
