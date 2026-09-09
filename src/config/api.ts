const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3300";

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body = await response.text();
  let data: { message?: string } | T;

  try {
    data = JSON.parse(body) as { message?: string } | T;
  } catch {
    data = body as T;
  }

  if (!response.ok) {
    const message = typeof data === "object" && data !== null && "message" in data
      ? data.message
      : body;
    throw new Error(message || `Error ${response.status} del servidor`);
  }

  return data as T;
}
