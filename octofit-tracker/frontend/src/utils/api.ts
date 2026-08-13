// VITE_CODESPACE_NAME must be defined in a frontend/.env.local file when running in GitHub Codespaces.
// Example: VITE_CODESPACE_NAME=your-codespace-name

export function getCodespaceName(): string {
  const value = import.meta.env.VITE_CODESPACE_NAME;
  return typeof value === 'string' ? value.trim() : '';
}

export function getApiBaseUrl(): string {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(resource: string): string {
  return `${getApiBaseUrl()}/api/${resource}/`;
}

export function normalizeCollection(payload: unknown, fallbackKey: string | null = null): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const record = payload as Record<string, unknown>;

  if (Array.isArray(record.results)) return record.results;
  if (Array.isArray(record.items)) return record.items;
  if (Array.isArray(record.data)) return record.data;
  if (fallbackKey && Array.isArray(record[fallbackKey])) return record[fallbackKey] as unknown[];

  const arrayValue = Object.values(record).find(Array.isArray);
  return Array.isArray(arrayValue) ? arrayValue : [];
}
