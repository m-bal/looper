//ToDo:
//* read the area that changes the video time
//* see if you can manipulate that time.  


ytplayer = document.getElementsByClassName('video-stream')[0];

var start_time;
var end_time;

function youtubeTime(event){
	
	if(ytplayer.currentTime < start_time){
		ytplayer.currentTime = start_time;
	}
	if(ytplayer.currentTime > end_time){
		ytplayer.currentTime = start_time;
	}
}


function handleMessage(request, sender, sendResponse) {
	console.log("Message from the content script: " +
	  request.startTime);
	start_time = request.startTime;
	end_time = request.endTime;
	sendResponse({success: true});
}
  
chrome.runtime.onMessage.addListener(handleMessage);



ytplayer.addEventListener('timeupdate', youtubeTime);
