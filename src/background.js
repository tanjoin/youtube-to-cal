chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ["action.js"]
  });
});

chrome.tabs.onActivated.addListener(async (tabId, cinfo, tab) => {
  const [targetTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  await switchIconStatus(targetTab);
});

 
chrome.tabs.onUpdated.addListener(async (tabId, cinfo, tab) => {
  const [targetTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  await switchIconStatus(tab);
});

function isMoviePage(url) {
  return /.*:\/\/(www.)youtube.com\/watch\?.*/.test(url);
}

async function switchIconStatus(tab) {
  if (isMoviePage(tab.url)) {
    chrome.action.enable(tab.id);
    chrome.action.setIcon({path: "img/16.png"});
  } else {
    chrome.action.disable(tab.id);
    chrome.action.setIcon({path: "img/16-disabled.png"});
  }
}