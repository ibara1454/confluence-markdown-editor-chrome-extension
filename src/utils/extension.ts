/**
 * Returns the absolute url of given url in extension.
 * @param url relative path
 */
// eslint-disable-next-line import/prefer-default-export
export const getExternalUrl: (path: string) => string = chrome.runtime.getURL;
