//ToDo:
//* read the area that changes the video time
//* see if you can manipulate that time.  


ytplayer = document.getElementsByClassName('video-stream')[0];

function youtubeTime(event){
	
	if(ytplayer.currentTime < 10){
		ytplayer.currentTime = 10;
	}
	if(ytplayer.currentTime > (3*60)+8){
		ytplayer.currentTime = 10;
	}
}
ytplayer.addEventListener('timeupdate', youtubeTime);