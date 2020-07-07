import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Model/Order';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { orderEndpoint } from 'src/app/Service/Http/URL';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {

  public statement: string;
  constructor(private httpApiService: HttpApiService) {
    this.statement = "";
  }

  ngOnInit(): void {
  }

  public getOrders(){

  }

  public createOrder(order: Order) {
    if (order.name.length >= 3){
      this.httpApiService.post(orderEndpoint, order)
      .subscribe(
        data=>{this.statement="Sukces! Zamówienie zapisane poprawnie"; this.getOrders()},
        error=>this.statement="Błąd podczas zapisywania zamówienia"
      );
    }
    else{
      this.statement ="Błąd! Za krótka nazwa";
    }
  }

}
