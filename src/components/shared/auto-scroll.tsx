export const AutoScroll = ({
  children,
  autoScroll = true,
}: {
  children: React.ReactNode;
  autoScroll?: boolean;
}) => {
  if (!autoScroll) {
    return <>{children}</>;
  }
  return (
    <div
      ref={(el) => {
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }}
    >
      {children}
    </div>
  );
};
