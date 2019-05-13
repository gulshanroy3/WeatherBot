var watson=require( "watson-developer-cloud");

const assistant = new watson.AssistantV1({
    iam_apikey: '_K4g5Ja-4vbqy5izGHqfGZw03IOFRd0EqyTjcrBjg_HS',
    version: '2018-09-20',
    url: 'https://gateway-lon.watsonplatform.net/assistant/api'
  });
let context={};
let userMessage=""
  assistant.message({
    workspace_id: '013a828e-d064-468f-a47c-8da38c9b305f',
    input: {'text': "hi"}
    
   },  function(err, response) {
    if (err)
      console.log('error:', err);
    else
     console.log(JSON.stringify(response, null, 2));
      
      })