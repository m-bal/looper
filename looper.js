//ToDo:
//* read the area that changes the video time
//* see if you can manipulate that time.  


ytplayer = document.getElementsByClassName('video-stream')[0];

var start_time;
var end_time;
start_time = 10;
end_time = (3*60)+8;

function youtubeTime(event){
	
	if(ytplayer.currentTime < start_time){
		ytplayer.currentTime = start_time;
	}
	if(ytplayer.currentTime > end_time){
		ytplayer.currentTime = start_time;
	}
}

function modifyTimes(){
		document.getElementById("enterTimes").submit();
}

ytplayer.addEventListener('timeupdate', youtubeTime);
