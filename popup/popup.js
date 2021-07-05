var start_time = 0;
var end_time;
var currentTime = 0;
var currWindowId;
const slider = document.getElementById("slider");
const valueslider = document.getElementById("temp");

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function formatSecs(totalsecs) {
  var hour = parseInt(totalsecs / 3600, 10) % 24;
  var min = parseInt(totalsecs / 60, 10) % 60;
  var secs = parseInt(totalsecs) % 60;

  return pad(hour, 2) + ":" + pad(min, 2) + ":" + pad(secs, 2);
}

function sendUpdatedTime(tab, st, et) {
  chrome.tabs.sendMessage(
    tab[0].id,
    { type: "updatedTime", start_time: st, end_time: et },
    function () {
      chrome.storage.local.set({
        [tab[0].url]: {
          ["start_time"]: st,
          ["end_time"]: et,
        },
      });
    }
  );
}
function sliderChange() {
  noUiSlider.create(slider, {
    start: [0, end_time],
    connect: true,
    tooltips: [
      {
        to: (value) => {
          return formatSecs(value);
        },
      },
      {
        to: (value) => {
          return formatSecs(value);
        },
      },
    ],
    range: {
      min: start_time,
      max: end_time,
    },
  });
  slider.noUiSlider.on("slide", function (values, handle) {
    if (handle) {
      end_time = values[handle];
      chrome.tabs.query({ active: true, windowId: currWindowId }, function (
        tabs
      ) {
        sendUpdatedTime(tabs, start_time, end_time);
      });
    } else {
      start_time = values[handle];
      chrome.tabs.query({ active: true, windowId: currWindowId }, function (
        tabs
      ) {
        sendUpdatedTime(tabs, start_time, end_time);
      });
    }
  });
}
function restoreTimes() {
  chrome.tabs.query({ windowId: currWindowId, active: true }, function (tabs) {
    chrome.storage.local.get(tabs[0].url, function (res) {
      const url = Object.keys(res)[0];
      console.log(res);
      if (res[url]) {
        start_time = res[url].start_time;
        end_time = res[url].end_time;
        slider.noUiSlider.set([start_time, null]);
        slider.noUiSlider.set([null, end_time]);
        sendUpdatedTime(tabs, start_time, end_time);
      }
    });
  });
}
function getTimes() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "end_time" }, function (
      duration
    ) {
      console.log("what is duration: ", duration);
      if (typeof duration == "undefined") {
        if (chrome.runtime.lastError) {
          console.error("probably not a youtube page");
          end_time = 100;
        }
      } else {
        end_time = duration;
        sliderChange();
        restoreTimes();
      }
    });
  });
  chrome.windows.getCurrent({ populate: true }, function (windowInfo) {
    currWindowId = windowInfo.id;
  });
}
getTimes();
chrome.tabs.onUpdated.addListener(restoreTimes);
