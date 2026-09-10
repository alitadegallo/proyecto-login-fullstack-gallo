const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3300";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body = await response.text();
  let data;

  try {
    data = JSON.parse(body);
  } catch {
    data = body;
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? data.message
        : body;
    throw new Error(message || `Error ${response.status} del servidor`);
  }

  return data;
}
