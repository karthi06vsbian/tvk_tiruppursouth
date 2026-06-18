import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";

const SITE_ORIGIN = "https://tvkvijay.com";
const ASSET_HOSTS = new Set(["tvkassets.minsky.studio", "analytics.minsky.studio"]);
const OUT_DIR = "tvkvijay-clone";
const FETCH_TIMEOUT_MS = Number(process.env.FETCH_TIMEOUT_MS || 15000);

const pagePaths = [
  "/en", "/about-party", "/action-plan", "/announcements", "/committees",
  "/contact-us", "/disclosures/TN2026C7form", "/district-leadership",
  "/election-candidates/tamilnadu", "/events",
  "/events/thalaivar-s-election-campaign-among-the-people-of-puducherry",
  "/events/trichy-gears-up-for-change", "/events/thalaivar-files-nomination-in-perambur",
  "/events/tiruppur-election-campaign", "/events/kanniyakumari-election-campaign",
  "/events/karaikudi-election-campaign", "/gallery", "/ideology", "/leadership",
  "/manifesto", "/resolutions", "/wings",
  "/ta-IN", "/ta-IN/about-party", "/ta-IN/action-plan", "/ta-IN/announcements",
  "/ta-IN/committees", "/ta-IN/contact-us", "/ta-IN/disclosures/TN2026C7form",
  "/ta-IN/district-leadership", "/ta-IN/election-candidates/tamilnadu",
  "/ta-IN/events", "/ta-IN/gallery", "/ta-IN/ideology", "/ta-IN/leadership",
  "/ta-IN/manifesto", "/ta-IN/resolutions", "/ta-IN/wings",
  "/ta-IN/events/thalaivar-s-election-campaign-among-the-people-of-puducherry",
  "/ta-IN/events/trichy-gears-up-for-change",
  "/ta-IN/events/thalaivar-files-nomination-in-perambur",
  "/ta-IN/events/tiruppur-election-campaign", "/ta-IN/events/kanniyakumari-election-campaign",
  "/ta-IN/events/karaikudi-election-campaign",
  "/ta-IN/events/thalaivar-s-election-campaign-in-tirunelveli-tuticorin",
  "/ta-IN/events/thalaivar-files-nomination-in-trichy-east",
  "/ta-IN/events/2026-election-candidate-intro-event", "/ta-IN/events/iftar-event",
  "/ta-IN/events/womens-day-2026",
  "/ta-IN/events/party-administrators-meeting-and-election-campaign-event-thanjavur-march-4-2026",
  "/ta-IN/events/tribute-to-nallakannu",
  "/ta-IN/events/vellore-office-bearers-meeting-and-election-campaign-event",
  "/ta-IN/events/salem-district-office-bearers-meeting-and-election-campaign",
  "/ta-IN/events/cadre-consultation-meeting", "/ta-IN/events/christmas-event-2025",
  "/ta-IN/events/erode-event", "/ta-IN/events/puducherry-event-2025",
  "/ta-IN/events/vettri-voters-meeting-coimbatore",
  "/ta-IN/events/virtualwarriors-vettri-kalagam",
  "/ta-IN/events/vettri-kazhagam-youth-revolution",
  "/ta-IN/events/vettri-joins-ramadan-community",
  "/ta-IN/events/vettri-kalagam-anniversary-leaders-honour",
  "/ta-IN/events/vettri-kalagam-against-parandur-airport",
  "/en/about-party", "/en/action-plan", "/en/announcements", "/en/committees",
  "/en/contact-us", "/en/disclosures/TN2026C7form", "/en/district-leadership",
  "/en/election-candidates/tamilnadu", "/en/events",
  "/en/events/thalaivar-s-election-campaign-among-the-people-of-puducherry",
  "/en/events/trichy-gears-up-for-change", "/en/events/thalaivar-files-nomination-in-perambur",
  "/en/events/tiruppur-election-campaign", "/en/events/kanniyakumari-election-campaign",
  "/en/events/karaikudi-election-campaign", "/en/gallery", "/en/ideology",
  "/en/leadership", "/en/manifesto", "/en/resolutions", "/en/wings",
];

