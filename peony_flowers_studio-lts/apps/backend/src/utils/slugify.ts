export function slugify(text: string): string {
  const map: Record<string, string> = {
    'ʼ': '', 'ʻ': '', "'": '', 'oʻ': 'o', 'gʻ': 'g',
  };
  let result = text.toLowerCase().trim();
  for (const [from, to] of Object.entries(map)) {
    result = result.split(from).join(to);
  }
  return result
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function slugifyUnique(text: string, existingSlugs: string[]): string {
  const base = slugify(text);
  if (!existingSlugs.includes(base)) return base;
  let i = 2;
  while (existingSlugs.includes(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}
