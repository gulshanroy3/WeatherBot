let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let userMessage="";
let botMessage="";
io.on('connection', (socket) => {

   
    console.log('user connected');

    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

   
    socket.on('message', (message) => {
        var reply=""
       this.userMessage=message;
      
      if(message.toString().trim()=='"hello"'){
        reply="hello";
    }
  
    else{
        reply="sorry"
    }
   
    this.botMessage=reply;
    console.log("Message Received: " + message+" "+this.userMessage+" "+this.botMessage);
        io.emit('message', {type:'bot-reply', text: reply}); 
          
    });
});


http.listen(5000, () => {
    console.log('started on port 5000');
});