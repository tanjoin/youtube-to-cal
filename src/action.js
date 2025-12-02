function openCal() {
    if (/.*:\/\/(www.)youtube.com\/watch\?.*/.test(window.location.href)　||
        /https:\/\/www.youtube.com\/live\/.*/.test(window.location.href)) {
      const BASE_URL = "https://www.google.com/calendar/render?action=TEMPLATE&text=";
      const AND_LOCATION = "&location=";
      const AND_DATES = "&dates=";
      const ESCAPE_SLASH = "%2F";
      const QUERY_DATE = '#movie_player div.ytp-offline-slate-subtitle-text';
      const NL = "\n";
      let TEXT = "";
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
      if (new Date() > new Date(DATE.slice(0,4) + "/" + DATE.slice(4,6) + "/" + DATE.slice(6,8))) {
        DATE = (new Date().getFullYear() + 1) + DATE.slice(4);
      }
      var url = BASE_URL + encodeURIComponent(TEXT) + 
                AND_LOCATION + encodeURIComponent(YOUTUBE_URL) + 
                AND_DATES + DATE + 
                ESCAPE_SLASH + DATE;
      open(url, "_blank");
    }
  }
  openCal();