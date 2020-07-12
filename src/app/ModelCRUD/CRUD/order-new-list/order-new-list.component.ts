import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Order } from 'src/app/Model/Order';

@Component({
  selector: 'app-order-new-list',
  templateUrl: './order-new-list.component.html',
  styleUrls: ['./order-new-list.component.css']
})
export class OrderNewListComponent implements OnInit {

  @Input()
  public orderList: Order[];

  @Output()
  public orderIdEmit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public getOrderId(id: number){
    this.orderIdEmit.emit(id);
  }
}
