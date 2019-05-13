import fetch from 'node-fetch';
 export default class weatherapi
 
 {
async  currentData(location:string) {
  
let response=await fetch('https://api.openweathermap.org/data/2.5/weather?q='+location+'&units=metric&appid=RegisterOnOpenWeatherGetKey')
  
  let data = await response.json();
  if (response.status >= 200 && response.status < 300) {
    return data;
  } else {
    return data.then(err => {throw err;});
  }
}
 
 async  weekData(location:string) {

  let response=await fetch("https://api.weatherbit.io/v2.0/forecast/daily?city="+location+"&key=RegisterOnWeatherBitGetKey")
  let data = await response.json();

  //return data;
  if (response.status >= 200 && response.status < 300) {
    return data;
  } else {
    return data.then(err => {throw err;});
  }

 

 
}
  
 async  cityWoied(location:string) {

let response=await fetch("https://www.metaweather.com/api/location/search/?query="+location)
 
  let data = await response.json();

  
  if (response.status >= 200 && response.status < 300) {
    return data;
  } else {
    return data.then(err => {throw err;});
  }
}
async  pastWeatherData(woeid:string,date:string) {

let response=await fetch("https://www.metaweather.com/api/location/"+woeid+"/"+date)
 
  let data = await response.json();

  
  if (response.status >= 200 && response.status < 300) {
    return data;
  } else {
    return data.then(err => {throw err;});
  }
}
}

 
