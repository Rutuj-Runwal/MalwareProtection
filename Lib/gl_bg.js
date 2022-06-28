// const siteadvisorLookup = "https://www.siteadvisor.com/sitereport.html?url=";
// const safeWebLookup = "https://safeweb.norton.com/report/show?url=";
// function scanAllUrls(urldata,sendResponse){
//   var fetches = [];
//   var finalRes = [];
//   console.log(urldata);
//   for (let i = 0; i < urldata.length; i++) {
//     if(urldata[i]===null){
//       finalRes.push(false);
//     }
//     else if(urldata[i].includes("google.com")){
//       finalRes.push(false);
//     }
//     else{
//       fetches.push(
//           fetch(siteadvisorLookup + urldata[i])
//           .then(
//             function(response){
//               if(response.status===200){return response.text();}
//             })
//           .then(function(html){ 
//             let rating = html.includes("risky");
//             // let rating_sw = html.includes("warning");
//             // let rating_oth = html.includes("caution");
//             // let rating = (rating_oth||rating_sw);
//             finalRes.push(urldata[i]+' '+rating);
//           })
//         );
//     }
//   }
//   Promise.all(fetches).then(function() {
//     sendResponse(finalRes);
//   });
// }
// chrome.runtime.onMessage.addListener(
//   function(request,sender,sendResponse) {
//     var data = request;
//     console.log(data);
//     scanAllUrls(data,sendResponse);
//     return true;
//   }
// );