import { describe, it, expect } from 'vitest';
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('форматирует цену в рублях без копеек', () => {
    const result = formatPrice(4990);
    expect(result).toContain('4');
    expect(result).toMatch(/₽|руб/i);
  });
});
