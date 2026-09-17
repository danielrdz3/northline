import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const readOutput = (path) => readFile(new URL(`../out/${path}`, import.meta.url), "utf8");

test("publishes one canonical production origin", async () => {
  const [home, service, robots, sitemap] = await Promise.all([
    readOutput("index.html"),
    readOutput("services/managed-it-michigan/index.html"),
    readOutput("robots.txt"),
    readOutput("sitemap.xml"),
  ]);
  for (const document of [home, service, robots, sitemap]) {
    assert.doesNotMatch(document, /northoaklandinternist|d1rk-digglers/i);
    assert.match(document, /northlinetechnology\.com/i);
  }
  assert.match(service, /rel="canonical" href="https:\/\/northlinetechnology\.com\/services\/managed-it-michigan\//i);
});

test("includes canonical services and excludes unapproved city pages from the sitemap", async () => {
  const sitemap = await readOutput("sitemap.xml");
  assert.match(sitemap, /services\/co-managed-it-michigan\//);
  assert.match(sitemap, /services\/penetration-testing-michigan\//);
  assert.doesNotMatch(sitemap, /locations\/michigan\/adrian\//);
  assert.doesNotMatch(sitemap, /managed-it-adrian-michigan/);
});

test("marks generated city pages noindex until editorial approval", async () => {
  const city = await readOutput("locations/michigan/adrian/index.html");
  assert.match(city, /name="robots" content="noindex, follow"/i);
  assert.match(city, /IT Services in Adrian, Michigan/);
});

test("publishes booking and legal routes with safe integration fallbacks", async () => {
  const [booking, privacy, terms] = await Promise.all([
    readOutput("booking/index.html"),
    readOutput("privacy/index.html"),
    readOutput("terms/index.html"),
  ]);
  assert.match(booking, /Book a conversation/i);
  assert.match(privacy, /optional analytics/i);
  assert.match(terms, /production-readiness placeholder/i);
});

test("switches the header to an accessible menu before navigation links can wrap", async () => {
  const [home, cssFiles] = await Promise.all([
    readOutput("index.html"),
    readdir(new URL("../out/_next/static/css/", import.meta.url)),
  ]);
  const css = (await Promise.all(cssFiles.filter((file) => file.endsWith(".css")).map((file) => readOutput(`_next/static/css/${file}`)))).join("\n");

  assert.match(home, /<details class="mobileNav">/);
  assert.match(home, /<summary><span class="menuIcon"/);
  assert.match(home, /aria-label="Mobile navigation"/);
  assert.match(css, /@media\s*\(max-width:1120px\).*?\.serviceNav\{display:none\}.*?\.mobileNav\{display:block/s);
});
