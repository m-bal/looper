
var start_time;
var end_time;

start_time = 10;

document.getElementById("timesubmit").onclick = function(){
    var x = document.getElementById("frm_times");
    start_time = x.elements[0].value;
	end_time = x.elements[1].value;

    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs);
        chrome.tabs.sendMessage(
            tabs[0].id, 
            {
                startTime:start_time,
                endTime:end_time
            },
            function(response){
                document.getElementById("demo").innerHTML = start_time + ":" + end_time;
                console.log(response);
            }
        );
    });
}