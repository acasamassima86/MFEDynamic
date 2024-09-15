import { Injectable } from "@angular/core";
import { AbstractMessageBrokerService, BaseWidget } from "dist/mfe-library";
import { BaseMessage } from "dist/mfe-library";

@Injectable({ providedIn: 'root' })
export class MessageBrokerService implements AbstractMessageBrokerService {

    private subscribers: any = {};

    //Metodo richiamato per pubblicare un evento ai sottoscrittori dello stesso.
    publish(message: BaseMessage): void {
    
    }

    //Invocata dalla pagina per sottoscrivere un evento su un componente
    //Quando un evento deve essere notificato, il broker richiama il metodo notify del componente
    subscribe(baseWidget: BaseWidget, type: string, callback: (message: BaseMessage) => any): void {
    
    }
}