import PostPreview from "./post-preview";
import type Post from "../interfaces/post";
import SectionLabel from "./section-label";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  return (
    <section className="my-16">
      <SectionLabel>All entries</SectionLabel>
      <div className="divide-y divide-line">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
