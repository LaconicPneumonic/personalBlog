import DateFormatter from "./date-formatter";
import Link from "next/link";

type Props = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

const PostPreview = ({ title, date, excerpt, slug }: Props) => {
  return (
    <article className="grid gap-1 py-6 md:grid-cols-[8.5rem_1fr] md:gap-6">
      <span className="font-mono text-[0.8125rem] tabular-nums text-muted">
        <DateFormatter dateString={date} />
      </span>
      <div>
        <h3 className="mb-1.5 text-[1.375rem] font-bold leading-snug [text-wrap:balance]">
          <Link
            as={`/posts/${slug}`}
            href="/posts/[slug]"
            className="hover:text-accent hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            {title}
          </Link>
        </h3>
        <p className="text-[0.97rem] text-muted">{excerpt}</p>
      </div>
    </article>
  );
};

export default PostPreview;
