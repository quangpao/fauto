export async function isImgUrl(url: string) {
  if (!isUrl(url)) {
    return false;
  }
  const response = await fetch(url, { method: "HEAD" });
  return response.headers.get("Content-Type")?.startsWith("image");
}

export function isUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
