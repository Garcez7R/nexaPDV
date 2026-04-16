const apiBaseFromEnv = import.meta.env.VITE_API_BASE_URL?.trim();

export const cloudApiBaseUrl = apiBaseFromEnv ? apiBaseFromEnv.replace(/\/$/, "") : "";

export function buildApiUrl(path: string) {
  if (cloudApiBaseUrl) {
    return `${cloudApiBaseUrl}${path}`;
  }

  return path;
}
