#!/usr/bin/env node
/**
 * Submit all Calckoo URLs to IndexNow in one batch.
 *
 * IndexNow (https://www.indexnow.org) lets you push new/updated URLs
 * directly to participating search engines (Bing, Yandex, and others)
 * instead of waiting for their next scheduled crawl.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs            # submit everything
 *   node scripts/submit-indexnow.mjs --dry-run   # just print the URL list, don't submit
 *
 * Requires Node 18+ (uses the built-in fetch API).
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const HOST = "calckoo.com";
const KEY = "cc55e6583fb84bdc934bfaec35dd9759";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** Extracts every `slug: "..."` value from a data file using a simple regex — */
/** avoids needing a TypeScript loader just to read static string literals. */
function extractSlugs(relativePath) {
  const content = readFileSync(join(root, relativePath), "utf-8");
  return [...content.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function buildUrlList() {
  const calculatorSlugs = extractSlugs("data/calculators.ts");
  const categorySlugs = extractSlugs("data/categories.ts");
  const articleSlugs = extractSlugs("data/articles.ts");

  const staticPaths = ["/", "/about", "/contact", "/privacy", "/terms", "/calculators", "/articles"];

  const urls = [
    ...staticPaths.map((p) => `https://${HOST}${p}`),
    ...categorySlugs.map((s) => `https://${HOST}/category/${s}`),
    ...calculatorSlugs.map((s) => `https://${HOST}/calculators/${s}`),
    ...articleSlugs.map((s) => `https://${HOST}/articles/${s}`),
  ];

  return urls;
}

async function submit(urlList) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  console.log(`\nIndexNow responded: ${res.status} ${res.statusText}`);
  if (text) console.log(text);

  if (res.status === 200 || res.status === 202) {
    console.log(`\n✅ Submitted ${urlList.length} URLs successfully.`);
  } else {
    console.log(`\n⚠️  Submission may have failed — check the status code above.`);
  }
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const urlList = buildUrlList();

  console.log(`Found ${urlList.length} URLs:\n`);
  urlList.forEach((u) => console.log(" -", u));

  if (dryRun) {
    console.log("\n(dry run — nothing was submitted)");
    return;
  }

  console.log(`\nSubmitting to ${ENDPOINT} ...`);
  await submit(urlList);
}

main().catch((err) => {
  console.error("Failed to submit to IndexNow:", err);
  process.exit(1);
});
