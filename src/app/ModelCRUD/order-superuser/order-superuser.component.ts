import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Model/Order';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { orderEndpoint, superuserOrderStatusEndpoint } from 'src/app/Service/Http/URL';

@Component({
  selector: 'app-order-superuser',
  templateUrl: './order-superuser.component.html',
  styleUrls: ['./order-superuser.component.css']
})
export class OrderSuperuserComponent implements OnInit {

  public currentOrders: Order[] = [];
  public finishedOrders: Order[] = [];
  public statement: string ="";
  constructor(private httpApiService: HttpApiService) { }

  ngOnInit(): void {
    this.getCurrentOrders();
  }

  private getCurrentOrders():void{
    this.httpApiService.get(orderEndpoint + "/" +  superuserOrderStatusEndpoint + "REALISE")
    .subscribe(
      response => {this.currentOrders = response;},
      error => {this.statement="Błąd!!! Nie udało się pobrać zamówień z serwera"}
    );
  }

  private getFinishedOrders():void{
    this.httpApiService.get(orderEndpoint + "/" +  superuserOrderStatusEndpoint + "FINISHED")
    .subscribe(
      response => {this.finishedOrders = response},
      error => {this.statement="Błąd!!! Nie udało się pobrać zamówień z serwera";}
    );

  }

  

}
