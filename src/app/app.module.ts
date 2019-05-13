import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
// import { WebsocketService } from './websocket.service';
// import { ChatService } from './chat.service';
// import { SearchService } from './search.service';

import { ChatService, SearchService, WebsocketService } from './_service';
import {MyOwnCustomMaterialModule} from './material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { WeatherBotComponent } from './weather-bot/weather-bot.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherBotComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule ,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MyOwnCustomMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [WebsocketService , ChatService , SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
