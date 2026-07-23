import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="mb-3 text-4xl font-bold leading-tight tracking-tight [text-wrap:balance] md:text-5xl">
      {children}
    </h1>
  );
};

export default PostTitle;
