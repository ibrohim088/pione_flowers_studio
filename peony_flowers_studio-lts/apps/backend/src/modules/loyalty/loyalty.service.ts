import { prisma } from '../../config/database';

const FIRST_ORDER_THRESHOLD = 1_000_000; // so'm
const FIRST_ORDER_RATE = 0.07;
const SECOND_ORDER_RATE = 0.10;
const REGULAR_RATE = 0.07;

export interface LoyaltyResult {
    discount: number;
    tier: 'first' | 'second' | 'regular' | null;
}

export const loyaltyService = {
    /**
     * Mijozning necha marta "haqiqiy" (bekor qilinmagan, to'lovi failed bo'lmagan)
     * harid qilganini hisoblab, joriy buyurtma uchun loyalty-skidkani qaytaradi.
     *
     * Qoida:
     * - 1-harid: subtotal >= 1,000,000 so'm bo'lsa -> darhol 7% (shu buyurtmaning o'ziga)
     * - 2-harid: agar 1-harid shu chegaradan o'tgan bo'lsa -> 10%
     * - 3+ harid: agar 1-harid shu chegaradan o'tgan bo'lsa -> 7%
     * - 1-harid chegaradan o'tmagan bo'lsa, keyingi haridlarga ham loyalty berilmaydi.
     */
    async calculate(userId: string, subtotal: number): Promise<LoyaltyResult> {
        const validOrders = await prisma.order.findMany({
            where: {
                userId,
                status: { not: 'cancelled' },
                paymentStatus: { not: 'failed' },
            },
            orderBy: { createdAt: 'asc' },
            select: { subtotal: true },
        });

        const priorCount = validOrders.length;

        if (priorCount === 0) {
            if (subtotal >= FIRST_ORDER_THRESHOLD) {
                return { discount: Math.round(subtotal * FIRST_ORDER_RATE), tier: 'first' };
            }
            return { discount: 0, tier: null };
        }

        const firstOrder = validOrders[0]!;
        const qualified = firstOrder.subtotal >= FIRST_ORDER_THRESHOLD;
        if (!qualified) {
            return { discount: 0, tier: null };
        }

        if (priorCount === 1) {
            return { discount: Math.round(subtotal * SECOND_ORDER_RATE), tier: 'second' };
        }

        return { discount: Math.round(subtotal * REGULAR_RATE), tier: 'regular' };
    },
};
