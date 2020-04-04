
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  // read changeInfo data and do something with it
  // like send the new url to content scripts
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, null);
  }
});
