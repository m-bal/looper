console.log('Starting Background Script');
browserAction.onClicked.addListener(modifyTimes);

var start_time;
var end_time;

start_time = 10;

function modifyTimes(){
    var x = document.getElementById("frm_times");
    start_time = x.elements[0].value;
	end_time = x.elements[1].value;
	console.log("Printing out start time");
	console.log(start_time);
    document.getElementById("demo").innerHTML = start_time + end_time;
}

//console.log(start_time);