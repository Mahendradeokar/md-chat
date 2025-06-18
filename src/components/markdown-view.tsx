import React, { type Ref } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Components } from "react-markdown";
// import MarkdownPreview from "@uiw/react-markdown-preview";

interface MarkdownViewProps {
  markdown: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ markdown }) => {
  const components: Components = {
    code(props) {
      const { children, className, ...rest } = props;
      const match = /language-(\w+)/.exec(className ?? "");
      return match ? (
        <SyntaxHighlighter
          {...rest}
          ref={rest.ref as unknown as Ref<SyntaxHighlighter>}
          PreTag="div"
          CodeTag="div"
          language={match[1]}
          // style={dark}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-base-to-string */}
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code {...rest} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="prose prose-base dark:prose-invert">
      <Markdown components={components}>{markdown}</Markdown>
    </div>
  );
  // return (
  //   <div className="prose prose-base">
  //     <MarkdownPreview
  //       source={markdown}
  //       style={{
  //         whiteSpace: "pre-wrap",
  //         backgroundColor: "var(--background) !important",
  //         color: "var(--foreground)",
  //       }}
  //     />
  //   </div>
  // );
};
