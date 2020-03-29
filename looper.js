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

function modifyTimes(){
    var x = document.getElementById("frm_times");
    start_time = x.elements[0].value;
	end_time = x.elements[1].value;
	console.log("Printing out start time");
	console.log(start_time);
    document.getElementById("demo").innerHTML = start_time + end_time;
}
ytplayer.addEventListener('timeupdate', youtubeTime);
