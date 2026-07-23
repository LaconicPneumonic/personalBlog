import React, { useRef, useState } from "react";

// CSS scroll-snap carousel; keeps the old BootstrapCarousel name and props
// so existing posts don't change.
export default function BootstrapCarousel({
  children,
}: {
  children: Array<{ title: string; item: JSX.Element }>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = children.length;

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (i + count) % count;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(
      Math.max(0, Math.min(count - 1, Math.round(track.scrollLeft / track.clientWidth)))
    );
  };

  return (
    <figure className="my-8">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto border border-line bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((c, i) => (
          <div
            key={i}
            className="flex w-full shrink-0 snap-center items-center justify-center"
            aria-hidden={i !== index}
          >
            {c.item}
          </div>
        ))}
      </div>
      <figcaption className="mt-2.5 flex items-baseline justify-between gap-4 font-mono text-xs text-muted">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => scrollTo(index - 1)}
          className="hover:text-accent"
        >
          ←
        </button>
        <span className="text-center">
          {children[index]?.title} · {index + 1}/{count}
        </span>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => scrollTo(index + 1)}
          className="hover:text-accent"
        >
          →
        </button>
      </figcaption>
    </figure>
  );
}
