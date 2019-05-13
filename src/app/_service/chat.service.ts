import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators"
 
@Injectable()
export class ChatService {
  
  messages: Subject<any>
  
  
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .pipe(map((response: any): any => {
        return response;
       }))
      }
  
  
  sendMsg(msg) {
    console.log(msg)
    this.messages.next(msg);
  }

}