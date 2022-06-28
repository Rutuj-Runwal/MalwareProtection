const urlHaus = "https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-online.txt";
const urlHausBackup = "https://malware-filter.pages.dev/urlhaus-filter-online.txt";
function saveUpdateTime(){
	const tDate = new Date().toLocaleDateString();
	chrome.storage.local.set({run_day:tDate});
}
function performUpdate(){
	try{
	fetch(urlHaus).then(function(response){
		if (response.status !== 200) {
	        console.log('Looks like there was a problem. Status Code: ' +
	          response.status);
	    }
	    else{
	    	return response.text()
	    }}).then(function(text){
	    	const urlData = text.split("\n");
	    	console.log(urlData);
	    	var id = 1
			var finalRegexArr = []
			urlData.forEach((item) => {
				if(!item.includes("! ") && item.length!=0){
					if(item.includes("$all")){
						item=item.replace('$all','');
						console.log(item);
					}
				    finalRegexArr.push({
				        "id": id++,
				        "priority": 1,
				        "action": {
				            "type": "block"
				        },
				        "condition": {
				            "urlFilter": item,
				            "resourceTypes": [
				                "main_frame",
				                "sub_frame",
				                "script",
				                "xmlhttprequest",
				                "ping",
				                "csp_report",
				                "media",
				                "websocket",
				                "image",
				                "webtransport",
				                "webbundle",
				                "other"
				            ]
				        }
				    })
				}
			});
			finalRegexArr.forEach((registerRule, index) => {
		      let id = index + 1;
		      chrome.declarativeNetRequest.updateDynamicRules({
		        addRules: [
		          registerRule
		        ],
		        removeRuleIds: [id],
		      });
		    });
		}).catch((error) => {
		  console.log(error)
		});
	}catch(err){
		console.log("Error");
	}finally{
		fetch(urlHausBackup).then(function(response){
		if (response.status !== 200) {
	        console.log('Looks like there was a problem. Status Code: ' +
	          response.status);
	    }
	    else{
	    	return response.text()
	    }}).then(function(text){
	    	const urlData = text.split("\n");
	    	console.log(urlData);
	    	var id = 1
			var finalRegexArr = []
			urlData.forEach((item) => {
				if(!item.includes("! ") && item.length!=0){
					if(item.includes("$all")){
						item=item.replace('$all','');
						console.log(item);
					}
				    finalRegexArr.push({
				        "id": id++,
				        "priority": 1,
				        "action": {
				            "type": "block"
				        },
				        "condition": {
				            "urlFilter": item,
				            "resourceTypes": [
				                "main_frame",
				                "sub_frame",
				                "script",
				                "xmlhttprequest",
				                "ping",
				                "csp_report",
				                "media",
				                "websocket",
				                "image",
				                "webtransport",
				                "webbundle",
				                "other"
				            ]
				        }
				    })
				}
			});
			finalRegexArr.forEach((registerRule, index) => {
		      let id = index + 1;
		      chrome.declarativeNetRequest.updateDynamicRules({
		        addRules: [
		          registerRule
		        ],
		        removeRuleIds: [id],
		      });
		    });
		}).catch((error) => {
		  console.log(error)
		});
	}
}

function dbOutOfDateCheck(){
	chrome.storage.local.get(['run_day'], function(result) {
	  let checkerDate = new Date().toLocaleDateString();		
	  if(result.run_day===undefined){
	  	performUpdate();
	  	saveUpdateTime();
	  	console.log("First Update Performed!");
	  }
	  else if(result.run_day!==checkerDate){
	  	saveUpdateTime();
	  	performUpdate();
	  	console.log("Updated Successfully!");

	  }
	});
}
setInterval(dbOutOfDateCheck, 60000);