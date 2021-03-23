chrome.browserAction.onClicked.addListener((activeTab) => {
  chrome.tabs.executeScript({
    file: 'action.js'
  });
});

chrome.tabs.onActivated.addListener((tabId, cinfo, tab) => {
  chrome.tabs.getSelected(null, (tab) => { 
    switchIconStatus(tab.url);
  });
});

 
chrome.tabs.onUpdated.addListener((tabId, cinfo, tab) => {
  switchIconStatus(tab.url);
});

function switchIconStatus(url) {
  if (isMoviePage(url)) {
    chrome.browserAction.enable();
    chrome.browserAction.setIcon({path: "img/16.png"});
  } else {
    chrome.browserAction.disable();
    chrome.browserAction.setIcon({path: "img/16-disabled.png"});
  }
}

function isMoviePage(url) {
  return /.*:\/\/(www.)youtube.com\/watch\?.*/.test(url);
}