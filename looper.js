//ToDo:
//* read the area that changes the video time
//* see if you can manipulate that time.  
youtubeTime();

function youtubeTime(){

	while(1){
		var progressbar = document.getElementsByClassName("ytp-progress-bar").item(0);
		console.log(progressbar.getAttribute("aria-valuetext"))
		
	}
}
