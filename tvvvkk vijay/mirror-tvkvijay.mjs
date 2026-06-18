import { access, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";

const SITE_ORIGIN = "https://tvkvijay.com";
const START_PATH = "/en";
const OUT_DIR = "tvkvijay-clone";
const MAX_PAGES = 80;
const RESUME = process.env.RESUME === "1";
const FETCH_TIMEOUT_MS = Number(process.env.FETCH_TIMEOUT_MS || 12000);

const visitedPages = new Set();
const queuedPages = [START_PATH];
const assetMap = new Map();
const downloadedAssets = new Set();

const pagePathMap = new Map();

function cleanPath(pathname) {
  let path = pathname.split("#")[0].split("?")[0];
  path = path.replace(/\/+/g, "/");
  if (!path || path === "/") return "/en";
  return path.replace(/\/$/, "");
}

function pageOutputPath(pathname) {
  const clean = cleanPath(pathname);
  if (clean === START_PATH) return join(OUT_DIR, "index.html");
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

function absolutize(raw, baseUrl) {
  if (!raw || raw.startsWith("data:") || raw.startsWith("blob:") || raw.startsWith("mailto:") || raw.startsWith("tel:")) {
    return null;
  }
  try {
    return new URL(raw.replace(/&amp;/g, "&"), baseUrl);
  } catch {
    return null;
  }
}

function collectUrls(text, baseUrl) {
  const urls = new Set();
  for (const match of text.matchAll(/\b(?:href|src|poster|action)=["']([^"']+)["']/g)) {
    const url = absolutize(match[1], baseUrl);
    if (url) urls.add(url.href);
  }

  for (const match of text.matchAll(/\b(?:srcset|imagesrcset)=["']([^"']+)["']/gi)) {
    for (const part of match[1].split(",")) {
      const candidate = part.trim().split(/\s+/)[0];
      const url = absolutize(candidate, baseUrl);
      if (url) urls.add(url.href);
    }
  }

  for (const match of text.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) {
    const url = absolutize(match[2], baseUrl);
    if (url) urls.add(url.href);
  }

  for (const match of text.matchAll(/"url":"(https?:\/\/[^"]+)"/g)) {
    const url = absolutize(match[1].replaceAll("\\/", "/"), baseUrl);
    if (url) urls.add(url.href);
  }

  for (const match of text.matchAll(/https?:\\?\/\\?\/[^"'\\<>\s]+/g)) {
    const cleaned = match[0].replaceAll("\\/", "/").replace(/[),.;]+$/, "");
    const url = absolutize(cleaned, baseUrl);
    if (url) urls.add(url.href);
  }

  for (const match of text.matchAll(/["'](\/[^"'<>\\\s]+)["']/g)) {
    const url = absolutize(match[1], baseUrl);
    if (url) urls.add(url.href);
  }

  return [...urls];
}

function collectPageLinks(html, baseUrl) {
  const hrefs = new Set();
  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/g)) hrefs.add(match[1]);
  for (const match of html.matchAll(/\\"href\\":\\"([^"\\]*)\\"/g)) hrefs.add(match[1].replaceAll("\\/", "/"));
  for (const match of html.matchAll(/"href":"([^"]*)"/g)) hrefs.add(match[1]);

  for (const href of hrefs) {
    if (!href || href.length > 180 || href.includes("$") || href.includes("&") || href.includes("=")) continue;
    if (!/^(https?:\/\/|\/)/.test(href)) continue;
    const normalizedHref = href.replace(/&amp;/g, "&");
    if (!/^https?:\/\/|^\/[A-Za-z0-9/_~-]*$/.test(normalizedHref)) continue;
    const url = absolutize(normalizedHref, baseUrl);
    if (!url) continue;
    if (url.origin !== SITE_ORIGIN) continue;
    if (url.pathname.startsWith("/_next/")) continue;
    if (url.pathname.includes(".")) continue;
    const clean = cleanPath(url.pathname);
    if (!visitedPages.has(clean) && !queuedPages.includes(clean) && queuedPages.length + visitedPages.size < MAX_PAGES) {
      queuedPages.push(clean);
    }
  }
}

function relativeLink(fromFile, toFile) {
  let rel = relative(dirname(fromFile), toFile).replaceAll("\\", "/");
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}

async function fetchBuffer(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      "accept": "*/*",
      "user-agent": "Mozilla/5.0 static-site-mirror",
    },
  }).finally(() => clearTimeout(timer));
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  return {
    body: Buffer.from(arrayBuffer),
    contentType: response.headers.get("content-type") || "",
  };
}

async function existingFile(path) {
  try {
    await access(path);
    return path;
  } catch {
    return null;
  }
}