function cleanPath(pathname) {
  const path = pathname.split(/[?#]/)[0].replace(/\/+/g, "/").replace(/\/$/, "");
  return path || "/en";
}

function pageOutputPath(pathname) {
  const clean = cleanPath(pathname);
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
  if (contentType.includes("image/avif")) return ".avif";
  if (contentType.includes("image/webp")) return ".webp";
  if (contentType.includes("image/png")) return ".png";
  if (contentType.includes("image/jpeg")) return ".jpg";
  if (contentType.includes("image/svg+xml")) return ".svg";
  if (contentType.includes("text/css")) return ".css";
  if (contentType.includes("javascript")) return ".js";
  if (contentType.includes("font/woff2")) return ".woff2";
  if (contentType.includes("font/woff")) return ".woff";
  if (contentType.includes("font/ttf")) return ".ttf";
  if (contentType.includes("application/pdf")) return ".pdf";
  return fallback || "";
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

function pageLinkFor(pathname) {
  const clean = cleanPath(pathname);
  if (clean === "/en") return "/";
  if (pageMap.has(clean)) return `${clean}/`;
  if (clean.startsWith("/en/") && pageMap.has(clean.slice(3))) return `${clean.slice(3)}/`;
  if (!clean.startsWith("/en/") && pageMap.has(`/en${clean}`)) return `${clean}/`;
  return null;
}

function absolutize(raw, baseUrl) {
  if (!raw || /^(data:|blob:|mailto:|tel:|javascript:|#)/i.test(raw)) return null;
  try {
    return new URL(raw.replace(/&amp;/g, "&").replaceAll("\\/", "/"), baseUrl);
  } catch {
    return null;
  }
}

function isStaticAsset(url) {
  if (url.origin === SITE_ORIGIN) {
    return url.pathname === "/_next/image" || url.pathname.startsWith("/_next/static/") || /\.[a-zA-Z0-9]{2,8}$/.test(url.pathname);
  }
  return ASSET_HOSTS.has(url.hostname) && /\.[a-zA-Z0-9]{2,8}$/.test(url.pathname);
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function existingNextImage(rawUrl) {
  const url = new URL(rawUrl, SITE_ORIGIN);
  if (url.pathname !== "/_next/image") return null;
  const source = url.searchParams.get("url") || "image";
  const width = url.searchParams.get("w") || "auto";
  const quality = url.searchParams.get("q") || "q";
  const sourceName = safeName(source).replace(/\.[a-zA-Z0-9]+$/, "");
  const base = sourceName.split("/").pop();
  const dir = join(OUT_DIR, "assets", "next-image", dirname(sourceName));
  try {
    const files = await readdir(dir);
    const found = files.find((file) => file.startsWith(`${base}_w${width}_q${quality}.`));
    return found ? join(dir, found) : null;
  } catch {
    return null;
  }
}

async function fetchBuffer(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const response = await fetch(url, {
    signal: controller.signal,
    headers: { accept: "*/*", "user-agent": "Mozilla/5.0 static-site-mirror" },
  }).finally(() => clearTimeout(timer));
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return {
    body: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get("content-type") || "",
  };
}

async function localizeAsset(url) {
  const exact = localAssetPathFor(url.href);
  if (await exists(exact)) return `/${relative(OUT_DIR, exact).replaceAll("\\", "/")}`;
  const nextImage = await existingNextImage(url.href);
  if (nextImage) return `/${relative(OUT_DIR, nextImage).replaceAll("\\", "/")}`;

  try {
    const { body, contentType } = await fetchBuffer(url.href);
    const output = localAssetPathFor(url.href, contentType);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, body);
    return `/${relative(OUT_DIR, output).replaceAll("\\", "/")}`;
  } catch {
    return null;
  }
}

async function resolveUrl(raw, baseUrl) {
  const url = absolutize(raw, baseUrl);
  if (!url) return raw;

  if (isStaticAsset(url)) {
    const local = await localizeAsset(url);
    return local || "";
  }

  if (url.origin === SITE_ORIGIN) {
    return pageLinkFor(url.pathname) || raw;
  }

  return raw;
}

async function rewriteHtml(html, pagePath) {
  const baseUrl = `${SITE_ORIGIN}${pagePath}`;
  let output = html.replace(/<video\b[\s\S]*?<\/video>/gi, "");

  output = await replaceAsync(output, /\b(href|src|poster|action)=["']([^"']+)["']/gi, async (match, attr, value) => {
    const resolved = await resolveUrl(value, baseUrl);
    return resolved === "" ? "" : `${attr}="${resolved}"`;
  });

  output = await replaceAsync(output, /\b(srcset|imagesrcset)=["']([^"']+)["']/gi, async (match, attr, value) => {
    const parts = await Promise.all(value.split(",").map(async (part) => {
      const trimmed = part.trim();
      if (!trimmed) return "";
      const [rawUrl, ...descriptor] = trimmed.split(/\s+/);
      const resolved = await resolveUrl(rawUrl, baseUrl);
      return resolved ? [resolved, ...descriptor].join(" ") : "";
    }));
    const kept = parts.filter(Boolean).join(", ");
    return kept ? `${attr}="${kept}"` : "";
  });

  output = await replaceAsync(output, /https?:\\?\/\\?\/[^"'\\<>,)]+/g, async (match) => {
    const raw = match.replaceAll("\\/", "/").replace(/[.;\\]+$/, "");
    const resolved = await resolveUrl(raw, baseUrl);
    return resolved || match;
  });

  output = output
    .replace(/<link\b[^>]*\bas=["']script["'][^>]*>/gi, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*\/?>/gi, "")
    .replace(/(?:\.\.\/)+_next\//g, "/_next/")
    .replace(/\.\/_next\//g, "/_next/")
    .replace(/(?:\.\.\/)+assets\//g, "/assets/")
    .replace(/\.\/assets\//g, "/assets/")
    .replace(/(?:\.\.\/)+tvkassets\.minsky\.studio\//g, "/tvkassets.minsky.studio/")
    .replace(/\.\/tvkassets\.minsky\.studio\//g, "/tvkassets.minsky.studio/")
    .replace(/\/index\.html\/index\.html/g, "/")
    .replace(/\/index\.html/g, "/");

  return output;
}

async function replaceAsync(text, regex, replacer) {
  const matches = [...text.matchAll(regex)];
  const replacements = await Promise.all(matches.map((match) => replacer(...match)));
  let index = 0;
  return text.replace(regex, () => replacements[index++]);
}

const pageMap = new Map(pagePaths.map((path) => [cleanPath(path), pageOutputPath(path)]));

for (const [path, file] of pageMap.entries()) {
  const url = `${SITE_ORIGIN}${path}`;
  try {
    const { body } = await fetchBuffer(url);
    await mkdir(dirname(file), { recursive: true });
    const rewritten = await rewriteHtml(body.toString("utf8"), path);
    await writeFile(file, rewritten);
    console.log(`mapped ${path} -> ${file}`);
  } catch (error) {
    console.warn(`kept existing ${file}: ${error.message}`);
    if (await exists(file)) {
      const html = await readFile(file, "utf8");
      await writeFile(file, await rewriteHtml(html, path));
    }
  }
}

await writeFile(
  join(OUT_DIR, "_headers"),
  [
    "/*",
    "  Cache-Control: public, max-age=3600",
    "/_next/static/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "/assets/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
  ].join("\n")
);

console.log(`Done. Static pages mapped: ${pageMap.size}`);
