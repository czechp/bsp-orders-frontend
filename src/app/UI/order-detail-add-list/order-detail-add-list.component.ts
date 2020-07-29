import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { Item } from 'src/app/Model/Item';
import { itemEndpoint } from 'src/app/Service/Http/URL';

@Component({
  selector: 'app-order-detail-add-list',
  templateUrl: './order-detail-add-list.component.html',
  styleUrls: ['./order-detail-add-list.component.css']
})
export class OrderDetailAddListComponent implements OnInit {

  public itemList: Item[]=[];
  public statement: string = ""
  
  @Input()
  public currentOrderId: number;

  @Output()
  public refreshEmit = new EventEmitter();


  constructor(private httpApiService:HttpApiService) { }

  ngOnInit(): void {
    this.httpApiService.get(itemEndpoint)
    .subscribe(
      data => {this.itemList=data},
      error  =>{this.statement = "Błąd podczas pobierania listy elementów"}
    );
  }

  public saveNewItem(amount: number, itemId:number ){
    this.httpApiService.addItemToOrder(this.currentOrderId, itemId, amount)
    .subscribe(
      data => {this.refreshEmit.emit()},
      error => {this.statement = "Błąd nie udało się dodać elementu"}
    );
  }

}
