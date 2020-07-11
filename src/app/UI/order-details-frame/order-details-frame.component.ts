import { Component, OnInit, Input, Output } from '@angular/core';
import { Order } from 'src/app/Model/Order';
import { EventEmitter } from 'protractor';

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

  constructor() { }

  ngOnInit(): void {
  }


}
