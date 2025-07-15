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
          const refId = requestAnimationFrame(() =>
            el.scrollIntoView({ behavior: "smooth", block: "end" }),
          );

          return () => {
            cancelAnimationFrame(refId);
          };
        }
      }}
    >
      {children}
    </div>
  );
};
