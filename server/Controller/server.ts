import * as express from "express";
import weatherapi from  "../Dao/WeatherApi"

const AssistantV1 = require('ibm-watson/assistant/v1');



let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

 var context={};
let a=new weatherapi();

const assistant = new AssistantV1({
 iam_apikey: 'use ur api key',
    version: '2018-09-20',
  url: 'use ur url',
});

export default class Server {
  constructor() {}



connection(){
  console.log("connection")
  http.listen(3000, () => {
    console.log('started on port 3000');
});
}

msgTransfer(){
   var data;
io.on('connection', (socket) => {

   
    console.log('user connected');

    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

   
    socket.on('message', (message) => {

   let userMessage=message;
      assistant.message({
  workspace_id: 'use ur id',
  input: {'text': userMessage},
  context:context
 },  function(err, response) {
  if (err)
    console.log('error:', err);
  else
   console.log(JSON.stringify(response, null, 2));
    
    context=response.context;
    console.log(context);
  
   
    if(response.context.api=="current"){
var location =response.context.location;

var data=[]
var autosuggestion=[{
  "title":"Do you need any further assistance ?",
  "option1":"Yes",
  "option2":"No"
}]

   var x =a.currentData(location)
   a.currentData(location).catch(err =>{
    io.emit('message', {type:'bot-reply', text:"The  Weather Detail of "+location.toUpperCase()+" is Not Found",data:[],autosuggestion:autosuggestion,option:[],condition:0,loading:true});
     console.log("Caught " + err)});
   x.then(
      json => 
     
      {
        console.log("current"+json.length)
    if(json!=null){
  data.push(
        {
        "img":"http://openweathermap.org/img/w/"+json.weather[0].icon+".png",
        "temp":json.main.temp,
        "min_temp":json.main.temp_min,
        "max_temp":json.main.temp_max,
        "date":"",
        "description":json.weather[0].description

      })
    io.emit('message', {type:'bot-reply', text:"The current Weather Detail of "+location.toUpperCase()+" is ",data:data,autosuggestion:autosuggestion,option:[],condition:0,loading:true});
    //io.emit('message', {type:'bot-reply', text:"",data:[],autosuggestion:[]})
    }
    else{
      io.emit('message', {type:'bot-reply', text:"The  Weather Detail of "+location.toUpperCase()+" is Not Found",data:[],autosuggestion:autosuggestion,option:[],condition:0,loading:true});
    }  
  
  });
  

 context={};

    }
    else if(response.context.api=="curwithdate"){
      var location=response.context.location;
      var date=response.context.date;
     var woeid='';
      
      var newdate=date.replace(/-/g, '/');
         var data=[]
         var j=-1;
         var dateComapre=0
          let today = new Date().valueOf()
          let cdate=new Date(newdate).valueOf()
          console.log(today+" "+cdate)
          if(today<cdate || today==cdate){
           dateComapre=1
          }
          else{
            dateComapre=-1
          }
    var autosuggestion=[{
  "title":"Do you need any further assistance ?",
  "option1":"Yes",
  "option2":"No"
}]
      //var newcurrentDate=currentDate.replace()
      var x=a.cityWoied(location)
      a.cityWoied(location).catch(err =>{
        io.emit('message', {type:'bot-reply', text:"The  Weather Detail of "+location.toUpperCase()+" is Not Found",data:[],autosuggestion:autosuggestion,option:[],condition:0,loading:true});
         console.log("Caught " + err)});
      x.then(json=>{
        console.log(json.length+"woied")
        if(json.length!=0){
       woeid=json[0].woeid}

          if(woeid!=''){
        var y= a.pastWeatherData(woeid,newdate)
        a.pastWeatherData(woeid,newdate).catch(err =>{
          io.emit('message', {type:'bot-reply', text:"The  Weather Detail of "+location.toUpperCase()+" is Not Found",data:[],autosuggestion:autosuggestion,option:[],condition:0,loading:true});
           console.log("Caught " + err)});
        var w=a.weekData(location);
        a.weekData(location).catch(err =>{
          io.emit('message', {type:'bot-reply', text:"The  Weather Detail of "+location.toUpperCase()+" is Not Found",data:[],autosuggestion:autosuggestion,option:[],condition:0,loading:true});
           console.log("Caught " + err)});
        y.then(json=>{
          
          if(json.length==0 || dateComapre==1){
            w.then(json=>{
          for(var i=0;i<json.data.length;i++){
                if(json.data[i].valid_date==date){
                  j=i
                }}
                
                if(j==-1){
                        io.emit('message', {type:'bot-reply', text:"sorry! We can only  predict 16 day forecast. weather detail of " +location + " on "+ date +" is not available ",data:[],autosuggestion:[],option:[],condition:0,loading:true});
                }
                else{
                 
                    data.push(
        {
        "img":"https://www.weatherbit.io/static/img/icons/"+json.data[j].weather.icon+".png",
        "temp":json.data[j].temp,
        "min_temp":json.data[j].min_temp,
        "max_temp":json.data[j].max_temp,
        "date":json.data[j].valid_date,
        "description":json.data[j].weather.description

      })
            
    io.emit('message', {type:'bot-reply', text:"The  Temperature of "+location.toUpperCase()+" on "+date+" will be "+json.data[j].temp+" °C",data:data,autosuggestion:autosuggestion,option:[],condition:0,loading:true});
  
                }
              
              
               

            })
                       
          }
          else{
     
    var i=0;
    
      data.push(
        {
        "img":"https://www.metaweather.com/static/img/weather/"+json[1].weather_state_abbr+".svg",
        "temp":json[1].the_temp,
        "min_temp":json[1].min_temp,
        "max_temp":json[1].max_temp,
        "date":date,
        "description":json[1].weather_state_name

      })
     
      
    
   
    io.emit('message', {type:'bot-reply', text:"Average  Weather Forecast on "+date+" at "+ location.toUpperCase()+" is ",data:data,autosuggestion:autosuggestion,option:[],condition:0,loading:true});
          }
        })}
        else{
          io.emit('message', {type:'bot-reply', text:"The  Weather Detail of "+location.toUpperCase()+" is Not Found",data:[],autosuggestion:autosuggestion,option:[],condition:0,loading:true});
        }
      })
context={}
    }
    else if(response.context.api=="week"){
     
      var location=response.context.location;
      var img=[]
      var data=[]
      var autosuggestion=[{
    "title":"Do you need any further assistance ?",
    "option1":"Yes",
    "option2":"No"
  }]
     
      var x=a.weekData(location)
      a.weekData(location).catch(err =>{
        io.emit('message', {type:'bot-reply', text:"The  Weather Detail of "+location.toUpperCase()+" is Not Found",data:[],autosuggestion:autosuggestion,option:[],condition:0,loading:true});
         console.log("Caught " + err)});
      x.then(
        json => {
         console.log("week"+json.length)
    
    
 
    var i=0;
    for(i=0;i<7;i++){
      data.push(
        {
        "img":"https://www.weatherbit.io/static/img/icons/"+json.data[i].weather.icon+".png",
        "temp":json.data[i].temp,
        "min_temp":json.data[i].min_temp,
        "max_temp":json.data[i].max_temp,
        "date":json.data[i].valid_date,
        "description":json.data[i].weather.description,
        "i":i

      })
     
    }
    io.emit('message', {type:'bot-reply', text:"Week Weather Forecast of "+location.toUpperCase(),data:data,autosuggestion:autosuggestion,option:[],condition:1,loading:true});

  });
// }
// catch(error){
//   console.log(error)
//   io.emit('message', {type:'bot-reply', text:"The  Weather Detail of "+location.toUpperCase()+" is Not Found",data:[],autosuggestion:autosuggestion,option:[],condition:0});
// }
     context={}
     
    }
   else if(response.context.api=="loc"){
    var location=response.context.location;
     option=[{"option1":"Get Current Temperature",
"option2":"Weekly Forecast"}]
data=[];
autosuggestion=[];
io.emit('message', {type:'bot-reply', text:response.output.generic[0].title,data:data,autosuggestion:autosuggestion,option:option,condition:0,loading:true});
context={location:location}   
}
   
    else
    {
     

      console.log("else")
      var msg=""
      var data=[]
      var option=[];
      var autosuggestio=[];
      
         msg=response.output.generic[0].text.replace(/['"]+/g, '');
         
      
       
    
     io.emit('message', {type:'bot-reply', text:msg,data:data,autosuggestion:autosuggestio,option:[],condition:0,loading:true});
     
    }

    

});
    });
});

}
  
}

let s=new Server();
s.connection()
s.msgTransfer()

//console.log(r.getintent+" "+r.getentity+" "+r.getbotText);
