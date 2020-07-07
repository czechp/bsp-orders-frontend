import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/Model/Order';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  @Output()
  createEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public createOrder(name: string){

    this.createEmitter.emit({name: name});
  }

}
