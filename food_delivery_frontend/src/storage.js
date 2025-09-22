//
// Tiny localStorage helper for the Food Delivery app.
// Provides safe get/set with JSON serialization and key namespacing.
//

const NAMESPACE = 'fdapp';

// PUBLIC_INTERFACE
export function storageKey(key) {
  /** Returns a namespaced localStorage key for this app. */
  return `${NAMESPACE}:${key}`;
}

// PUBLIC_INTERFACE
export function lsGet(key, fallback) {
  /**
   * Get a value from localStorage by key (namespaced).
   * Parses JSON, returns fallback if not present or parsing fails.
   */
  try {
    const raw = window.localStorage.getItem(storageKey(key));
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    // If parsing fails or localStorage is unavailable, return fallback
    return fallback;
  }
}

// PUBLIC_INTERFACE
export function lsSet(key, value) {
  /**
   * Set a value into localStorage by key (namespaced).
   * Serializes as JSON. Silently no-ops if localStorage is unavailable.
   */
  try {
    window.localStorage.setItem(storageKey(key), JSON.stringify(value));
  } catch {
    // Ignore write failures (e.g., storage full, privacy mode)
  }
}

// PUBLIC_INTERFACE
export function ensureSeed(key, valueIfMissing) {
  /**
   * Ensures a key exists. If not present, seeds it with the provided default.
   * Returns the existing or seeded value.
   */
  const existing = lsGet(key, undefined);
  if (existing === undefined) {
    lsSet(key, valueIfMissing);
    return valueIfMissing;
  }
  return existing;
}
