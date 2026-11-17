// Tells Bing, Copilot and other IndexNow engines that pages are new or changed.
// Run after a deploy:  node scripts/indexnow.mjs
// Optional: pass specific URLs:  node scripts/indexnow.mjs https://pathfindergrow.com/team/robin
// The key file at /e52817d8bfdc48f1b879e67f5072477d.txt must be live on the site first.
const HOST = "pathfindergrow.com";
const KEY = "e52817d8bfdc48f1b879e67f5072477d";
const DEFAULT_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/team/robin`,
  `https://${HOST}/team/siyam`,
  `https://${HOST}/work/pathfinder-peko`,
];

const urlList = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_URLS;

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

// 200 or 202 = accepted. 403 = key file not reachable yet. 422 = URL not on this host.
console.log(res.status, res.statusText);
console.log(urlList.join("\n"));
