import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import SinebowBand from "./sinebow-band";

type Props = {
  title: string;
  date: string;
  excerpt?: string;
};

const PostHeader = ({ title, date, excerpt }: Props) => {
  return (
    <header className="pt-8">
      <p className="mb-4 font-mono text-[0.8125rem] tabular-nums text-muted">
        <DateFormatter dateString={date} />
      </p>
      <PostTitle>{title}</PostTitle>
      {excerpt && <p className="mb-7 text-xl italic text-muted">{excerpt}</p>}
      <div className="mb-10">
        <SinebowBand height={56} rows={7} peaks={4} dotRadius={1.6} />
      </div>
    </header>
  );
};

export default PostHeader;
