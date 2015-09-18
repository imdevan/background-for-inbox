window.bgImgObj = new Image();
var bg;

// When settings are changed
chrome.storage.onChanged.addListener(function(changes, namespace) {
	// Reload the webpage
	location.reload();
});

function setDoneBG (bg) {
	    // Change background when inbox is empty
	    var doneBG = document.querySelector("#oB > div > div > div.I > div");

	    if(bg.img.length > 0) {
	        doneBG.style.backgroundImage ="url('" + bg.img + "')";
	        doneBG.style.backgroundRepeat ="no-repeat";
	        doneBG.style.backgroundSize ="cover";
    	}

    	if(bg.color.length > 0) {
	        doneBG.style.backgroundColor = bg.color;
	    }

    	if(bg.color.length > 0 || bg.img.length > 0) {
		    var doneSunBG = document.querySelector("#oB > div > div > div.I > div > div");
		    doneSunBG.style.display = "none";
		}

}

setInterval(function(){ setDoneBG(bg) }, 50);

// Set background image of inbox
function setBackground (bg) {
	if (bg.img.length > 0) {
		bgImgObj.onload = function(){
			document.body.style.backgroundImage ="url('" + bg.img + "')";
	    };

		bgImgObj.src = bg.img;

	    document.body.style.backgroundRepeat ="no-repeat";
	    document.body.style.backgroundAttachment ="fixed";
	}

	// Change body background
	if(bg.color.length > 0){
		document.body.style.backgroundColor = bg.color;
	}

	setDoneBG(bg);
}

// the grey bars above sections
function removeDayBackgrounds(){
	var labelBars = document.getElementsByClassName("Y-bK-bz")
	for(var i = 0; i < labelBars.length; i++){
		labelBars[i].style.background = "transparent";
	}
}

// Get data from chrome storage
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {

		if (document.readyState === "complete") {

			clearInterval(readyStateCheckInterval);
			document.body.style.WebkitTransition = 'background-color 2s ease-in-out, background-image 2s ease-in-out';
			// Get color from chrome storage
			chrome.storage.sync.get("background-for-inbox",function (data){
				for(key in data){
					bg = data[key];
					setBackground(bg); 
				}
			});
		}
	}, 10);
});