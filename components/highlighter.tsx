import { CSSProperties } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

type Props = {
  codeString: string;
  language: string;
};

const keyword: CSSProperties = { color: "var(--syn-keyword)" };
const string: CSSProperties = { color: "var(--syn-string)" };
const comment: CSSProperties = {
  color: "var(--syn-comment)",
  fontStyle: "italic",
};

// Minimal hljs theme derived from the site's design tokens, so code
// blocks follow the light/dark palette automatically.
const tokenTheme: Record<string, CSSProperties> = {
  hljs: {
    display: "block",
    overflowX: "auto",
    padding: "1rem 1.2rem",
    margin: "1.6rem 0",
    color: "var(--ink)",
    background: "var(--code-bg)",
    border: "1px solid var(--line)",
    fontFamily:
      '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: "0.8125rem",
    lineHeight: 1.6,
  },
  "hljs-keyword": keyword,
  "hljs-selector-tag": keyword,
  "hljs-literal": keyword,
  "hljs-type": keyword,
  "hljs-built_in": keyword,
  "hljs-string": string,
  "hljs-number": string,
  "hljs-attr": string,
  "hljs-attribute": string,
  "hljs-symbol": string,
  "hljs-comment": comment,
  "hljs-quote": comment,
  "hljs-meta": comment,
  "hljs-title": { color: "var(--accent)" },
  "hljs-name": { color: "var(--accent)" },
};

const Highlighter = ({ codeString, language }: Props) => {
  return (
    <SyntaxHighlighter language={language} style={tokenTheme}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default Highlighter;
