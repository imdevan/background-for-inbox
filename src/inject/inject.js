chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
	  var storageChange = changes[key];
	  console.log('Storage key "%s" in namespace "%s" changed. ' +
	              'Old value was "%s", new value is "%s".',
	              key,
	              namespace,
	              storageChange.oldValue,
	              storageChange.newValue);
	}
});

function saveChanges() {
	// Get a value saved in a form.
	var theValue = "coral";
	// Check that there's some code there.
	if (!theValue) {
	  // message('Error: No value specified');
	  return;
	}
	// Save it using the Chrome extension storage API.
	chrome.storage.sync.set({'value': theValue}, function() {
	  // Notify that we saved.
	  // message('Settings saved');
	});
};

chrome.extension.sendMessage({}, function(response) {
	// todo: 
	// - commit changes
	// - connect to chrome storage
	// - add ability for user to change their background to pic or color using popup.html
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------

		// Get value from chrome storage
		chrome.storage.sync.get("value",function(valueFromStor){
			
			// Log saved value
			for(key in valueFromStor){
				console.log(String(valueFromStor[key]));	
			}				
		});

		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");

		// Change body background
		document.body.style.background = 'coral';
        document.body.style.background ="url('http://rack.3.mshcdn.com/media/ZgkyMDE0LzA2LzI3LzE5L1BldGVyZGlua2xhLjYzMWYzLmpwZwpwCXRodW1iCTEyMDB4NjI3IwplCWpwZw/240a8b87/ccc/Peter-dinklage-grumpy-cat.jpg')";
        document.body.style.backgroundRepeat ="no-repeat";
        document.body.style.backgroundAttachment ="fixed";
        document.body.style.backgroundSize ="cover";

        // Change background of section headers to transparent so it doesn't look weird
	    var elements = document.getElementsByClassName("Y-bH-bx");
	    for (var i = 0; i < elements.length; i++) {
	        elements[i].style.background ="transparent";
	        elements[i].style.color="whitesmoke";
	    }

	    // Change background when inbox is empty
	    var elements2 = document.getElementsByClassName("av");
	    for (var i = 0; i < elements2.length; i++) {
	    	console.log(i);
	        elements2[i].style.background ="url('http://rack.3.mshcdn.com/media/ZgkyMDE0LzA2LzI3LzE5L1BldGVyZGlua2xhLjYzMWYzLmpwZwpwCXRodW1iCTEyMDB4NjI3IwplCWpwZw/240a8b87/ccc/Peter-dinklage-grumpy-cat.jpg')";
	        elements2[i].style.backgroundRepeat ="no-repeat";
	        elements2[i].style.backgroundSize ="cover";
	    }

		saveChanges();
		// ----------------------------------------------------------

	}
	}, 10);
});