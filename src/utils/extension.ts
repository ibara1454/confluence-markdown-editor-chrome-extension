import { Message } from '@/model/types';
import path from 'path';

/**
 * Broadcast a message to every frame except for the sender's frame.
 * @param message The message which will sent via extension API.
 */
// eslint-disable-next-line import/prefer-default-export
export function sendMessage(message: Message): void {
  // https://developer.chrome.com/apps/runtime#method-sendMessage
  chrome.runtime.sendMessage(message);
}

/**
 * Returns the absolute url of given url in extension.
 * @param url relative path
 */
export function getExternalUrl(url: string): string {
  return chrome.runtime.getURL(path.resolve('dist', url));
}
