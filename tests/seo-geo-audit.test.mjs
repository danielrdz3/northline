import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "out");
const origin = "https://northlinetechnology.com";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : target;
  }));
  return files.flat();
}

function routeFor(file) {
  const relative = path.relative(output, file).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/index\.html$/, "")}`;
}

function tagAttribute(html, selector, attribute) {
  const tags = html.match(new RegExp(`<${selector}\\b[^>]*>`, "gi")) ?? [];
  for (const tag of tags) {
    const value = tag.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, "i"));
    if (value) return value[1];
  }
  return undefined;
}

function metaContent(html, key, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (tagAttribute(tag, "meta", key)?.toLowerCase() === value.toLowerCase()) {
      return tagAttribute(tag, "meta", "content");
    }
  }
  return undefined;
}

function canonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => tagAttribute(candidate, "link", "rel")?.toLowerCase() === "canonical");
  return tag ? tagAttribute(tag, "link", "href") : undefined;
}

function title(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
}

function structuredData(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((match) => JSON.parse(match[1]));
}

function schemaNodes(value) {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) return value.flatMap(schemaNodes);
  return [value, ...Object.values(value).flatMap(schemaNodes)];
}

function visibleWordCount(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:[a-z]+|#\d+);/gi, " ")
    .trim();
  return text ? text.split(/\s+/).length : 0;
}

const htmlFiles = (await walk(output))
  .filter((file) => file.endsWith(".html"))
  .filter((file) => !/\/404(?:\/index)?\.html$/.test(file));
const pages = await Promise.all(htmlFiles.map(async (file) => ({ file, route: routeFor(file), html: await readFile(file, "utf8") })));

test("every rendered page has sound technical SEO metadata", () => {
  const indexableTitles = new Map();
  const indexableCanonicals = new Map();

  for (const page of pages) {
    const pageTitle = title(page.html);
    const description = metaContent(page.html, "name", "description");
    const canonicalUrl = canonical(page.html);
    const robots = metaContent(page.html, "name", "robots") ?? "index, follow";
    const isIndexable = !/noindex/i.test(robots);
    const expectedCanonical = `${origin}${page.route}`;

    assert.ok(pageTitle, `${page.route} is missing a title`);
    assert.ok(pageTitle.length >= 20 && pageTitle.length <= 80, `${page.route} has an unsuitable title length (${pageTitle.length})`);
    assert.ok(description, `${page.route} is missing a meta description`);
    assert.ok(description.length >= 50 && description.length <= 260, `${page.route} has an unsuitable description length (${description.length})`);
    assert.equal(canonicalUrl, expectedCanonical, `${page.route} has the wrong canonical URL`);
    assert.equal((page.html.match(/<h1\b/gi) ?? []).length, 1, `${page.route} must have exactly one h1`);
    assert.doesNotMatch(page.html, /northoaklandinternist|d1rk-digglers/i, `${page.route} contains a legacy origin`);

    for (const [property, expected] of [
      ["og:title", pageTitle],
      ["og:description", description],
      ["og:url", canonicalUrl],
    ]) {
      assert.equal(metaContent(page.html, "property", property), expected, `${page.route} has incorrect ${property}`);
    }
    assert.equal(metaContent(page.html, "property", "og:image"), `${origin}/og.png`, `${page.route} has an incorrect social image`);

    if (isIndexable) {
      assert.ok(!indexableTitles.has(pageTitle), `${page.route} duplicates the title used by ${indexableTitles.get(pageTitle)}`);
      assert.ok(!indexableCanonicals.has(canonicalUrl), `${page.route} duplicates a canonical URL`);
      indexableTitles.set(pageTitle, page.route);
      indexableCanonicals.set(canonicalUrl, page.route);
    }
  }
});

test("JSON-LD is valid, entity-linked, and appropriate to each content type", () => {
  for (const page of pages) {
    const documents = structuredData(page.html);
    assert.ok(documents.length > 0, `${page.route} is missing JSON-LD`);
    const nodes = documents.flatMap(schemaNodes);
    assert.ok(nodes.some((node) => node["@type"] === "Organization" && node["@id"] === `${origin}/#organization`), `${page.route} is missing the stable Organization entity`);

    if (page.route.startsWith("/services/")) {
      assert.ok(nodes.some((node) => node["@type"] === "Service" && node.provider?.["@id"] === `${origin}/#organization`), `${page.route} is missing linked Service schema`);
      assert.ok(nodes.some((node) => node["@type"] === "BreadcrumbList"), `${page.route} is missing breadcrumb schema`);
    }
    if (/^\/insights\/[^/]+\/$/.test(page.route)) {
      const article = nodes.find((node) => node["@type"] === "Article");
      assert.ok(article?.headline && article?.datePublished, `${page.route} is missing Article essentials`);
      assert.equal(article?.author?.["@id"], `${origin}/#organization`, `${page.route} has an unlinked article author`);
      assert.equal(article?.publisher?.["@id"], `${origin}/#organization`, `${page.route} has an unlinked article publisher`);
    }
  }
});

