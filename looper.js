var ytplayer = document.getElementsByClassName("video-stream")[0];
var start_time = 0;
var end_time = ytplayer.duration;
var chromeDisconnect = chrome.runtime.connect();

function youtubeTime(_) {
  if (typeof chrome.app.isInstalled !== "undefined") {
    chrome.storage.local.get(document.location.href, function (res) {
      const url = Object.keys(res)[0];
      if (res[url]) {
        start_time = res[url].start_time;
        end_time = res[url].end_time;
        if (ytplayer.currentTime < start_time) {
          ytplayer.currentTime = start_time;
        }
        if (ytplayer.currentTime > end_time) {
          ytplayer.currentTime = start_time;
        }
      }
    });
  }
}

ytplayer.addEventListener("timeupdate", youtubeTime);
chromeDisconnect.onDisconnect.addListener(function () {
  chromeDisconnect = undefined;
});
chrome.runtime.onMessage.addListener(function (message, _, sendResponse) {
  switch (message.type) {
    case "end_time":
      sendResponse(ytplayer.duration);
      break;
    case "updatedTime":
      end_time = message.end_time;
      start_time = message.start_time;
      sendResponse();
      break;
    default:
      console.error("Unrecognised message: ", message);
  }
});
