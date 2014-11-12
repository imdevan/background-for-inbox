
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

chrome.storage.sync.get("bg-for-inbox-pr",function(bgPrFromStore){
	console.log(bgPrFromStore);
	var bgPr = bgPrFromStore["bg-for-inbox-pr"];

	document.getElementById("range-output").innerHTML = "Parallax: "+bgPr*100 + "%";
	document.getElementById("bg-pr-input").value = bgPr;
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

document.getElementById("bg-pr-input").addEventListener("change",function(){
	
	var val = this.value;
	chrome.storage.sync.set({"bg-for-inbox-pr": val},function(){
		document.getElementById("range-output").innerHTML = "Parallax: "+val*100 + "%";	
	});
}, false);

document.getElementById("update-button").addEventListener("click", updateBtnClicked, false);
document.getElementById("reset-button").addEventListener("click", resetBtnClicked, false);
