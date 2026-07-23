import Container from "./container";
import { SRC_CODE_LINK } from "../lib/constants";

const Footer = () => {
  return (
    <footer className="mt-6 border-t border-line">
      <Container>
        <div className="flex flex-wrap gap-x-6 gap-y-2 py-10 font-mono text-[0.8125rem] text-muted">
          <a href={SRC_CODE_LINK} className="hover:text-accent">
            source on github
          </a>
          <a
            href="https://twitter.com/rollandonariver"
            className="hover:text-accent"
          >
            @rollandonariver
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
