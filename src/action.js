function openCal() {
    if (/.*:\/\/(www.)youtube.com\/watch\?.*/.test(window.location.href)) {
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
      const DATE = new Date(new Date().getFullYear() + "/" + document.querySelector(QUERY_DATE).textContent.replace('月','/').replace('日',''))
                   .toISOString()
                   .replaceAll(/[/.:-]/g, '');
      var url = BASE_URL + encodeURIComponent(TEXT) + 
                AND_LOCATION + encodeURIComponent(YOUTUBE_URL) + 
                AND_DATES + DATE + 
                ESCAPE_SLASH + DATE;
      open(url, "_blank");
    }
  }
  openCal();