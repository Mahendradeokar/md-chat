export class EventService {
  static EVENTS = {
    SUGGESTED_PROMPT_CLICKED: "suggested-prompt-clicked",
  };

  private static eventTarget = new EventTarget();

  static listen<T = unknown>(
    eventName: string,
    callback: (data: T) => void,
  ): () => void {
    const handler = (event: Event) => {
      if ("detail" in event) {
        callback((event as CustomEvent<T>).detail);
      }
    };
    this.eventTarget.addEventListener(eventName, handler);
    return () => this.eventTarget.removeEventListener(eventName, handler);
  }

  static broadcast<T = unknown>(eventName: string, data?: T) {
    const event = new CustomEvent<T>(eventName, { detail: data });
    this.eventTarget.dispatchEvent(event);
  }
}
