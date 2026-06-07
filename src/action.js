function openCal() {
    if (/.*:\/\/(www.)youtube.com\/watch\?.*/.test(window.location.href)　||
        /https:\/\/www.youtube.com\/live\/.*/.test(window.location.href)) {
      
      // デフォルトのイベント時間（2時間）
      const DEFAULT_EVENT_DURATION = 2;
      
      // 設定からイベント時間を取得
      chrome.storage.sync.get({
        eventDuration: DEFAULT_EVENT_DURATION
      }, function(items) {
        const BASE_URL = "https://www.google.com/calendar/render?action=TEMPLATE&text=";
        const AND_LOCATION = "&location=";
        const AND_DATES = "&dates=";
        const ESCAPE_SLASH = "%2F";
        const QUERY_DATE = '#movie_player div.ytp-offline-slate-subtitle-text';
        const NL = "\n";
        let TEXT = "";
        const TODAY = new Date();
        const TOMORROW = new Date(TODAY.getTime() + 24 * 60 * 60 * 1000);
        const YESTERDAY = new Date(TODAY.getTime() - 24 * 60 * 60 * 1000);
        let titles = [...document.querySelectorAll('h1.title')]
            .map((e) => e.textContent.trim())
            .filter((e) => e.length > 0);
        if (titles.length > 0) {
          TEXT = titles.pop() + NL;
        }
        const YOUTUBE_URL = window.location.href;
        let DATE = new Date(new Date().getFullYear() + "/" + document.querySelector(QUERY_DATE).textContent.replace('月','/').replace('日',''))
                     .toISOString()
                     .replaceAll(/[/.:-]/g, '');
        if (YESTERDAY > new Date(DATE.slice(0,4) + "/" + DATE.slice(4,6) + "/" + DATE.slice(6,8))) {
          DATE = (new Date().getFullYear() + 1) + DATE.slice(4);
        }
        
        // 終了時刻を計算（開始時刻 + 設定された時間）
        // DATEの形式: YYYYMMDDTHHmmssZ (例: 20251205T200000Z)
        const startDate = new Date(DATE.slice(0,4) + "/" + DATE.slice(4,6) + "/" + DATE.slice(6,8) + " " + DATE.slice(9,11) + ":" + DATE.slice(11,13) + ":" + DATE.slice(13,15) + "Z");
        const endDate = new Date(startDate.getTime() + items.eventDuration * 60 * 60 * 1000);
        const END_DATE = endDate.toISOString().replaceAll(/[/.:-]/g, '');
        
        var url = BASE_URL + encodeURIComponent(TEXT) + 
                  AND_LOCATION + encodeURIComponent(YOUTUBE_URL) + 
                  AND_DATES + DATE + 
                  ESCAPE_SLASH + END_DATE;
        open(url, "_blank");
      });
    }
  }
  openCal();