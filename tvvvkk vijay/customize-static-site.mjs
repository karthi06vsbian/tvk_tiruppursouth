import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "tvkvijay-clone";
const HOME_FILES = [join(ROOT, "index.html"), join(ROOT, "ta-IN", "index.html")];
const VIDEO = "/tvkassets.minsky.studio/TVK_FINAL_ULTRA.webm";

const style = `
<style>
header.header-padding{padding:0!important}
header nav{width:100%!important;min-height:92px!important;border:2px solid #a00000!important;border-top:0!important;border-radius:0 0 18px 18px!important;background:#fff!important;background-image:none!important;box-shadow:0 2px 0 rgba(160,0,0,.38)!important}
header nav>a:first-child{gap:clamp(.75rem,1.6vw,1.8rem)!important;flex-shrink:0}
header nav>a:first-child span:first-child{width:clamp(54px,4vw,78px)!important}
header nav>a:first-child p{font-family:var(--font-teko),inherit!important;font-size:clamp(1.45rem,2.15vw,2.65rem)!important;line-height:1!important;font-weight:800!important;white-space:nowrap;color:#a00000!important}
.tvk-static-menu{display:inline-flex;align-items:center;justify-content:center;gap:clamp(1rem,2.25vw,2.65rem);margin-left:auto;margin-right:clamp(1rem,2vw,2rem)}
header nav div:has(>.tvk-static-menu){display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:.75rem!important;white-space:nowrap;flex-wrap:nowrap}
.tvk-static-menu a{display:inline-flex;align-items:center;color:#a00000!important;font-size:clamp(1rem,1.55vw,1.8rem);line-height:1;font-weight:800;text-decoration:none;white-space:nowrap}
.tvk-static-menu span{font-size:1.2em;margin-left:.38rem;transform:translateY(-.08em)}
header nav a[href="https://tvk.family/"]{background:#a00000!important;color:#fff!important;border-radius:14px!important;padding:clamp(.75rem,1vw,1.05rem) clamp(1rem,1.35vw,1.45rem)!important;font-weight:800!important;font-size:clamp(1rem,1.45vw,1.75rem)!important;line-height:1!important;white-space:nowrap}
header nav a[href="/ta-IN/"],header nav a[href="/en/"]{color:#a00000!important;font-weight:800!important;font-size:clamp(1.15rem,1.55vw,1.8rem)!important;white-space:nowrap;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:4px}
.tvk-video-hero{position:relative;min-height:100svh;overflow:hidden;background:#ffb000;color:white}
.tvk-video-hero video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top}
.tvk-video-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,220,0,.08),rgba(255,92,0,.06));pointer-events:none}
.tvk-tiruppur-card{display:grid;gap:1rem;color:#2b0606}
.tvk-tiruppur-card h3{font-size:clamp(2rem,4vw,3.5rem);line-height:1;margin:0;color:#a00000}
.tvk-tiruppur-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}
.tvk-person{display:flex;gap:.75rem;align-items:center;background:rgba(255,255,255,.82);border:1px solid rgba(160,0,0,.22);border-radius:.5rem;padding:.75rem}
.tvk-person img{width:64px;height:64px;object-fit:cover;border-radius:.45rem;position:static!important}
.tvk-person strong{display:block;color:#a00000}
.tvk-person span{display:block;font-size:.9rem;color:#3c3c3c}
@media(max-width:1400px){.tvk-static-menu{gap:.75rem;margin-right:.75rem}.tvk-static-menu a{font-size:.95rem}header nav>a:first-child p{font-size:1.55rem!important}header nav a[href="https://tvk.family/"]{font-size:1rem!important;padding:.75rem .9rem!important}}
@media(max-width:1200px){.tvk-static-menu{gap:.65rem}.tvk-static-menu a{font-size:.9rem}header nav>a:first-child p{font-size:1.4rem!important}}
@media(max-width:980px){.tvk-static-menu{display:none}header nav{min-height:74px!important}header nav>a:first-child span:first-child{width:48px!important}header nav>a:first-child p{font-size:1.4rem!important}}
@media(max-width:767px){header nav{border-radius:0 0 14px 14px!important}.tvk-tiruppur-grid{grid-template-columns:1fr}}
</style>`;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, files);
    else if (path.endsWith(".html")) files.push(path);
  }
  return files;
}

function addStyle(html) {
  if (html.includes(".tvk-video-hero")) {
    return html.replace(/<style>[\s\S]*?\.tvk-video-hero[\s\S]*?<\/style>/, style);
  }
  return html.replace("</head>", `${style}</head>`);
}

function restoreHeaderNav(html) {
  const menu = `<div class="tvk-static-menu"><a href="/election-candidates/tamilnadu/">2026 - Election <span>⌄</span></a><a href="/about-party/">Party <span>⌄</span></a><a href="/leadership/">Organisation <span>⌄</span></a><a href="/announcements/">Updates <span>⌄</span></a><a href="/gallery/">More <span>⌄</span></a></div>`;
  html = html.replace(/<div class="tvk-static-menu">[\s\S]*?<\/div>/g, "");
  return html.replace(/(<a href="https:\/\/tvk\.family\/")/, `${menu}$1`);
}

