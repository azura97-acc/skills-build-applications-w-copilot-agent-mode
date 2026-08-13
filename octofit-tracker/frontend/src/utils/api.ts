/**
 * API Integration Utilities for OctoFit Tracker
 *
 * Handles dynamic API URL construction with GitHub Codespaces support and robust
 * response parsing for various API response formats.
 *
 * Environment Configuration:
 * - VITE_CODESPACE_NAME: Must be set in .env.local when running in GitHub Codespaces
 *   Example: VITE_CODESPACE_NAME=yellow-space-robot-abc123
 * - When unset, the application falls back to http://localhost:8000 for development
 *
 * API Endpoint Pattern:
 * - GitHub Codespaces: https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api/{resource}/
 * - Local Development: http://localhost:8000/api/{resource}/
 */

/**
 * Retrieves the GitHub Codespace name from environment variables.
 * Returns an empty string if VITE_CODESPACE_NAME is not defined.
 *
 * @returns The codespace name, or empty string if undefined
 */
export function getCodespaceName(): string {
  const value = import.meta.env.VITE_CODESPACE_NAME;
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Constructs the API base URL based on the environment.
 *
 * - If VITE_CODESPACE_NAME is set: returns GitHub Codespaces URL
 * - Otherwise: returns localhost for local development (safe fallback)
 *
 * @returns The API base URL without trailing slash
 */
export function getApiBaseUrl(): string {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  // Safe fallback for local development - avoids "undefined-8000..." URLs
  return 'http://localhost:8000';
}

/**
 * Builds a complete API endpoint URL for a given resource.
 *
 * @param resource - The resource name (e.g., 'activities', 'users', 'teams')
 * @returns The complete API endpoint URL with trailing slash
 */
export function buildApiUrl(resource: string): string {
  return `${getApiBaseUrl()}/api/${resource}/`;
}

/**
 * Normalizes various API response formats into a consistent array.
 *
 * Intelligently extracts data from:
 * - Direct arrays: [item1, item2, ...]
 * - Paginated responses: { results: [...], next: "..." }
 * - Generic collections: { items: [...] } or { data: [...] }
 * - Resource-specific keys: { users: [...] }, { teams: [...] }, etc.
 *
 * @param payload - The API response payload
 * @param fallbackKey - Optional resource key to check (e.g., 'activities', 'users')
 * @returns Array of items extracted from the payload, or empty array if no data found
 */
export function normalizeCollection(payload: unknown, fallbackKey: string | null = null): unknown[] {
  // Direct array response
  if (Array.isArray(payload)) {
    return payload;
  }

  // Invalid payload
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const record = payload as Record<string, unknown>;

  // Standard pagination patterns
  if (Array.isArray(record.results)) return record.results;
  if (Array.isArray(record.items)) return record.items;
  if (Array.isArray(record.data)) return record.data;

  // Resource-specific fallback key (e.g., 'users', 'teams', 'activities')
  if (fallbackKey && Array.isArray(record[fallbackKey])) {
    return record[fallbackKey] as unknown[];
  }

  // Search for any array value in the response
  const arrayValue = Object.values(record).find(Array.isArray);
  return Array.isArray(arrayValue) ? arrayValue : [];
}
