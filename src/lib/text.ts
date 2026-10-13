const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

/** Escape HTML, then turn **double asterisks** into <strong>. */
export function inlineMarkup(text: string): string {
  return text
    .replace(/[&<>"]/g, (c) => ESCAPES[c])
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/** Rough reading time: Latin words at 200/min, CJK characters at 400/min. */
export function readingMinutes(body = ''): number {
  const cjk = (body.match(/[㐀-鿿]/g) || []).length;
  const words = body
    .replace(/[㐀-鿿]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200 + cjk / 400));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'UTC',
  });
}