test("location expansion is quality-gated and excluded from discovery until approval", async () => {
  const cityPages = pages.filter((page) => /^\/locations\/michigan\/[^/]+\/$/.test(page.route));
  const sitemap = await readFile(path.join(output, "sitemap.xml"), "utf8");

  assert.equal(cityPages.length, 280, "the expected Michigan city route set was not generated");
  for (const page of cityPages) {
    assert.match(metaContent(page.html, "name", "robots") ?? "", /noindex, follow/i, `${page.route} is not quality-gated`);
    assert.ok(!sitemap.includes(`${origin}${page.route}`), `${page.route} appears in the sitemap before approval`);
    const nodes = structuredData(page.html).flatMap(schemaNodes);
    assert.ok(nodes.some((node) => node["@type"] === "Service" && node.areaServed?.["@type"] === "City"), `${page.route} lacks geographic Service schema`);
    assert.ok(nodes.some((node) => node["@type"] === "BreadcrumbList"), `${page.route} lacks breadcrumb schema`);
  }
});

test("sitemap, robots, and internal links agree with the rendered site", async () => {
  const [sitemap, robots] = await Promise.all([
    readFile(path.join(output, "sitemap.xml"), "utf8"),
    readFile(path.join(output, "robots.txt"), "utf8"),
  ]);
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, "sitemap contains duplicate URLs");
  assert.match(robots, new RegExp(`Sitemap: ${origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap\\.xml`));

  for (const url of sitemapUrls) {
    assert.ok(url.startsWith(`${origin}/`), `sitemap contains a foreign origin: ${url}`);
    const route = new URL(url).pathname;
    const page = pages.find((candidate) => candidate.route === route);
    assert.ok(page, `sitemap URL has no rendered page: ${route}`);
    assert.doesNotMatch(metaContent(page.html, "name", "robots") ?? "", /noindex/i, `sitemap includes noindex page: ${route}`);
  }

  const checked = new Set();
  for (const page of pages) {
    for (const match of page.html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/_next/")) continue;
      const pathname = href.split(/[?#]/)[0];
      if (!pathname || checked.has(pathname)) continue;
      checked.add(pathname);
      const target = pathname.endsWith("/")
        ? path.join(output, pathname, "index.html")
        : path.join(output, pathname);
      await assert.doesNotReject(access(target), `broken internal link: ${pathname}`);
    }
  }
});

test("priority pages meet baseline depth and prohibited claims stay absent", () => {
  const home = pages.find((page) => page.route === "/");
  assert.ok(home && visibleWordCount(home.html) >= 500, "homepage content is too thin");

  for (const page of pages.filter((candidate) => candidate.route.startsWith("/services/"))) {
    assert.ok(visibleWordCount(page.html) >= 300, `${page.route} service content is too thin`);
  }
  for (const page of pages.filter((candidate) => /^\/insights\/[^/]+\/$/.test(candidate.route))) {
    assert.ok(visibleWordCount(page.html) >= 300, `${page.route} insight content is too thin`);
  }
  for (const page of pages) {
    assert.doesNotMatch(page.html, /40\+\s*years|four decades|decades of experience/i, `${page.route} contains an unverified longevity claim`);
  }
});