function replaceHero(html) {
  const hero = `<section class="tvk-video-hero">
<video autoplay muted loop playsinline preload="metadata" poster="/tvkassets.minsky.studio/TVK_POSTER_DESKTOP.webp"><source src="${VIDEO}" type="video/webm"></video>
</section>`;
  if (html.includes('<section class="tvk-video-hero">')) {
    return html.replace(/(<main>)<div class="relative w-full h-svh overflow-hidden pointer-events-none"[\s\S]*?(?=<section class="tvk-video-hero">)/, "$1");
  }
  if (html.includes('<div class="relative w-full h-svh overflow-hidden pointer-events-none"')) {
    return html.replace(/(<main>)<div class="relative w-full h-svh overflow-hidden pointer-events-none"[\s\S]*?(?=<section\b)/, `$1${hero}`);
  }
  const firstSection = html.match(/<section\b[\s\S]*?<\/section>/);
  return firstSection ? html.replace(firstSection[0], hero) : html;
}

function markJourney(html) {
  return html
    .replace(/<section id="timeline-section" class="h-auto md:min-h-screen section-padding relative overflow-hidden"/, '<section id="our-journey" class="h-auto md:min-h-screen section-padding relative overflow-hidden"')
    .replace(/<section class="h-auto md:min-h-screen section-padding relative overflow-hidden"/, '<section id="our-journey" class="h-auto md:min-h-screen section-padding relative overflow-hidden"');
}

function replaceDistrict(html) {
  const start = html.indexOf('<section class="relative h-auto md:h-screen feeds-padding"');
  if (start === -1) return html;
  const end = html.indexOf("</section>", start);
  if (end === -1) return html;
  const original = html.slice(start, end + 10);
  const bg = original.match(/<div class="absolute inset-0 -z-10">[\s\S]*?<\/div><\/div>/)?.[0] || "";
  const district = `<section class="relative h-auto md:h-screen feeds-padding" style="clip-path:inset(0)">${bg}
<div class="flex flex-col h-full w-full"><div class="w-full flex justify-between items-center mb-4 sxl:mb-8"><h2 class="text-text-white">District Structure</h2></div>
<div class="flex flex-col md:flex-row w-full h-full min-h-0 gap-4 md:gap-12 sxl:gap-16 3xl:gap-20">
<div class="w-full md:w-[48%] border-md overflow-hidden relative min-h-[28rem]"><img alt="Tiruppur campaign" class="object-cover" style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0" src="/tvkassets.minsky.studio/media/Tiruppur_Campaign_media1-1600x1067.jpg"></div>
<div class="w-full md:w-[52%] border-md flex flex-col gap-4 p-4 md:p-6 3xl:p-10 relative overflow-hidden bg-text-white/90"><div class="absolute inset-0 bg-diagonal-red opacity-20"></div>
<div class="relative z-10 tvk-tiruppur-card"><p class="text-primary font-semibold">Selected District</p><h3>Tiruppur</h3><p>Only Tiruppur district is shown in this static frontend.</p>
<div class="tvk-tiruppur-grid">
<div class="tvk-person"><img src="/tvkassets.minsky.studio/media/Yuvaraj-Tiruppur-East-300x300.jpg" alt="Yuvaraj Tiruppur East"><div><strong>Yuvaraj</strong><span>Tiruppur East</span></div></div>
<div class="tvk-person"><img src="/tvkassets.minsky.studio/media/Sankar-Tiruppur-West-300x300.jpg" alt="Sankar Tiruppur West"><div><strong>Sankar</strong><span>Tiruppur West</span></div></div>
<div class="tvk-person"><img src="/tvkassets.minsky.studio/media/Balamurugan-Tiruppur-City-300x300.jpg" alt="Balamurugan Tiruppur City"><div><strong>Balamurugan</strong><span>Tiruppur City</span></div></div>
<div class="tvk-person"><img src="/tvkassets.minsky.studio/media/Thirumalai-Tiruppur-South-300x300.jpg" alt="Thirumalai Tiruppur South"><div><strong>Thirumalai</strong><span>Tiruppur South</span></div></div>
</div></div></div></div></div></section>`;
  return html.slice(0, start) + district + html.slice(end + 10);
}

for (const file of walk(ROOT)) {
  let html = readFileSync(file, "utf8");
  html = addStyle(html);
  html = restoreHeaderNav(html);
  if (HOME_FILES.includes(file)) {
    html = replaceHero(html);
    html = markJourney(html);
    html = replaceDistrict(html);
  }
  writeFileSync(file, html);
}

console.log("Custom static frontend mapped.");
