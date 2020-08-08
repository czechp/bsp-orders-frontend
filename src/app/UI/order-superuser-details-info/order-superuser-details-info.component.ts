import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/Model/Order';

@Component({
  selector: 'app-order-superuser-details-info',
  templateUrl: './order-superuser-details-info.component.html',
  styleUrls: ['./order-superuser-details-info.component.css']
})
export class OrderSuperuserDetailsInfoComponent implements OnInit {

  @Input()
  public order: Order;
  
  constructor() { }

  ngOnInit(): void {
  }

}
