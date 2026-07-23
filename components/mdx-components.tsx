import Image from "next/image";
import BootstrapCarousel from "./carousel";
import FlexContainer from "./flexContainer";
import Highlighter from "./highlighter";
import Map from "./map";

type ElementProps = { children?: React.ReactNode };

// Post typography. Tailwind's preflight resets headings, links, and lists
// to plain text, so every element MDX can emit needs an explicit style here.
const mdxComponents = {
  BootstrapCarousel,
  FlexContainer,
  Highlighter,
  Image,
  Map,
  h2: ({ children }: ElementProps) => (
    <h2 className="mb-4 mt-12 text-2xl font-bold leading-snug [text-wrap:balance]">
      <span aria-hidden="true" className="font-normal text-accent">
        §{" "}
      </span>
      {children}
    </h2>
  ),
  h3: ({ children }: ElementProps) => (
    <h3 className="mb-3 mt-8 text-xl font-bold leading-snug [text-wrap:balance]">
      {children}
    </h3>
  ),
  p: (props: ElementProps) => <p className="my-5" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent underline decoration-1 underline-offset-[3px] hover:decoration-2"
      {...props}
    />
  ),
  ol: (props: ElementProps) => (
    <ol
      className="my-5 list-decimal pl-6 marker:font-mono marker:text-sm marker:text-muted"
      {...props}
    />
  ),
  ul: (props: ElementProps) => (
    <ul
      className="my-5 list-disc pl-6 marker:text-muted"
      {...props}
    />
  ),
  li: (props: ElementProps) => <li className="my-1.5 pl-1" {...props} />,
  blockquote: (props: ElementProps) => (
    <blockquote
      className="my-6 border-l-[3px] border-accent bg-code-bg px-5 py-3 italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
  code: (props: ElementProps) => (
    <code
      className="bg-code-bg px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
};

export default mdxComponents;
