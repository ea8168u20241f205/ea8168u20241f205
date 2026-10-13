/**
 * Calculate section totals and enforce capacity rules.
 * @summary Calculate section totals and enforce capacity rules.
 * @author Candy Vizcarra
 */
/** Sum registered quantities for a section. */
export function totalVehicles(items, sectionId) {
  return items.filter(item => String(item.sectionId) === String(sectionId)).reduce((total, item) => total + Number(item.quantity), 0);
}
/** Compute remaining capacity, preserving negative values in inconsistent data. */
export function availableCapacity(section, items) { return section.maxCapacity - totalVehicles(items, section.id); }
/** Return a translation key when quantity is invalid. */
export function validateQuantity(quantity, capacity) {
  if (!Number.isSafeInteger(quantity) || quantity < 1) return 'errors.invalid-quantity';
  if (quantity > capacity) return 'errors.capacity-exceeded';
  return null;
}
