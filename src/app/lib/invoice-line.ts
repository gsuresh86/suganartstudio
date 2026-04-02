/** Percent off the line subtotal (qty × unit price), 0–100. */
export function normalizeDiscountPercent(pct: unknown): number {
  return Math.min(100, Math.max(0, Number(pct) || 0));
}

export function invoiceLineAmount(qty: number, unitPrice: number, discountPercent: number): number {
  const p = normalizeDiscountPercent(discountPercent);
  return Math.max(0, Math.round(qty * unitPrice * (1 - p / 100)));
}
