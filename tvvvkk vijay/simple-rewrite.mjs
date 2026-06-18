import { readFileSync, writeFileSync, readdirSync, existsSync, statSync, mkdirSync } from "node:fs";
import { join, dirname, relative, extname } from "node:path";

const SITE_ORIGIN = "https://tvkvijay.com";
const OUT_DIR = "tvkvijay-clone";

// All page paths (same as before)
const pagePaths = [
  "/en", "/about-party", "/action-plan", "/announcements", "/committees",
  "/contact-us", "/disclosures/TN2026C7form", "/district-leadership",
  "/election-candidates/tamilnadu", "/events",
  "/events/thalaivar-s-election-campaign-among-the-people-of-puducherry",
  "/events/trichy-gears-up-for-change",
  "/events/thalaivar-files-nomination-in-perambur",
  "/events/tiruppur-election-campaign",
  "/events/kanniyakumari-election-campaign",
  "/events/karaikudi-election-campaign",
  "/gallery", "/ideology", "/leadership", "/manifesto", "/resolutions", "/wings",
  "/ta-IN", "/ta-IN/about-party", "/ta-IN/action-plan", "/ta-IN/announcements",
  "/ta-IN/committees", "/ta-IN/contact-us", "/ta-IN/disclosures/TN2026C7form",
  "/ta-IN/district-leadership", "/ta-IN/election-candidates/tamilnadu",
  "/ta-IN/events", "/ta-IN/gallery", "/ta-IN/ideology", "/ta-IN/leadership",
  "/ta-IN/manifesto", "/ta-IN/resolutions", "/ta-IN/wings",
  "/ta-IN/events/thalaivar-s-election-campaign-among-the-people-of-puducherry",
  "/ta-IN/events/trichy-gears-up-for-change",
  "/ta-IN/events/thalaivar-files-nomination-in-perambur",
  "/ta-IN/events/tiruppur-election-campaign",
  "/ta-IN/events/kanniyakumari-election-campaign",
  "/ta-IN/events/karaikudi-election-campaign",
  "/ta-IN/events/thalaivar-s-election-campaign-in-tirunelveli-tuticorin",
  "/ta-IN/events/thalaivar-files-nomination-in-trichy-east",
  "/ta-IN/events/2026-election-candidate-intro-event",
  "/ta-IN/events/iftar-event", "/ta-IN/events/womens-day-2026",
  "/ta-IN/events/party-administrators-meeting-and-election-campaign-event-thanjavur-march-4-2026",
  "/ta-IN/events/tribute-to-nallakannu",
  "/ta-IN/events/vellore-office-bearers-meeting-and-election-campaign-event",
  "/ta-IN/events/salem-district-office-bearers-meeting-and-election-campaign",
  "/ta-IN/events/cadre-consultation-meeting",
  "/ta-IN/events/christmas-event-2025", "/ta-IN/events/erode-event",
  "/ta-IN/events/puducherry-event-2025",
  "/ta-IN/events/vettri-voters-meeting-coimbatore",
  "/ta-IN/events/virtualwarriors-vettri-kalagam",
  "/ta-IN/events/vettri-kazhagam-youth-revolution",
  "/ta-IN/events/vettri-joins-ramadan-community",
  "/ta-IN/events/vettri-kalagam-anniversary-leaders-honour",
  "/ta-IN/events/vettri-kalagam-against-parandur-airport",
  "/en/about-party", "/en/action-plan", "/en/announcements", "/en/committees",
  "/en/contact-us", "/en/disclosures/TN2026C7form",
  "/en/district-leadership", "/en/election-candidates/tamilnadu", "/en/events",
  "/en/events/thalaivar-s-election-campaign-among-the-people-of-puducherry",
  "/en/events/trichy-gears-up-for-change",
  "/en/events/thalaivar-files-nomination-in-perambur",
  "/en/events/tiruppur-election-campaign",
  "/en/events/kanniyakumari-election-campaign",
  "/en/events/karaikudi-election-campaign",
  "/en/gallery", "/en/ideology", "/en/leadership", "/en/manifesto",
  "/en/resolutions", "/en/wings",
];

function pageOutputPath(pathname) {
  const clean = pathname.replace(/\/+/g, "/").replace(/\/$/, "") || "/en";
  if (clean === "/en") return join(OUT_DIR, "index.html");
  return join(OUT_DIR, clean.replace(/^\/+/, ""), "index.html");
}

