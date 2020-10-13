import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { Item } from 'src/app/Model/Item';
import { itemEndpoint, orderEndpoint } from 'src/app/Service/Http/URL';
import { FindInArrayService } from 'src/app/Service/Utilities/find-in-array.service';

@Component({
  selector: 'app-order-detail-add-list',
  templateUrl: './order-detail-add-list.component.html',
  styleUrls: ['./order-detail-add-list.component.css'],
  animations:[]
})
export class OrderDetailAddListComponent implements OnInit {

  public itemList: Item[] = [];
  public filteredItemList: Item[] = [];
  public statement: string = '';
  public addedItem: Item = {accessories: []};

  @Input()
  public currentOrderId: number;

  @Output()
  public refreshEmit = new EventEmitter();


  constructor(private httpApiService: HttpApiService,
    private findInArray: FindInArrayService) {
  }

  ngOnInit(): void {
    this.httpApiService.get(itemEndpoint)
      .subscribe(
        data => {
          this.itemList = data;
          this.filteredItemList = data;
        },
        error => {
          this.statement = 'Błąd podczas pobierania listy elementów';
        }
      );
  }

  public saveNewItemFromAccessories(amount: number, accessoryId: number){
    this.httpApiService.addItemToOrderFromAccesories(this.currentOrderId, accessoryId, amount)
    .subscribe(
      (next:any)=>{
        this.refreshEmit.emit();
        this.statement = '';
      },
      (error: any) => {
        this.statement = 'Błąd nie udało się dodać elementu';
      }
    );
  }

  public saveNewItem(amount: number, itemId: number) {
    this.addedItem = this.findInArray.findInArrayById(itemId, this.itemList);
    this.httpApiService.addItemToOrder(this.currentOrderId, itemId, amount)
      .subscribe(
        data => {
          this.refreshEmit.emit();
          this.statement = '';
        },
        error => {
          this.statement = 'Błąd nie udało się dodać elementu';
        }
      );
  }



  public filterItems(key: string) {
    this.filteredItemList = this.findInArray.findByKey(this.itemList, key);
  }

}
