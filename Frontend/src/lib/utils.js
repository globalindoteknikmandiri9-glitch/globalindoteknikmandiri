import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getAssetUrl(path) {
  if (!path) return ""
  if (path.startsWith("http")) return path
  if (path.startsWith("/uploads")) {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
    const baseUrl = apiUrl.replace(/\/api$/, "")
    return `${baseUrl}${path}`
  }
  return path
}

export function getSnippet(content, maxLen = 160) {
  if (!content) return ""
  let actualContent = content;
  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === 'object' && parsed.content !== undefined) {
      actualContent = parsed.content;
    }
  } catch(e) {}
  
  const plain = actualContent.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
  return plain.length > maxLen ? plain.slice(0, maxLen) + "…" : plain
}
