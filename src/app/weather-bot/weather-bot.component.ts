import { Component, OnInit } from '@angular/core';
import { ChatService, SearchService, WebsocketService } from '../_service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-weather-bot',
  templateUrl: './weather-bot.component.html',
  styleUrls: ['./weather-bot.component.css']
})
export class WeatherBotComponent implements OnInit {

  title = 'ChatBot';
  message = 'hello' ;
  values = '';
  buttonClicked = false;
  results;
  searchTerm$ = new Subject<string>();
 botMsg: any[] = [];
userMsg: any[] = [];
msg: any;
img = [];
data = [];
copydata = [];
autosuggestion = [];

option = [{'option1': 'Get Current Temperature',
'option2': 'Weekly Forecast'}];
loading: Boolean;
reply = [{
  'text' : ' Hello there,this is Weather-bot!How could i help you?',
  'self': false,

  'data': [],
  'autosuggestion': [],
  'option': [],
  'condition': 0,
  'loading': false
}
];

 constructor(private chat: ChatService, private searchService: SearchService) { }

pushmessage(msg) {
let i = 0;

  for ( i = 0; i < msg.data.length; i++) {
  this.data.push(
   msg.data[i]
  ); }


   for (i = 0; i < msg.autosuggestion.length; i++) {
  this.autosuggestion.push(
   msg.autosuggestion[i]
  ); }
  this.reply.push({
    'text': this.values,
    'self': true,
    'data': [],
    'autosuggestion': [],
    'option': [],
    'condition': 0,
    'loading': false



  }, {
  'text': msg.text,
  'self': false,
  'data': this.data,
  'autosuggestion': this.autosuggestion,
  'option': msg.option,
  'condition': msg.condition,
  'loading': msg.loading


  }
  );

  this.values = '';
  this.img = [];
 this.data = [];
 console.log('autosuggestion' + this.autosuggestion);
  // this.autosuggestion=[];
  // tslint:disable-next-line:no-shadowed-variable
  setTimeout(() => { for (let i = 0; i < this.reply.length; i++) {
    this.reply[i].loading = false; } }, 2000);

}
  ngOnInit() {
    // setTimeout(()=>{ this.loading = false }, 4000)
     console.log('option' + this.reply.length);
    this.chat.messages.subscribe(msg => {
      console.log('bot reply ' + msg);

      this.msg = msg.text;

      this.botMsg.push(msg);
      console.log(this.botMsg);
      this.pushmessage(msg);
    });
    // this.searchService.search(this.searchTerm$)
    //   .subscribe(results => {
    //     this.results = results;



    //     // console.log(results)
    //   });


  }


  onEnter(value: string) {
    const values = value.charAt(0).toUpperCase() + value.slice(1);
     console.log('value' + value);
    this.values = values;
    if (this.values.length > 0) {

    this.chat.sendMsg(this.values);
    this.userMsg.push(this.values);
   console.log(this.userMsg);

    console.log(this.reply);
    }

    for (let i = 0; i < this.reply.length; i++) {
      this.reply[i].option = []; }
      for (let i = 0; i < this.reply.length; i++) {
        this.reply[i].autosuggestion = []; }

        this.autosuggestion = [];

   }

sendMessage(value: string) {

     const values = value.charAt(0).toUpperCase() + value.slice(1);
     console.log('value' + value);
    this.values = values;
    if (this.values.length > 0) {

    this.chat.sendMsg(this.values);
    this.userMsg.push(this.values);
   console.log(this.userMsg);
  //  setTimeout(()=>{ for(var i=0;i<this.reply.length;i++){
  //   this.reply[i].loading = false;} }, 4000)
    }

    for (let i = 0; i < this.reply.length; i++) {
      this.reply[i].option = []; }
      for (let i = 0; i < this.reply.length; i++) {
        this.reply[i].autosuggestion = []; }

        this.autosuggestion = [];
    }


autoSuggestion(value: string) {
  if (value === 'No') {
    this.reply.push(
      {
        'text': value,
        'self': true,
        'data': [],
        'autosuggestion': [],
        'option': [],
        'condition': 0,
        'loading': false



      },
  {
    'text': 'Thanks for Using Our Service',
    'self': false,

    'data': [],
    'autosuggestion': [],
    'option': [],
    'condition': 0,
    'loading': true
  }

    );

    for (let i = 0; i < this.reply.length; i++) {
      this.reply[i].autosuggestion = []; }
      setTimeout(() => { for (let i = 0; i < this.reply.length; i++) {
        this.reply[i].loading = false; } }, 4000);
      // this.autosuggestion=[]

  } else {
    this.reply.push(
      {
        'text': value,
        'self': true,
        'data': [],
        'autosuggestion': [],
        'option': [],
        'condition': 0,
        'loading': false
      },
  {
    'text': 'Hello there,this is Weather-bot!How could i help you?',
    'self': false,

    'data': [],
    'autosuggestion': [],
    'option': this.option,
    'condition': 0,
    'loading': true
  });
  for (let i = 0; i < this.reply.length; i++) {
  this.reply[i].autosuggestion = []; }

    setTimeout(() => { for (let i = 0; i < this.reply.length; i++) {
      this.reply[i].loading = false; } }, 4000);
  // this.option=[];
  // this.autosuggestion=[]
  }
}


}
