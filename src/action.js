function openCal() {
  const BASE_URL = "https://www.google.com/calendar/render?action=TEMPLATE&text=";
  const NL = "\n";
  let TEXT = "";
  if (document.querySelector('.title')) {
    TEXT = document.querySelector('.title').textContent + NL;
  }
  const YOUTUBE_URL = window.location.href;
  const DATE = new Date(new Date().getFullYear() + "/" + document.querySelector('#movie_player > div.ytp-offline-slate.ytp-offline-slate-collapsed > div.ytp-offline-slate-bar > span.ytp-offline-slate-messages > div.ytp-offline-slate-subtitle-text').textContent.replace('月','/').replace('日','')).toISOString().replaceAll(/[/.:-]/g, '');
  var url = BASE_URL + encodeURIComponent(TEXT) + "&location=" + encodeURIComponent(YOUTUBE_URL) + "&dates=" + DATE + "%2F" + DATE;
  open(url, "_blank");
}

function isMoviePage() {
  return /.*:\/\/(www.)youtube.com\/watch\?.*/.test(window.location.href);
}

if (isMoviePage()) {
  openCal();
}

