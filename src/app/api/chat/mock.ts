import { simulateReadableStream } from "ai";
import { MockLanguageModelV1 } from "ai/test";

export const getMockTitleModel = () => {
  return new MockLanguageModelV1({
    doGenerate: async () => ({
      rawCall: { rawPrompt: null, rawSettings: {} },
      finishReason: "stop",
      usage: { promptTokens: 10, completionTokens: 20 },
      text: `Mock Title for the Conversation`,
    }),
  });
};

// Mock model for chat streaming
export const getMockChatModel = () => {
  return new MockLanguageModelV1({
    doStream: async () => ({
      stream: simulateReadableStream({
        chunks: [
          {
            type: "text-delta",
            textDelta: "React is a revolutionary JavaScript library",
          },
          {
            type: "text-delta",
            textDelta: " that has transformed web development",
          },
          {
            type: "text-delta",
            textDelta: " and modern application architecture.",
          },
          {
            type: "text-delta",
            textDelta: " Let me provide you with an in-depth exploration",
          },
          { type: "text-delta", textDelta: " of its fundamental concepts," },
          { type: "text-delta", textDelta: " advanced features," },
          { type: "text-delta", textDelta: " and real-world applications:" },
          { type: "text-delta", textDelta: "\n\n**What is React?**\n\n" },
          {
            type: "text-delta",
            textDelta: "React is an open-source JavaScript library",
          },
          { type: "text-delta", textDelta: " developed by Facebook" },
          { type: "text-delta", textDelta: " (now Meta)" },
          {
            type: "text-delta",
            textDelta: " that introduced a paradigm shift",
          },
          { type: "text-delta", textDelta: " in web development through its" },
          { type: "text-delta", textDelta: " component-based architecture." },
          { type: "text-delta", textDelta: " It enables developers to create" },
          {
            type: "text-delta",
            textDelta: " modular, reusable UI components",
          },
          { type: "text-delta", textDelta: " that can be composed together" },
          {
            type: "text-delta",
            textDelta: " to build sophisticated applications",
          },
          {
            type: "text-delta",
            textDelta: " with maintainable and scalable code.",
          },
          {
            type: "text-delta",
            textDelta: "\n\n**Core Features and Architecture**\n\n",
          },
          {
            type: "text-delta",
            textDelta: "React's virtual DOM implementation",
          },
          {
            type: "text-delta",
            textDelta: " provides exceptional performance",
          },
          {
            type: "text-delta",
            textDelta: " by minimizing actual DOM manipulations.",
          },
          { type: "text-delta", textDelta: " Its one-way data flow" },
          {
            type: "text-delta",
            textDelta: " makes applications more predictable",
          },
          { type: "text-delta", textDelta: " and easier to debug." },
          {
            type: "text-delta",
            textDelta: "\n\n**Advanced Component Patterns**\n\n",
          },
          {
            type: "text-delta",
            textDelta: "Modern React development leverages",
          },
          { type: "text-delta", textDelta: " powerful patterns like hooks," },
          { type: "text-delta", textDelta: " context API, and custom hooks" },
          { type: "text-delta", textDelta: " for state management and" },
          { type: "text-delta", textDelta: " side effects." },
          { type: "text-delta", textDelta: " Higher-order components" },
          { type: "text-delta", textDelta: " and render props enable" },
          { type: "text-delta", textDelta: " code reuse and composition." },
          {
            type: "text-delta",
            textDelta: "\n\n**Ecosystem and Best Practices**\n\n",
          },
          {
            type: "text-delta",
            textDelta: "The React ecosystem includes",
          },
          {
            type: "text-delta",
            textDelta: " essential tools like React Router",
          },
          { type: "text-delta", textDelta: " for navigation," },
          { type: "text-delta", textDelta: " Redux for state management," },
          { type: "text-delta", textDelta: " and various testing utilities." },
          { type: "text-delta", textDelta: " Best practices include" },
          { type: "text-delta", textDelta: " proper component composition," },
          { type: "text-delta", textDelta: " performance optimization," },
          {
            type: "text-delta",
            textDelta: " and accessibility considerations.",
          },
          {
            type: "text-delta",
            textDelta: "\n\n**Future of React**\n\n",
          },
          {
            type: "text-delta",
            textDelta: "React continues to evolve with",
          },
          { type: "text-delta", textDelta: " features like concurrent mode," },
          { type: "text-delta", textDelta: " server components," },
          { type: "text-delta", textDelta: " and improved performance." },
          { type: "text-delta", textDelta: " The community-driven nature" },
          { type: "text-delta", textDelta: " ensures continuous innovation" },
          { type: "text-delta", textDelta: " and adaptation to modern needs." },
          {
            type: "finish",
            finishReason: "stop",
            logprobs: undefined,
            usage: { completionTokens: 60, promptTokens: 5 },
          },
        ],
        initialDelayInMs: 0,
        chunkDelayInMs: 600,
      }),
      rawCall: { rawPrompt: null, rawSettings: {} },
    }),
  });
};
