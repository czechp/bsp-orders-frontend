import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemInOrder } from 'src/app/Model/ItemInOrder';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { itemsOrderedEndpoint } from 'src/app/Service/Http/URL';
import { fade } from 'src/app/UI/animations/fade';

@Component({
  selector: 'app-items-ordered',
  templateUrl: './items-ordered.component.html',
  styleUrls: ['./items-ordered.component.css'],
  animations: [fade]
})
export class ItemsOrderedComponent implements OnInit {

  public statement = '';
  public itemsOrdered: ItemInOrder[] = [];
  public itemsOrderedFiltered: ItemInOrder[] = [];
  private sortMultpilier = 1;

  @ViewChild('filterText')
  public filterTextInput: ElementRef;

  constructor(
    private httpApiService: HttpApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrderedItems();
  }

  private getOrderedItems(): void {
    this.httpApiService.get(itemsOrderedEndpoint)
      .subscribe(
        (next: any) => { this.itemsOrdered = next; this.eliminateNull(); this.itemsOrderedFiltered = next; },
        (error: any) => { this.statement = 'Błąd podczas pobierania danych z serwera' }
      );

  }

  private clearStatement(): void {
    this.statement = '';
  }

  public filterItems(): void {
    const filterText = this.filterTextInput.nativeElement.value.toLowerCase();
    if (filterText.length >= 0) {
      this.itemsOrderedFiltered = this.itemsOrdered
        .filter(
          (x: ItemInOrder) =>
            x.id.toString().toLowerCase().includes(filterText)
            || x.name.toString().toLowerCase().includes(filterText)
            || x.serialNumber.toString().toLowerCase().includes(filterText)
            || x.producer.name.toString().toLowerCase().includes(filterText)
            || x.itemCategory.name.toString().toLowerCase().includes(filterText)
            || x.order.id.toString().toLowerCase().includes(filterText)
            || x.order.orderNr.toString().toLowerCase().includes(filterText)
            || x.order.name.toString().toLowerCase().includes(filterText)
            || x.order.appUser.username.toString().toLowerCase().includes(filterText)
        );
    } else {
      this.itemsOrderedFiltered = this.itemsOrdered;
    }
  }

  public navigateToOrder(orderId: number) {
    this.router.navigate(['/order-details', orderId])
  }

  private eliminateNull() {
    this.itemsOrdered
      .filter(x => x.order.orderNr === null)
      .forEach(x => x.order.orderNr = '');
  }

  public sortByItemId(){
    this.itemsOrdered.sort((x1: ItemInOrder, x2: ItemInOrder)=>this.sortMultpilier * (x1.id - x2.id));
    this.toggleSortMultiplier();
  }

  public sortByItemName(){
    this.itemsOrdered.sort((x1: ItemInOrder, x2: ItemInOrder)=>this.sortMultpilier * (x1.name.localeCompare(x2.name)));
    this.toggleSortMultiplier();
  }


  public sortByItemSerialNumber(){
    this.itemsOrdered.sort((x1: ItemInOrder, x2: ItemInOrder)=>this.sortMultpilier * (x1.serialNumber.localeCompare(x2.serialNumber)));
    this.toggleSortMultiplier();
  }

  public sortByItemProducer(){
    this.itemsOrdered.sort((x1: ItemInOrder, x2: ItemInOrder)=>this.sortMultpilier * (x1.producer.name.localeCompare(x2.producer.name)));
    this.toggleSortMultiplier();
  }

  public sortByItemCategory(){
    this.itemsOrdered.sort((x1: ItemInOrder, x2: ItemInOrder)=>this.sortMultpilier * (x1.itemCategory.name.localeCompare(x2.itemCategory.name)));
    this.toggleSortMultiplier();
  }

  public sortByOrderId(){
    this.itemsOrdered.sort((x1: ItemInOrder, x2: ItemInOrder)=>this.sortMultpilier * (x1.order.id - x2.order.id));
    this.toggleSortMultiplier();
  }

  public sortByItemOrderName(){
    this.itemsOrdered.sort((x1: ItemInOrder, x2: ItemInOrder)=>this.sortMultpilier * (x1.order.name.localeCompare(x2.order.name)));
    this.toggleSortMultiplier();
  }

  public sortByItemOrderNumber(){
    this.itemsOrdered.sort((x1: ItemInOrder, x2: ItemInOrder)=>this.sortMultpilier * (x1.order.orderNr.localeCompare(x2.order.orderNr)));
    this.toggleSortMultiplier();
  }

  public sortByOrderOwner(){
    this.itemsOrdered.sort((x1: ItemInOrder, x2: ItemInOrder)=>this.sortMultpilier * (x1.order.appUser.username.localeCompare(x2.order.appUser.username)));
    this.toggleSortMultiplier();
  }





  private toggleSortMultiplier() {
    this.sortMultpilier *= -1;
  }


}
