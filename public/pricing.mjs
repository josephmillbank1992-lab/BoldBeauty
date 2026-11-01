// Shared by the browser and pricing checks. Prices are derived, never stored twice.
export function calculateSelection(catalogue, selectedIds) {
  const ids = new Set(selectedIds);
  const chosen = catalogue.filter((service) => ids.has(service.id));
  const hasLashes = chosen.some((service) => service.lashes);
  const items = chosen.map((service) => ({
    ...service,
    effectivePrice:
      hasLashes && service.withLashes !== undefined
        ? service.withLashes
        : service.price,
  }));
  return {
    items,
    total: items.reduce((sum, service) => sum + service.effectivePrice, 0),
    savings: items.reduce(
      (sum, service) => sum + service.price - service.effectivePrice,
      0,
    ),
  };
}
