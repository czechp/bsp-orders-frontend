import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Model/Order';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { orderEndpoint } from 'src/app/Service/Http/URL';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-current',
  templateUrl: './order-current.component.html',
  styleUrls: ['./order-current.component.css']
})
export class OrderCurrentComponent implements OnInit {

  public statement: string;
  public orderList: Order[];

  constructor(private httpApiService: HttpApiService, private router: Router) {
    this.statement = "";
    this.orderList = [];
  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(){
    this.httpApiService.get(orderEndpoint)
    .subscribe(
      data => {this.orderList = data; this.onlyCurrentOrders()},
      error => {this.statement = "Błąd! Nie udało sie pobrać danych z serwer"}
    );

  }



  private onlyCurrentOrders() {
    let result: Order[] = [];
    for (let order of this.orderList) {
      if (order.orderStatus === "REALISE") {
        result.push(order);
      }
    }
    this.orderList = result;
  }
}
