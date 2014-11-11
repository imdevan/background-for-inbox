
window.bgImgObj = new Image();

chrome.storage.onChanged.addListener(function(changes, namespace) {

	// Reload the webpage
	location.reload();
});

// Set background image of inbox
function setBgImage(bgImg){
	// console.log("setBgImage Called \n%s ", bgImg);
	if (bgImg.length > 0) {
		bgImgObj.onload = function(){
			placeBg();	
			document.body.style.backgroundImage ="url('" + bgImg + "')";
	    };
		
		bgImgObj.src = bgImg;
	
	    document.body.style.backgroundRepeat ="no-repeat";
	    document.body.style.backgroundAttachment ="fixed";
	    


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

//place body background position
function placeBg(){
	
	// start with full width for display size
	bgImgObj.displayWidth = window.innerWidth;
	bgImgObj.displayHeight = 	bgImgObj.displayWidth *
								bgImgObj.height /
								bgImgObj.width;
	if(bgImgObj.displayHeight >= window.innerHeight){
		// is full width and scrolling
		
		//scroll offset 
		var posY = (0-window.scrollY)*bgImgObj.Parallax;
		//max out on scroll down
		if(posY < -1 * (bgImgObj.displayHeight - window.innerHeight) ){
			posY = -1 * (bgImgObj.displayHeight - window.innerHeight);
		}
		//min on scroll up
		if(posY > 0){
			posY = 0;
		}
		// set resolved position 
		document.body.style.backgroundPositionY = posY + "px";
		document.body.style.backgroundPositionX = "0px";
	}else{
		// is full height and centered
		bgImgObj.displayHeight = window.innerHeight;
		bgImgObj.displayWidth = bgImgObj.displayHeight *
								bgImgObj.width /
								bgImgObj.height;

		// find x that centers the background
		var newX = window.width - bgImgObj.displayWidth;
			newX /= 2;

		//set the resolved position
		document.body.style.backgroundPositionY = "0px";
		document.body.style.backgroundPositionX = newX + "px";
	}
	//set the resolved size 
	document.body.style.backgroundSize = bgImgObj.displayWidth+"px "+ bgImgObj.displayHeight+"px";
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

			chrome.storage.sync.get("bg-for-inbox-pr",function(bgPrFromStore){
				window.bgImgObj.Parallax = bgPrFromStore["bg-for-inbox-pr"];
			});

			//set listener for scrolling
			window.onscroll = placeBg;
			window.onresize = placeBg;
			// ----------------------------------------------------------

		}
	}, 10);
});