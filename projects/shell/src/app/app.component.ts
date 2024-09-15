import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseMessage, BaseWidget } from 'dist/mfe-library';
import { Subscription } from 'rxjs';
import { WidgetConfiguration } from './models/widget-configuration.model';
import { MessageBrokerService } from './services/message-broker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shell';

  //Component host: can be more than one
  @ViewChild('placeHolder', { read: ViewContainerRef, static: true })  
  viewContainer: ViewContainerRef;  
  searchTerms: string;
  //Configuration for the widgets. Can be read from remote REST call
  widgetConfigurations: WidgetConfiguration[] = [];
  //Subscription of broadcast eventemitter, defined in BaseWidgetClass
  //WARNING! All the subscriptions must be unsubscribed, or memory leaks will creep...
  subscriptions: Subscription[] = [];

  constructor(private messageBrokerService: MessageBrokerService) { }

  async ngOnInit() {

    ///////////////////////////////////////////////////////////////////
    // Loading and creating remote components
    ///////////////////////////////////////////////////////////////////
    this.widgetConfigurations.push({ remoteEntry: 'http://localhost:3000/remoteEntry.js', exposedModule: './Component', componentName: 'AppComponent' });
    this.widgetConfigurations.push({ remoteEntry: 'http://localhost:3000/remoteEntry.js', exposedModule: './Component', componentName: 'AppComponent' });
    this.widgetConfigurations.push({ remoteEntry: 'http://localhost:3001/remoteEntry.js', exposedModule: './Component', componentName: 'AppComponent' });

    this.widgetConfigurations.forEach(async (cfg) => {
      await this.pushWidget(cfg);
    });
  }

  public testFromShell() {
    this.messageBrokerService.publish({ type: "search", payload: this.searchTerms });
  }

  /////////////////////////////////////////////////////////////////////
  //    //Loading component from remote
  //    It's necessary:
  //    the remote name (mfe1) 
  //    exposedModule name (./Component) 
  //    the name of the component to create (AppComponent)
  //    remote entry url
  //
  //    In the remote there must be these settings in webpack.config.js      
  //
  /////////////////////////////////////////////////////////////////////
  async pushWidget(config: WidgetConfiguration) {
    //Load module
    const component = await loadRemoteModule({
      type: 'module',
      remoteEntry: config.remoteEntry,
      exposedModule: config.exposedModule
    }).then(m => m[config.componentName]);

    //Create component
    let cref = this.viewContainer.createComponent<BaseWidget>(component);

    //Read subscribed topics and register in message broker
    cref.instance.getSubscribedTopics().forEach((t: string) => {
      this.messageBrokerService.subscribe(cref.instance, t, cref.instance.notify);
    });
    
    //Wire broadcast event to messageboker publish call
    let sub = cref.instance.broadcast.subscribe((e: BaseMessage) => {
      this.messageBrokerService.publish(e);
    });
    //Track subscription for clean-up
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    console.log("Clear subscription to awoid memory leaks!");
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
