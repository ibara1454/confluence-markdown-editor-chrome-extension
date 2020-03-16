import { Message } from '@/model/types';

/**
 * Broadcast a message to every frame except for the sender's frame.
 * @param message The message which will sent via extension API.
 */
// eslint-disable-next-line import/prefer-default-export
export function sendMessage(message: Message): void {
  // https://developer.chrome.com/apps/runtime#method-sendMessage
  chrome.runtime.sendMessage(message);
}
