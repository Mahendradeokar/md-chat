"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type StreamingMode = "word";

export interface SmoothStreamingOptions {
  delay?: number;
  streamingMode?: StreamingMode;
  shouldStream?: boolean;
}

const splitTextIntoWords = (text: string): string[] => {
  return text.split(/\s+/).filter((word) => word.length > 0);
};

const splitTextIntoChars = (text: string): string[] => {
  return text.split("");
};

export function useSmoothStreamingText(
  streamingText: string,
  options: SmoothStreamingOptions = {},
) {
  const {
    delay: streamDelay = 10,
    streamingMode = "word",
    shouldStream = false,
  } = options;

  const [displayedText, setDisplayedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(-1);
  const fullTextRef = useRef<string[]>([]);
  const isMounted = useRef<boolean>(false);

  const streamNext = useCallback(
    ({ delay }: { delay: number }) => {
      if (currentIndexRef.current >= fullTextRef.current.length) {
        setIsStreaming(false);
        return;
      }

      timeoutRef.current = setTimeout(() => {
        const nextIndex = currentIndexRef.current + 1;
        const newText = fullTextRef.current[nextIndex];

        console.log("STREAM-Next", newText);
        setDisplayedText((prev) => prev + " " + newText);
        currentIndexRef.current = nextIndex;

        // Continue streaming if there's more text
        if (nextIndex < fullTextRef.current.length) {
          streamNext({ delay: streamDelay });
        } else {
          setIsStreaming(false);
        }
      }, delay);
    },
    [streamDelay],
  );

  useEffect(() => {
    if (streamingText.length < 4) {
      return;
    }

    if (streamingMode === "word") {
      fullTextRef.current = splitTextIntoWords(streamingText);
    } else {
      fullTextRef.current = splitTextIntoChars(streamingText);
    }

    if (shouldStream && !isMounted.current) {
      streamNext({ delay: 0 });
      isMounted.current = true;
      return;
    }

    setDisplayedText(streamingText);
  }, [streamingText, streamingMode, shouldStream, streamNext]);

  console.log("STREAM-full", displayedText);
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    text: displayedText,
    isStreaming,
  };
}
