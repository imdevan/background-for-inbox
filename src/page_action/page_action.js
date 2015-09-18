
// Get background info from chrome storage
chrome.storage.sync.get("background-for-inbox",function(bgFromStore){
	for(key in bgFromStore){
		var bg = bgFromStore[key];

		// Set inbox value in page action
		document.getElementById("bg-color-input").value = bg.color;
		document.getElementById("bg-img-input").value = bg.img;
	}
});

function updateBtnClicked(){
	var bg = {
		color: document.getElementById("bg-color-input").value,
		img: document.getElementById("bg-img-input").value
	}

	chrome.storage.sync.set({"background-for-inbox": bg},function(){});
};

function resetBtnClicked(){
	chrome.storage.sync.set({"background-for-inbox": null},function(){});
};

document.getElementById("update-button").addEventListener("click", updateBtnClicked, false);
document.getElementById("reset-button").addEventListener("click", resetBtnClicked, false);
