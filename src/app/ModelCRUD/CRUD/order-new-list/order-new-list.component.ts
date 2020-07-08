import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/Model/Order';

@Component({
  selector: 'app-order-new-list',
  templateUrl: './order-new-list.component.html',
  styleUrls: ['./order-new-list.component.css']
})
export class OrderNewListComponent implements OnInit {

  @Input()
  public orderList: Order[];

  constructor() { }

  ngOnInit(): void {
  }

}
