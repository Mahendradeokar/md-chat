import type { SSE_EVENTS } from "~/constants";
import type { JSONValue } from "@ai-sdk/ui-utils";

export type SSEEventType = (typeof SSE_EVENTS)[keyof typeof SSE_EVENTS];

export interface BaseSSEEvent {
  type: SSEEventType;
  data: Record<string, JSONValue>;
}

export interface ThreadCreatedEvent extends BaseSSEEvent {
  type: typeof SSE_EVENTS.THREAD_CREATED;
  data: {
    threadId: string;
  };
}

export interface AIModelFailedEvent extends BaseSSEEvent {
  type: typeof SSE_EVENTS.AI_MODEL_FAILED;
  data: {
    error: string;
  };
}

export type SSEEvent = ThreadCreatedEvent | AIModelFailedEvent;