async function existingNextImage(rawUrl) {
  const url = new URL(rawUrl, SITE_ORIGIN);
  if (url.pathname !== "/_next/image") return null;
  const source = url.searchParams.get("url") || "image";
  const width = url.searchParams.get("w") || "auto";
  const quality = url.searchParams.get("q") || "q";
  const sourceName = safeName(source).replace(/\.[a-zA-Z0-9]+$/, "");
  const prefix = `${sourceName}_w${width}_q${quality}`;
  const dir = join(OUT_DIR, "assets", "next-image", dirname(sourceName));
  try {
    const files = await readdir(dir);
    const found = files.find((file) => file.startsWith(`${sourceName.split("/").pop()}_w${width}_q${quality}.`));
    return found ? join(dir, found) : null;
  } catch {
    const flatDir = join(OUT_DIR, "assets", "next-image");
    try {
      const files = await readdir(flatDir, { recursive: true });
      const found = files.find((file) => file.replaceAll("\\", "/").startsWith(prefix));
      return found ? join(flatDir, found) : null;
    } catch {
      return null;
    }
  }
}

async function downloadAsset(rawUrl) {
  const url = new URL(rawUrl, SITE_ORIGIN);
  if (!isAssetUrl(url)) return null;
  const key = url.href;
  if (assetMap.has(key)) return assetMap.get(key);
  if (downloadedAssets.has(key)) return assetMap.get(key);
  downloadedAssets.add(key);

  try {
    if (RESUME) {
      const existing =
        (await existingNextImage(url.href)) ||
        (await existingFile(localAssetPathFor(url.href)));
      if (existing) {
        assetMap.set(key, existing);
        return existing;
      }
    }
    const { body, contentType } = await fetchBuffer(url.href);
    const output = localAssetPathFor(url.href, contentType);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, body);
    assetMap.set(key, output);

    if (contentType.includes("text/css") || output.endsWith(".css") || output.endsWith(".js")) {
      const text = body.toString("utf8");
      const nestedUrls = collectUrls(text, url.href);
      for (const nested of nestedUrls) await downloadAsset(nested);
      const rewritten = rewriteText(text, output);
      await writeFile(output, rewritten);
    }
    return output;
  } catch (error) {
    console.warn(`Asset skipped: ${url.href} (${error.message})`);
    return null;
  }
}

function rewriteText(text, fromFile) {
  let output = text;

  const replacements = new Map();
  for (const [rawUrl, localPath] of assetMap.entries()) {
    replacements.set(rawUrl, relativeLink(fromFile, localPath));
    const url = new URL(rawUrl);
    if (url.origin === SITE_ORIGIN) replacements.set(`${url.pathname}${url.search}`, relativeLink(fromFile, localPath));
  }

  for (const [path, file] of pagePathMap.entries()) {
    const rel = relativeLink(fromFile, file);
    replacements.set(`${SITE_ORIGIN}${path}`, rel);
    replacements.set(path, rel);
  }

  const sorted = [...replacements.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [needle, replacement] of sorted) {
    output = output.split(needle).join(replacement);
    output = output.split(needle.replaceAll("&", "&amp;")).join(replacement.replaceAll("&", "&amp;"));
    output = output.split(needle.replaceAll("/", "\\/")).join(replacement.replaceAll("/", "\\/"));
  }
  return output;
}

async function mirror() {
  if (!RESUME) await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  while (queuedPages.length && visitedPages.size < MAX_PAGES) {
    const path = queuedPages.shift();
    if (visitedPages.has(path)) continue;
    visitedPages.add(path);
    pagePathMap.set(path, pageOutputPath(path));

    const url = `${SITE_ORIGIN}${path}`;
    console.log(`Fetching page ${url}`);
    try {
      const { body } = await fetchBuffer(url);
      const html = body.toString("utf8");
      collectPageLinks(html, url);
      await mkdir(dirname(pageOutputPath(path)), { recursive: true });
      await writeFile(pageOutputPath(path), html);
    } catch (error) {
      console.warn(`Page skipped: ${url} (${error.message})`);
      pagePathMap.delete(path);
    }
  }

  for (const [path, file] of pagePathMap.entries()) {
    const html = await readFile(file, "utf8");
    const pageUrl = `${SITE_ORIGIN}${path}`;
    for (const url of collectUrls(html, pageUrl)) await downloadAsset(url);
  }

  for (const file of pagePathMap.values()) {
    const html = await readFile(file, "utf8");
    await writeFile(file, rewriteText(html, file));
  }

  await writeFile(
    join(OUT_DIR, "README.md"),
    `# TVK Vijay static clone\n\nMirrored from ${SITE_ORIGIN}${START_PATH}.\n\nOpen \`index.html\` in a browser or serve this directory with a static server.\n\nPages mirrored: ${visitedPages.size}\nAssets mirrored: ${assetMap.size}\n`
  );

  console.log(`Done. Pages: ${visitedPages.size}. Assets: ${assetMap.size}. Output: ${OUT_DIR}`);
}

await mirror();
