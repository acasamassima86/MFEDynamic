import { Component } from '@angular/core';
import { BaseMessage, BaseWidget } from 'dist/mfe-library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseWidget {
  title = 'mfe1';
  public message: any = "";

  constructor() {
    super();
  }
  
  //Declare subscribed topics
  override getSubscribedTopics() : string[] {
    return ['search', 'order'];
  }
  
  override notify(message: BaseMessage) {
    //Depending on message type, the code will do different things
    switch(message.type){
      case 'search':
        this.message = 'You searched: ' + message.payload;
        break;
      case 'order':
        this.message = `You ordered: ${message.payload.code} - ${message.payload.description} Total:${message.payload.price}`;
        break;
    }        
  }
}
