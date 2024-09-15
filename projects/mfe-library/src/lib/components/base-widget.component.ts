import { Component, EventEmitter } from '@angular/core';
import { BaseMessage } from '../models/base-message.model';

@Component({
    selector: 'mfe-base-widget',
    template: `<div>base widget works!!</div>`,
})
export class BaseWidget {
    
    public broadcast:EventEmitter<BaseMessage> = new EventEmitter<BaseMessage>();

    getSubscribedTopics() : string[] {
        return [];
    }

    notify(message: BaseMessage) : void {
        //Do nothing...
    }        
}