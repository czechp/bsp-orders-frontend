import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { orderEndpoint } from 'src/app/Service/Http/URL';
import { Order } from 'src/app/Model/Order';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-finished',
  templateUrl: './order-finished.component.html',
  styleUrls: ['./order-finished.component.css']
})
export class OrderFinishedComponent implements OnInit {

  public statement: string = "";
  public orderList: Order[];
  
  constructor(private httpApi: HttpApiService, private router: Router) { }

  ngOnInit(): void {
    this.httpApi.get(orderEndpoint)
    .subscribe(response => {
      this.orderList = this.getOnlyFinishedOrder(response);
      console.log(response);
    },
    error => {this.statement = "Błąd! Podczas pobierania zamówien z serwera"})
  }

  private getOnlyFinishedOrder(list: Order[]): Order[]{
    let result: Order[] = [];
    for(let order of list){
        if(order.orderStatus === "FINISHED")
        {
          result.push(order);
        }
    }
    return result;
  }

  public goToDetails(id: string):void{
    this.router.navigate(["/order-details", id]);
  }

}
