chrome.storage.onChanged.addListener(function(changes, namespace) {

	// Reload the webpage
	location.reload();
});

// Set background image of inbox
function setBgImage(bgImg){
	// console.log("setBgImage Called \n%s ", bgImg);

	if (bgImg.length > 0) {
	    document.body.style.backgroundImage ="url('" + bgImg + "')";
	    document.body.style.backgroundRepeat ="no-repeat";
	    document.body.style.backgroundAttachment ="fixed";
	    document.body.style.backgroundSize ="cover";
	


	    // Change background when inbox is empty
	    var elements2 = document.getElementsByClassName("av");
	    for (var i = 0; i < elements2.length; i++) {
	        elements2[i].style.backgroundImage ="url('" + bgImg + "')";
	        elements2[i].style.backgroundRepeat ="no-repeat";
	        elements2[i].style.backgroundSize ="cover";
	    }
	}
}

// Set background color of inbo
function setBgColor(bgColor){
	// console.log("setBgColor Called \n%s ", bgColor);

	// Change body background
	if(bgColor.length > 0){
		document.body.style.backgroundColor = bgColor;

	    // Change background when inbox is empty
	    var elements2 = document.getElementsByClassName("av");
	    for (var i = 0; i < elements2.length; i++) 
			elements2[i].style.backgroundColor = color;
	}
}

chrome.extension.sendMessage({}, function(response) {

	var readyStateCheckInterval = setInterval(function() {

	if (document.readyState === "complete") {

		// ----------------------------------------------------------

		var bgColor = "", bgImage = "";
		clearInterval(readyStateCheckInterval);


		// Get color from chrome storage
		chrome.storage.sync.get("bg-for-inbox-color",function(bgColorFromStore){
			for(key in bgColorFromStore){
				bgColor = bgColorFromStore[key];

				setBgColor(bgColor); 
			}
		});

		// Get image link from chrome storage
		chrome.storage.sync.get("bg-for-inbox-img",function(bgImgFromStore){
			for(key in bgImgFromStore){
				bgImage = bgImgFromStore[key];

				setBgImage(bgImage);
			}
		});

		// ----------------------------------------------------------

	}
	}, 10);
});