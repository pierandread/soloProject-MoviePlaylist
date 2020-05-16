//NOT IMPLEMENTED YET

import React, { useState, useEffect } from 'react';




function LoginYoutube() {

  console.log(window.gapi);


  function authenticate() {
    return window.gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    return window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return window.gapi.client.youtube.playlists.insert({
      "part": "snippet,status",
      "resource": {
        "snippet": {
          "title": "Sample playlist created via API",
          "description": "This is a sample playlist description.",
          "tags": [
            "sample playlist",
            "API call"
          ],
          "defaultLanguage": "en"
        },
        "status": {
          "privacyStatus": "private"
        }
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  window.gapi.load("client:auth2", function() {
    window.gapi.auth2.init({client_id: "429772444693-esnv746j9ccl0rabdfmfnhi678v5j7id.apps.googleusercontent.com"});
  }
  
  );


  


  return (
    <div>
      <button onClick={()=>authenticate().then(loadClient)}>authorize and load</button>
      <button onClick={execute}>execute</button>
    </div>
  );
}



export default LoginYoutube;


// console.log(window.gapi);

// function authenticate() {
//   return window.gapi.auth2.getAuthInstance()
//       .signIn({scope: "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly"})
//       .then(function() { console.log("Sign-in successful"); },
//             function(err) { console.error("Error signing in", err); });
// }
// function loadClient() {
//   return window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//       .then(function() { console.log("GAPI client loaded for API"); },
//             function(err) { console.error("Error loading GAPI client for API", err); });
// }
// // Make sure the client is loaded and sign-in is complete before calling this method.
// function execute() {
//   return window.gapi.client.youtube.channels.list({
//     "part": "snippet,contentDetails,statistics"
//   })
//       .then(function(response) {
//               // Handle the results here (response.result has the parsed body).
//               console.log("Response", response);
//             },
//             function(err) { console.error("Execute error", err); });
// }
// window.gapi.load("client:auth2", function() {
//   window.gapi.auth2.init({client_id: "429772444693-esnv746j9ccl0rabdfmfnhi678v5j7id.apps.googleusercontent.com"});
// });

// return (
//   <div>
//     <button onClick={()=>authenticate().then(loadClient)}>authorize and load</button>
//     <button onClick={()=>execute()}>execute</button>
//   </div>
// );
// }
