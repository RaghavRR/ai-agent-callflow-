const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:8000/api";

export async function getPrompts(token: string) {
  const res = await fetch(`${API_BASE}/prompts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch prompts");
  return await res.json();
}

export async function updatePrompt(payload: any, token: string) {
  const res = await fetch(`${API_BASE}/prompts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update prompt");
  return await res.json();
}
