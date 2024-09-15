import { Injectable } from "@angular/core";
import { BaseWidget } from "dist/mfe-library";
import { BaseMessage } from "dist/mfe-library";

@Injectable({ providedIn: 'root' })
export class MessageBrokerService {

    private subscribers: any = {};

    //Called to publish an event to the event subscribers    
    publish(message: BaseMessage): void {
        if (this.subscribers[message.type]) {
            for (let index = 0; index < this.subscribers[message.type].length; index++) {
                const callback = this.subscribers[message.type][index];
                callback(message);
            }
        }
    }

    //Called by the component to subscribe an event on component
    subscribe(baseWidget: BaseWidget, type: string, callback: (message: BaseMessage) => any): void {
        if (!this.subscribers[type]) {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(callback.bind(baseWidget));
    }
}