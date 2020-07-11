import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/Model/Order';

@Component({
  selector: 'app-order-details-frame',
  templateUrl: './order-details-frame.component.html',
  styleUrls: ['./order-details-frame.component.css']
})
export class OrderDetailsFrameComponent implements OnInit {

  @Input()
  public order: Order;

  @Output()
  public changeNameEmit = new EventEmitter();

  public amountItemsInOrder:number;
  constructor() { 
  }

  ngOnInit(): void {
  }

  public changeName(name: string){
    this.changeNameEmit.emit(name);
  }

}
