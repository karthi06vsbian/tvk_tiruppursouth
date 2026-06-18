import { access, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";

const SITE_ORIGIN = "https://tvkvijay.com";
const START_PATH = "/en";
const OUT_DIR = "tvkvijay-clone";

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

function safeName(value) {
  return decodeURIComponent(value)
    .replace(/^https?:\/\//, "")
    .replace(/[?#]+/g, "_")
    .replace(/[^a-zA-Z0-9._/-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/(^\/|\/$)/g, "");
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

function relativeLink(fromFile, toFile) {
  let rel = relative(dirname(fromFile), toFile).replaceAll("\\", "/");
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}

function absolutize(raw, baseUrl) {
  if (!raw || raw.startsWith("data:") || raw.startsWith("blob:") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return null;
  try {
    return new URL(raw.replace(/&amp;/g, "&"), baseUrl);
  } catch {
    return null;
  }
}

async function fetchBuffer(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const response = await fetch(url, {
    signal: controller.signal,
    headers: { "accept": "*/*", "user-agent": "Mozilla/5.0 static-site-mirror" },
  }).finally(() => clearTimeout(timer));
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return Buffer.from(await response.arrayBuffer());
}

// Step 1: Re-download all pages fresh
async function redownloadPages() {
  console.log("Re-downloading all HTML pages...");
  for (const path of pagePaths) {
    const url = `${SITE_ORIGIN}${path}`;
    const outPath = pageOutputPath(path);
    console.log(`  Fetching ${url}`);
    try {
      const body = await fetchBuffer(url);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, body);
    } catch (err) {
      console.warn(`  FAILED ${url}: ${err.message}`);
    }
  }
  console.log("Done downloading pages.");
}

// Step 2: Build asset map from existing files on disk
async function buildAssetMap() {
  console.log("Building asset map from existing files...");
  const assetMap = new Map();
  const assetDir = join(OUT_DIR, "assets", "next-image");
  try {
    const files = await readdir(assetDir, { recursive: true });
    for (const file of files) {
      if (file.endsWith(".img")) continue;
      const fullPath = join(assetDir, file);
      // Register the file path as-is (we'll generate matching URLs when needed)
    }
  } catch {}
  return assetMap;
}

// Step 3: Scan HTML for URLs and resolve to local files
async function collectLocalAssets(html, pageUrl, assetMap) {
  const urls = new Set();
  for (const match of html.matchAll(/\b(?:href|src|poster|action)=["']([^"']+)["']/g)) {
    const url = absolutize(match[1], pageUrl);
    if (url && isAssetUrl(url)) urls.add(url.href);
  }
  for (const match of html.matchAll(/\b(?:srcset|imagesrcset)=["']([^"']+)["']/gi)) {
    for (const part of match[1].split(",")) {
      const candidate = part.trim().split(/\s+/)[0];
      const url = absolutize(candidate, pageUrl);
      if (url && isAssetUrl(url)) urls.add(url.href);
    }
  }
  for (const match of html.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) {
    const url = absolutize(match[2], pageUrl);
    if (url && isAssetUrl(url)) urls.add(url.href);
  }
  for (const match of html.matchAll(/"url":"(https?:\/\/[^"]+)"/g)) {
    const url = absolutize(match[1].replaceAll("\\/", "/"), pageUrl);
    if (url && isAssetUrl(url)) urls.add(url.href);
  }
  for (const match of html.matchAll(/https?:\\?\/\\?\/[^"'\\<>\s]+/g)) {
    const cleaned = match[0].replaceAll("\\/", "/").replace(/[),.;]+$/, "");
    const url = absolutize(cleaned, pageUrl);
    if (url && isAssetUrl(url)) urls.add(url.href);
  }

  const found = [];
  for (const rawUrl of urls) {
    const url = new URL(rawUrl);
    // Check if file exists
    const localPath = localAssetPathFor(url.href);
    try {
      await access(localPath);
      assetMap.set(url.href, localPath);
      // Also map path+search for the same origin
      if (url.origin === SITE_ORIGIN) {
        assetMap.set(`${url.pathname}${url.search}`, localPath);
      }
      found.push(url.href);
    } catch {
      // File doesn't exist
    }
  }
  return found;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Resolve a URL string to a local relative path
function resolveUrl(urlStr, fromFile, assetMap, pagePathMap) {
  // Try assetMap by full URL
  const fullUrl = urlStr.startsWith("http") ? urlStr : `${SITE_ORIGIN}${urlStr}`;
  if (assetMap.has(fullUrl)) {
    return relativeLink(fromFile, assetMap.get(fullUrl));
  }
  // Try assetMap by pathname+search
  if (!urlStr.startsWith("http")) {
    if (assetMap.has(urlStr)) {
      return relativeLink(fromFile, assetMap.get(urlStr));
    }
  }
  // Try page paths
  if (pagePathMap.has(urlStr)) {
    return relativeLink(fromFile, pagePathMap.get(urlStr));
  }
  return null;
}

// Faster rewrite using URL scanning approach
function rewriteHtml(text, fromFile, assetMap, pagePathMap) {
  const pagePathPrefixes = new Set();
  const paths = [...pagePathMap.keys()].sort((a, b) => b.length - a.length);
  for (let i = 0; i < paths.length; i++) {
    for (let j = 0; j < paths.length; j++) {
      if (i !== j && paths[j].startsWith(paths[i] + "/")) {
        pagePathPrefixes.add(paths[i]);
        break;
      }
    }
  }

  // Build lookup maps
  const resolveCache = new Map();

  function cachedResolve(urlStr) {
    if (resolveCache.has(urlStr)) return resolveCache.get(urlStr);
    let result = null;
    
    // Normalize &amp; to & for resolution
    const normalized = urlStr.replace(/&amp;/g, "&");
    
    // Try the normalized version first
    const fullUrl = normalized.startsWith("http") ? normalized : `${SITE_ORIGIN}${normalized}`;
    if (assetMap.has(fullUrl)) {
      result = relativeLink(fromFile, assetMap.get(fullUrl));
    } else if (!normalized.startsWith("http") && assetMap.has(normalized)) {
      result = relativeLink(fromFile, assetMap.get(normalized));
    } else if (pagePathMap.has(normalized) && !pagePathPrefixes.has(normalized)) {
      result = relativeLink(fromFile, pagePathMap.get(normalized));
    } else {
      // Try URL-encoded version (for URLs with spaces in JSON)
      try {
        const encoded = new URL(fullUrl).href;
        if (encoded !== fullUrl && assetMap.has(encoded)) {
          result = relativeLink(fromFile, assetMap.get(encoded));
        }
      } catch {}
    }
    
    resolveCache.set(urlStr, result);
    return result;
  }

  let output = text;

  // 1. Process href/src/poster/action attribute values
  output = output.replace(
    /(href|src|poster|action)=(["'])([^"']+?)\2/gi,
    (match, attr, quote, value) => {
      if (value.startsWith("data:") || value.startsWith("blob:") || value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("#") || value.startsWith("javascript:")) return match;
      const resolved = cachedResolve(value);
      return resolved ? `${attr}=${quote}${resolved}${quote}` : match;
    }
  );

  // 2. Process srcset/imagesrcset
  output = output.replace(
    /(srcset|imagesrcset)=(["'])([^"']+?)\2/gi,
    (match, attr, quote, value) => {
      const parts = value.split(",").map(p => p.trim()).filter(Boolean);
      const rewritten = parts.map(part => {
        const [url, ...desc] = part.split(/\s+/);
        const resolved = cachedResolve(url);
        return resolved ? (desc.length ? `${resolved} ${desc.join(" ")}` : resolved) : part;
      });
      return `${attr}=${quote}${rewritten.join(", ")}${quote}`;
    }
  );

  // 3. Find all asset URLs and JSON page paths in the text and replace them
  function replaceUrls(text, regex, transformFn = x => x) {
    return text.replace(regex, (match) => {
      const normalized = transformFn(match);
      if (!normalized) return match;
      const resolved = cachedResolve(normalized);
      return resolved || match;
    });
  }

  // Match full URLs (http/https) - replaces each match once, no re-replacing
  output = replaceUrls(output, /https?:\/\/[^"'\s<>)]*/g,
    url => url.replace(/\\\//g, "/").replace(/[),.;\\]+$/, "").trim()
  );

  // Match JSON-escaped URLs
  output = replaceUrls(output, /https?:\\\/\\\/[^"'\s<>,\\]*/g,
    url => url.replace(/\\\//g, "/").replace(/[),.;\\]+$/, "").trim()
  );

  // Match same-origin asset paths in non-attribute text (JSON data etc.)
  output = replaceUrls(output, /\/_next\/(?:image\?[^"'\s<>)]*|static\/[^"'\s<>)]*)/g,
    url => url.replace(/&amp;/g, "&")
  );

  // 4. Replace page paths in text (CSS, JSON data, etc.) - only non-prefix paths
  const sortedNonPrefixPaths = [...pagePathMap.entries()]
    .filter(([path]) => !pagePathPrefixes.has(path))
    .sort((a, b) => b[0].length - a[0].length);

  for (const [path, file] of sortedNonPrefixPaths) {
    const rel = relativeLink(fromFile, file);
    if (!output.includes(path)) continue;

    const pEscaped = escapeRegex(path);
    const pRegex = new RegExp(`(?<=^|[^a-zA-Z0-9_])${pEscaped}(?=[^a-zA-Z0-9_]|$)`, "g");
    output = output.replace(pRegex, rel);

    // JSON-escaped version
    const jPath = path.replaceAll("/", "\\/");
    const jRel = rel.replaceAll("/", "\\/");
    if (jPath !== path) {
      const jRegex = new RegExp(`(?<=^|[^a-zA-Z0-9_])${escapeRegex(jPath)}(?=[^a-zA-Z0-9_]|$)`, "g");
      output = output.replace(jRegex, jRel);
    }
  }

  // 5. Handle prefix paths in attribute context only (already done in step 1)
  // For prefix paths in JSON, handle by checking context around the match
  // First replace JSON path references that appear as complete path values
  for (const prefixPath of pagePathPrefixes) {
    const file = pagePathMap.get(prefixPath);
    if (!file) continue;
    const rel = relativeLink(fromFile, file);
    
    // Replace when it appears as a complete string in JSON ("/en", "/ta-IN")
    // These appear like: "href":"/en" or "/en"
    const pEscaped = escapeRegex(prefixPath);
    // Only match when surrounded by: quote + colon + quote, or just quotes
    const pRegex = new RegExp(
      `(["'])${pEscaped}\\1`,
      "g"
    );
    output = output.replace(pRegex, (m, q) => `${q}${rel}${q}`);
    
    // JSON-escaped: "href":"\\/en" or similar
    const jPath = prefixPath.replaceAll("/", "\\/");
    if (jPath !== prefixPath) {
      const jRel = rel.replaceAll("/", "\\/");
      const jRegex = new RegExp(`(["'])${escapeRegex(jPath)}\\1`, "g");
      output = output.replace(jRegex, (m, q) => `${q}${jRel}${q}`);
    }
  }

  return output;
}

async function main() {
  // Step 1: Re-download all HTML pages
  await redownloadPages();

  // Step 2: Build page path map
  const pagePathMap = new Map();
  for (const path of pagePaths) {
    pagePathMap.set(path, pageOutputPath(path));
  }

  // Step 3: Scan all HTML files to find assets, resolve to local files
  const assetMap = new Map();
  for (const [path, file] of pagePathMap.entries()) {
    const pageUrl = `${SITE_ORIGIN}${path}`;
    try {
      const html = await readFile(file, "utf8");
      await collectLocalAssets(html, pageUrl, assetMap);
    } catch (err) {
      console.warn(`  Skipping asset scan for ${file}: ${err.message}`);
    }
  }
  console.log(`  Found ${assetMap.size} local asset mappings`);

  // Step 4: Rewrite all HTML files
  console.log("Rewriting all HTML files...");
  for (const [path, file] of pagePathMap.entries()) {
    const html = await readFile(file, "utf8");
    const pageUrl = `${SITE_ORIGIN}${path}`;
    const rewritten = rewriteHtml(html, file, assetMap, pagePathMap);
    await writeFile(file, rewritten);
    console.log(`  Rewritten ${file}`);
  }

  console.log("Done! All URLs rewritten to local paths.");
}

main().catch(console.error);
