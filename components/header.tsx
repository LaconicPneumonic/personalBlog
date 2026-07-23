import Link from "next/link";
import { SRC_CODE_LINK } from "../lib/constants";

const Header = () => {
  return (
    <nav
      aria-label="Site"
      className="flex items-baseline justify-between py-6 font-mono text-[0.8125rem]"
    >
      <Link href="/" className="text-muted hover:text-accent">
        ~/code-w-anthony
      </Link>
      <a href={SRC_CODE_LINK} className="text-muted hover:text-accent">
        github
      </a>
    </nav>
  );
};

export default Header;
