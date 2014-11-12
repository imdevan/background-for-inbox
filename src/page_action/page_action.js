
// Get color from chrome storage
chrome.storage.sync.get("bg-for-inbox-color",function(bgColorFromStore){
	for(key in bgColorFromStore){
		var bgColor = bgColorFromStore[key];
		
		// Set inbox value in page action
		document.getElementById("bg-color-input").value = bgColor;
	}
});

// Get image link from chrome storage
chrome.storage.sync.get("bg-for-inbox-img",function(bgImgFromStore){
	for(key in bgImgFromStore){
		var bgImage = bgImgFromStore[key];

		// Set inbox value in page action
		document.getElementById("bg-img-input").value = bgImage;
	}
});


function updateBtnClicked(){
	var bgColorSet = document.getElementById("bg-color-input").value;
	var bgImgSet = document.getElementById("bg-img-input").value;
	
	chrome.storage.sync.set({"bg-for-inbox-color": bgColorSet},function(){});
	chrome.storage.sync.set({"bg-for-inbox-img": bgImgSet},function(){});
};

function resetBtnClicked(){
	chrome.storage.sync.set({"bg-for-inbox-color": ""},function(){});
	chrome.storage.sync.set({"bg-for-inbox-img": ""},function(){});
};

document.getElementById("update-button").addEventListener("click", updateBtnClicked, false);
document.getElementById("reset-button").addEventListener("click", resetBtnClicked, false);