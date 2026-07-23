# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build (also validates that all posts bundle correctly)
- `npm run typecheck` — run `tsc` (no emit)

There is no lint setup and no test suite. TypeScript strict mode is OFF (`tsconfig.json`).

## What this is

A personal blog ("Code W/ Anthony") built from Vercel's `blog-starter` template, modified to use MDX and server-side OG image generation. Deployed on Vercel. Uses the Next.js Pages Router (not App Router).

## Architecture

### Content pipeline (the core of the site)

Posts live in `_posts/{slug}.mdx` with YAML frontmatter (title, excerpt, coverImage, date, author, ogImage). The flow:

1. `lib/api.ts` reads `_posts/` with `fs` and parses frontmatter via `gray-matter`. `getPostBySlug(slug, fields)` returns only the requested fields.
2. `pages/posts/[slug].tsx` uses `getStaticPaths`/`getStaticProps` (fully static, `fallback: false`). At build time it compiles the raw MDX with `mdx-bundler`'s `bundleMDX`, passing the resulting `code` string as a prop.
3. At render time, `getMDXComponent(post.content)` (memoized) turns that string into a React component, with custom components injected via the `components` prop.

Adding a new post = dropping a `.mdx` file in `_posts/` with matching assets in `public/assets/blog/{slug}/`. Adding a new component usable inside posts = importing it in `pages/posts/[slug].tsx` and adding it to the `components` map passed to `PostContent`.

### Components available inside MDX posts

The full component map lives in `components/mdx-components.tsx` and is passed to `PostContent` in `pages/posts/[slug].tsx`. It has two jobs: exposing custom components (`BootstrapCarousel` — a CSS scroll-snap carousel that kept its legacy name, `FlexContainer`, `Highlighter`, `Image`, `Map` — a D3/canvas graph visualization with BFS coloring and seeded randomness via `chance`) and styling intrinsic elements (`h2`, `h3`, `p`, `a`, `ol`, `ul`, `li`, `blockquote`, `hr`, `code`). The second job is load-bearing: Tailwind preflight resets those elements, so any element MDX can emit that isn't in this map renders unstyled.

### OG image generation

`pages/api/cover.tsx` is an edge-runtime API route using `@vercel/og` that draws a generative SVG (sinusoid/exponential dot pattern colored with d3-scale-chromatic) parameterized by `?seed=` and `?background=` query params.

### Styling

Tailwind CSS v3 with a token layer: CSS custom properties (`--paper`, `--ink`, `--muted`, `--line`, `--accent`, `--code-bg`, `--syn-*`) are defined in `styles/index.css` — including the dark theme via `prefers-color-scheme` — and mapped to Tailwind color names in `tailwind.config.js` (`text-ink`, `border-line`, `bg-code-bg`, …). Always style through these tokens so both themes stay correct. Fonts are self-hosted woff2 files in `public/fonts/` (STIX Two Text for serif display/body, IBM Plex Mono for dates/labels/code) declared via `@font-face` in `styles/index.css`. The site's visual signature is `components/sinebow-band.tsx`, a canvas rendering of the same sinebow art the OG generator draws.

### Other notable files

- `lib/constants.ts` — `BLOG_NAME`, `CMS_NAME`, source-code link
- `interfaces/post.ts`, `interfaces/author.ts` — post/author types
- `pages/index.tsx` — homepage listing all posts via `getAllPosts`
- `@types/remark-html.d.ts` — local type shim
