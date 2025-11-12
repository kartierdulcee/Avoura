const ENV_PREFIX = "STRIPE_PRICE_";

function normalizeSelectionId(selectionId: string) {
  return selectionId.replace(/[^a-z0-9]/gi, "_").toUpperCase();
}

export function getStripePriceEnvKey(selectionId: string) {
  return `${ENV_PREFIX}${normalizeSelectionId(selectionId)}`;
}

export function getStripePriceId(selectionId: string): string | null {
  const envKey = getStripePriceEnvKey(selectionId);
  const value = process.env[envKey];
  return value && value.startsWith("price_") ? value : null;
}
