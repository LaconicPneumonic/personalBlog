import { BLOG_NAME } from "../lib/constants";
import SinebowBand from "./sinebow-band";

const Intro = () => {
  return (
    <section className="pb-2 pt-10">
      <h1 className="mb-3 text-5xl font-bold leading-none tracking-tight md:text-6xl">
        {BLOG_NAME}
      </h1>
      <p className="mb-9 text-lg italic text-muted">
        Embracing complexity and learning by practice.
      </p>
      <SinebowBand />
      <p className="mt-2.5 font-mono text-xs text-muted">
        fig. 0 — sinebow interference field, drawn live by{" "}
        <span className="text-accent">pages/api/cover.tsx</span>
      </p>
    </section>
  );
};

export default Intro;
