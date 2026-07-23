type Props = {
  children: React.ReactNode;
};

const SectionLabel = ({ children }: Props) => {
  return (
    <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-muted after:mt-2.5 after:block after:border-t after:border-line after:content-['']">
      {children}
    </h2>
  );
};

export default SectionLabel;
