import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WeatherBotComponent} from './weather-bot';



const routes: Routes = [
  { path: 'weatherbot', component: WeatherBotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
