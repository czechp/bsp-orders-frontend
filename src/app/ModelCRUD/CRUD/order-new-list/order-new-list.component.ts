import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Order } from 'src/app/Model/Order';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { orderEndpoint } from 'src/app/Service/Http/URL';

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

  @Output()
  public getNewOrderList = new EventEmitter();

  public orderToDelete: Order = {};

  public statement: string = "";
  constructor(private httpApi: HttpApiService) { }

  ngOnInit(): void {
  }

  public getOrderId(id: number) {
    this.orderIdEmit.emit(id);
  }

  public deleteOrder() {
    this.httpApi.delete(orderEndpoint, this.orderToDelete.id)
    .subscribe(
      response => {this.getNewOrderList.emit(); this.statement="Sukces! Zamówienie usunięte"},
      error => {this.statement = "Błąd podczas usuwania zamówienia"}

    );
  }





}
