// Generates public/feed.xml from _posts frontmatter. Runs via the
// prebuild hook so the feed is always in sync with the posts.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SITE_URL = "https://personal-blog-laconicpneumonics-projects.vercel.app";
const BLOG_NAME = "Code W/ Anthony";
const DESCRIPTION = `${BLOG_NAME} — embracing complexity and learning by practice.`;

const postsDir = path.join(process.cwd(), "_posts");

const escapeXml = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const posts = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".mdx"))
  .map((file) => {
    const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title,
      excerpt: data.excerpt ?? "",
      date: new Date(data.date),
    };
  })
  .sort((a, b) => b.date - a.date);

const items = posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/posts/${encodeURIComponent(p.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${encodeURIComponent(p.slug)}</guid>
      <description>${escapeXml(p.excerpt)}</description>
      <pubDate>${p.date.toUTCString()}</pubDate>
    </item>`
  )
  .join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BLOG_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${(posts[0]?.date ?? new Date()).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(process.cwd(), "public", "feed.xml"), feed);
console.log(`feed.xml written (${posts.length} posts)`);
