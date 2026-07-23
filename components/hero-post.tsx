import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import SectionLabel from "./section-label";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

const HeroPost = ({ title, coverImage, date, excerpt, slug }: Props) => {
  return (
    <section className="mt-16">
      <SectionLabel>Latest entry</SectionLabel>
      <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-9">
        <div>
          <span className="font-mono text-[0.8125rem] tabular-nums text-muted">
            <DateFormatter dateString={date} />
          </span>
          <h3 className="mb-3 mt-1.5 text-3xl font-bold leading-tight [text-wrap:balance] md:text-4xl">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="hover:text-accent"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-4 leading-relaxed">{excerpt}</p>
          <Link
            as={`/posts/${slug}`}
            href="/posts/[slug]"
            className="font-mono text-[0.8125rem] text-accent hover:underline hover:underline-offset-[3px]"
          >
            read the entry →
          </Link>
        </div>
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
    </section>
  );
};

export default HeroPost;
