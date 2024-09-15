import { Component, OnInit } from '@angular/core';
import { BaseWidget } from 'dist/mfe-library';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseWidget implements OnInit {
  title = 'mfe2';

  items:Product[]=[];
  quantity:number = 1;
  selectedProduct:Product;
  
  ngOnInit(){
    this.items.push({code:"ANG",description:"Fresh Angular", price:19.00});
    this.items.push({code:"REC",description:"Boring React", price:10.00});
    this.items.push({code:"RZR",description:"Rotten Razor", price:2.99});
  }
  
  signalFromMFE2() {    
    //Create message payload
    let payload = {code:this.selectedProduct.code, quantity:this.quantity, price:this.quantity*this.selectedProduct.price,description:this.selectedProduct.description};
    //Broadcast event, eventually intercepted by message broker
    this.broadcast.emit({type:"order",payload:payload});
  }
}