import { Message } from '@/model/types';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // read changeInfo data and do something with it
  // like send the new url to content scripts
  if (changeInfo.url) {
    const message: Message = {
      event: 'PageChanged',
    };
    chrome.tabs.sendMessage(tabId, message);
  }
});
