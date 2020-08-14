import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Model/Order';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { orderEndpoint } from 'src/app/Service/Http/URL';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {

  public statement: string;
  public orderList: Order[];

  constructor(private httpApiService: HttpApiService, private router: Router) {
    this.statement = "";
    this.orderList = [];
  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    this.httpApiService.get(orderEndpoint)
      .subscribe(
        data => { this.orderList = data;  this.onlyNewOrders() },
        error => { this.statement = "Błąd!!! Nie udało się pobrać danych z serwera" }
      );
  }

  public createOrder(order: Order) {
    if (order.name.length >= 3) {
      this.httpApiService.post(orderEndpoint, order)
        .subscribe(
          data => { this.statement = "Sukces! Zamówienie zapisane poprawnie"; this.getOrders() },
          error => this.statement = "Błąd podczas zapisywania zamówienia"
        );
    }
    else {
      this.statement = "Błąd! Za krótka nazwa";
    }
  }

  private onlyNewOrders() {
    let result: Order[] = [];
    for (let order of this.orderList) {
      if (order.orderStatus === "NEW") {
        result.push(order);
      }
    }
    this.orderList = result; 
  }

  public routeToOrderDetails(id: number){
    this.router.navigate(["/order-details", id]);
  }

  public refreshOrderList(){
    this.getOrders();
  }

}
