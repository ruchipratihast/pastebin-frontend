// const BASE_URL = "http://localhost:5000";
const DEV_URL = "https://pastebin-backend-six.vercel.app"

export async function createPaste(data) {
  const res = await fetch(`${DEV_URL}/api/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Failed to create paste");
  }

  return result;
}

export async function getPaste(id) {
  const res = await fetch(`${DEV_URL}/api/pastes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Paste unavailable");
  }

  return res.json();
}
