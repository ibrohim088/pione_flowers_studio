// Backend manzilini avtomatik aniqlaydi: avval localhost tekshiriladi,
// javob bo'lmasa — sahifa qaysi manzildan ochilgan bo'lsa (tarmoq IP'si)
// o'sha manzilga o'tiladi. IP tarmoq almashganda ham qo'lda sozlash
// shart emas, chunki brauzer joriy manzilni o'zi ko'rsatib beradi.

const LOCAL_URL = 'http://localhost:4000';

function lanFallbackUrl(): string {
  return `http://${window.location.hostname}:4000`;
}

let cachedBase: string | null = null;
let pending: Promise<string> | null = null;

async function isReachable(url: string, timeoutMs = 1200): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(`${url}/health`, { signal: controller.signal, mode: 'cors' });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export function getApiBase(): Promise<string> {
  if (cachedBase) return Promise.resolve(cachedBase);
  if (pending) return pending;

  const envUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (envUrl) {
    cachedBase = envUrl;
    return Promise.resolve(cachedBase);
  }

  pending = (async () => {
    // Sahifaning o'zi allaqachon tarmoq IP'idan ochilgan bo'lsa,
    // to'g'ridan-to'g'ri o'sha manzildan boshlaymiz (localhost'ni
    // tekshirib vaqt yo'qotishning hojati yo'q).
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      cachedBase = lanFallbackUrl();
      return cachedBase;
    }

    const localOk = await isReachable(LOCAL_URL);
    cachedBase = localOk ? LOCAL_URL : lanFallbackUrl();
    return cachedBase;
  })();

  return pending;
}

/** Muammo bo'lsa (masalan tarmoq o'zgarsa) qaytadan aniqlash uchun. */
export function resetApiBase() {
  cachedBase = null;
  pending = null;
}