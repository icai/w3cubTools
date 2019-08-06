const sitemap = require("nextjs-sitemap-generator");
const path = require("path");

sitemap({
  //   alternateUrls: {
  //       en: 'https://example.en',
  //       es: 'https://example.es',
  //       ja: 'https://example.jp',
  //       fr: 'https://example.fr',
  //   },
  baseUrl: "https://tools.w3cub.com",
  ignoredPaths: ["admin"],
  pagesDirectory: path.resolve(__dirname, "../pages"),
  targetDirectory: "out/"
});
