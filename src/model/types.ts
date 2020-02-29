export type Message = {
  // The event type
  event: EventType;

  payload?: any;
};

export type EventType = 'PageChanged' | 'EditorInit' | 'ContentChanged';

export type EditorState = {
  // The whole text content
  text: string;
  // The text of whole css style
  style: string;
};
