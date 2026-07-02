import { Request, Response } from 'express';
import { paymentsService } from './payments.service';
import { logger } from '../../utils/logger';

/**
 * Click POST /payments/click/complete webhook handler.
 * Click har doim { error, error_note } formatida javob kutadi (200 status bilan).
 */
export async function handleClickWebhook(req: Request, res: Response) {
  try {
    const result = await paymentsService.clickComplete(req.body);
    return res.status(200).json(result);
  } catch (err) {
    logger.error('Click webhook xatosi:', err);
    return res.status(200).json({ error: -9, error_note: 'Internal error' });
  }
}
