/**
 * Returns the absolute url of given url in extension.
 * @param url relative path
 */
// eslint-disable-next-line import/prefer-default-export
export function getExternalUrl(url: string): string {
  return chrome.runtime.getURL(url);
}