function getFileDepth(filePath) {
  const rel = relative(OUT_DIR, filePath);
  const parts = rel.split("/");
  return parts.length - 1; // number of directory levels from root
}

function relativePrefix(depth) {
  if (depth === 0) return "./";
  return "../".repeat(depth);
}

function safeName(value) {
  return decodeURIComponent(value)
    .replace(/^https?:\/\//, "")
    .replace(/[?#]+/g, "_")
    .replace(/[^a-zA-Z0-9._/-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/(^\/|\/$)/g, "");
}

function localAssetPathFor(rawUrl, contentType = "") {
  const url = new URL(rawUrl, SITE_ORIGIN);
  if (url.pathname === "/_next/image") {
    const source = url.searchParams.get("url") || "image";
    const width = url.searchParams.get("w") || "auto";
    const quality = url.searchParams.get("q") || "q";
    const sourceName = safeName(source).replace(/\.[a-zA-Z0-9]+$/, "");
    const ext = extensionFromType(contentType, source) || ".img";
    return join(OUT_DIR, "assets", "next-image", `${sourceName}_w${width}_q${quality}${ext}`);
  }
  const prefix = url.origin === SITE_ORIGIN ? "" : url.hostname;
  let name = safeName(url.pathname);
  if (!name || name.endsWith("/")) name += "index";
  if (url.search) name += `_${safeName(url.search)}`;
  return join(OUT_DIR, prefix, name);
}

function extensionFromType(contentType, fallbackUrl) {
  const fallback = extname(new URL(fallbackUrl, SITE_ORIGIN).pathname);
  if (contentType.includes("text/css")) return ".css";
  if (contentType.includes("javascript")) return ".js";
  if (contentType.includes("image/avif")) return ".avif";
  if (contentType.includes("image/webp")) return ".webp";
  if (contentType.includes("image/png")) return ".png";
  if (contentType.includes("image/jpeg")) return ".jpg";
  if (contentType.includes("image/svg+xml")) return ".svg";
  if (contentType.includes("font/woff2")) return ".woff2";
  if (contentType.includes("font/woff")) return ".woff";
  if (contentType.includes("font/ttf")) return ".ttf";
  if (contentType.includes("application/pdf")) return ".pdf";
  return fallback || "";
}

async function fetchBuffer(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const response = await fetch(url, {
    signal: controller.signal,
    headers: { "accept": "*/*", "user-agent": "Mozilla/5.0" },
  }).finally(() => clearTimeout(timer));
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return Buffer.from(await response.arrayBuffer());
}

// Build page path map
const pagePathMap = new Map();
for (const path of pagePaths) {
  pagePathMap.set(path, pageOutputPath(path));
}

// Re-download fresh pages
console.log("Downloading fresh pages...");
for (const [path, file] of pagePathMap) {
  const url = `${SITE_ORIGIN}${path}`;
  try {
    const body = await fetchBuffer(url);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, body);
  } catch (err) {
    console.warn(`  Failed ${url}: ${err.message}`);
  }
}
console.log("Done downloading.");

// Build assetMap - scan all HTML files for URLs, find local files
console.log("Building asset map...");
const assetMap = new Map();
for (const [path, file] of pagePathMap) {
  const pageUrl = `${SITE_ORIGIN}${path}`;
  try {
    const html = readFileSync(file, "utf8");
    const urls = new Set();
    for (const match of html.matchAll(/\b(?:href|src|poster|action)=["']([^"']+)["']/g)) {
      const raw = absolutize(match[1], pageUrl);
      if (raw && isAssetUrl(raw)) urls.add(raw.href);
    }
    for (const match of html.matchAll(/\b(?:srcset|imagesrcset)=["']([^"']+)["']/gi)) {
      for (const part of match[1].split(",")) {
        const c = part.trim().split(/\s+/)[0];
        const raw = absolutize(c, pageUrl);
        if (raw && isAssetUrl(raw)) urls.add(raw.href);
      }
    }
    for (const match of html.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) {
      const raw = absolutize(match[2], pageUrl);
      if (raw && isAssetUrl(raw)) urls.add(raw.href);
    }
    for (const match of html.matchAll(/"url":"(https?:\/\/[^"]+)"/g)) {
      const raw = absolutize(match[1].replaceAll("\\/", "/"), pageUrl);
      if (raw && isAssetUrl(raw)) urls.add(raw.href);
    }
    for (const match of html.matchAll(/https?:\\?\/\\?\/[^"'\\<>\s]+/g)) {
      const cleaned = match[0].replaceAll("\\/", "/").replace(/[),.;]+$/, "").trim();
      const raw = absolutize(cleaned, pageUrl);
      if (raw && isAssetUrl(raw)) urls.add(raw.href);
    }
    
    for (const rawUrl of urls) {
      if (assetMap.has(rawUrl)) continue;
      const url = new URL(rawUrl);
      const localPath = localAssetPathFor(url.href);
      if (existsSync(localPath)) {
        assetMap.set(url.href, localPath);
        if (url.origin === SITE_ORIGIN) {
          assetMap.set(`${url.pathname}${url.search}`, localPath);
        }
      }
    }
  } catch {}
}
console.log(`  Found ${assetMap.size} local asset mappings`);

function absolutize(raw, baseUrl) {
  if (!raw || raw.startsWith("data:") || raw.startsWith("blob:") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return null;
  try {
    return new URL(raw.replace(/&amp;/g, "&"), baseUrl);
  } catch {
    return null;
  }
}

function isAssetUrl(url) {
  if (/[${}()[\]]/.test(`${url.pathname}${url.search}`) || url.pathname.includes("ROOT/node_modules")) return false;
  if (url.origin === SITE_ORIGIN) {
    if (url.pathname === "/_next/image") return true;
    if (url.pathname.startsWith("/_next/static/")) return true;
    return /\.[a-zA-Z0-9]{2,8}$/.test(url.pathname);
  }
  if (url.hostname === "tvkassets.minsky.studio") return /\.[a-zA-Z0-9]{2,8}$/.test(url.pathname);
  if (url.hostname === "analytics.minsky.studio") return /\.[a-zA-Z0-9]{2,8}$/.test(url.pathname);
  return false;
}

// Simple replacements: map absolute path to correct relative path
console.log("Rewriting all HTML files...");
for (const [path, file] of pagePathMap) {
  let html = readFileSync(file, "utf8");
  const depth = getFileDepth(file);
  const prefix = relativePrefix(depth);
  
  // Sort all replacements by original length descending
  const replacements = [];
  
  // 1. Page paths (longest first)
  const sortedPaths = [...pagePathMap.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [ppath, pfile] of sortedPaths) {
    const relPath = relative(dirname(file), pfile);
    const relFinal = relPath.startsWith(".") ? relPath : `./${relPath}`;
    
    // Full URL variant
    replacements.push({ from: `${SITE_ORIGIN}${ppath}`, to: relFinal });
    // Just the path
    replacements.push({ from: ppath, to: relFinal });
    // JSON-escaped
    replacements.push({ from: ppath.replaceAll("/", "\\/"), to: relFinal.replaceAll("/", "\\/") });
  }
  
  // 2. Asset URLs (full URLs)
  for (const [url, localPath] of assetMap) {
    if (!url.startsWith("http")) continue;
    const relPath = relative(dirname(file), localPath);
    const relFinal = relPath.startsWith(".") ? relPath : `./${relPath}`;
    replacements.push({ from: url, to: relFinal });
    
    // &amp; variant
    if (url.includes("&")) {
      replacements.push({ from: url.replaceAll("&", "&amp;"), to: relFinal });
    }
  }
  
  // 3. Same-origin asset paths (path+search)
  for (const [pathKey, localPath] of assetMap) {
    if (pathKey.startsWith("http")) continue;
    const relPath = relative(dirname(file), localPath);
    const relFinal = relPath.startsWith(".") ? relPath : `./${relPath}`;
    replacements.push({ from: pathKey, to: relFinal });
    
    // &amp; variant
    if (pathKey.includes("&")) {
      replacements.push({ from: pathKey.replaceAll("&", "&amp;"), to: relFinal });
    }
  }
  
  // Sort by from length descending
  replacements.sort((a, b) => b.from.length - a.from.length);
  
  // Apply all replacements using safe regex (word boundary to avoid partial matches)
  for (const { from, to } of replacements) {
    if (!html.includes(from)) continue;
    // Use regex with word-boundary-like lookarounds that work with / in paths
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    try {
      const regex = new RegExp(`(?<=^|[^a-zA-Z0-9_])${escaped}(?=[^a-zA-Z0-9_]|$)`, "g");
      html = html.replace(regex, to);
    } catch {}
  }
  
  writeFileSync(file, html);
}

console.log("Done! All files rewritten.");
