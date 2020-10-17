import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/Model/Order';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { allOrderEndpoit } from 'src/app/Service/Http/URL';
import { fade } from 'src/app/UI/animations/fade';

@Component({
  selector: 'app-order-all',
  templateUrl: './order-all.component.html',
  styleUrls: ['./order-all.component.css'],
  animations: [fade]
})
export class OrderAllComponent implements OnInit {

  public orders: Order[];
  public filteredOrders: Order[];
  public sortMultpilier = 1;

  public statement = '';

  constructor(
    private httpApiService: HttpApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrder();
  }

  private getOrder(): void {
    this.clearStatement();
    this.httpApiService.get(allOrderEndpoit)
      .subscribe(
        (next: any) => {
          this.orders = next;
          this.filteredOrders = this.orders;
        },
        (error: any) => this.statement = 'Błąd! Nie udało się pobrać danych z serwera'
      );
  }


  private clearStatement(): void {
    this.statement = '';
  }

  public sortById(): void {
    this.filteredOrders = this.filteredOrders.sort((x1: Order, x2: Order) => this.sortMultpilier * (x1.id - x2.id));
  }

  public sortByName(): void {
    this.filteredOrders = this.filteredOrders.sort((x1: Order, x2: Order) => this.sortMultpilier * x1.name.localeCompare(x2.name));
  }

  public sortByStatus(): void {
    this.filteredOrders = this.filteredOrders.sort((x1: Order, x2: Order) => this.sortMultpilier * x1.orderStatus.localeCompare(x2.orderStatus));
  }

  public sortByCreationDate(): void {
    this.filteredOrders = this.filteredOrders
      .sort((x1: Order, x2: Order) => this.sortMultpilier * (new Date(x1.creationDate.toString()).getTime() - new Date(x2.creationDate.toString()).getTime()));
  }

  public sortByUser():void{
    this.filteredOrders = this.filteredOrders.sort((x1: Order, x2: Order) => this.sortMultpilier * x1.appUser.username.localeCompare(x2.appUser.username));
  }

  public sortByOrderNr(): void {
    this.filteredOrders = this.filteredOrders.sort((x1: Order, x2: Order) => this.sortMultpilier * x1.orderNr.localeCompare(x2.orderNr));
  }

  sortByItemsAmount(): void {
    this.filteredOrders = this.filteredOrders.sort((x1: Order, x2: Order) => this.sortMultpilier * (x1.itemsInOrder.length - x2.itemsInOrder.length));
  }

  public toggleSortMultiplier(): void {
    this.sortMultpilier *= -1;
  }

  public filterOrders(text: string): void {
    const textToFilter = text.toLowerCase();
    this.filteredOrders = this.orders.filter(
      (x: Order) =>
        x.id.toString().includes(textToFilter)
        || x.name.toLowerCase().includes(textToFilter)
        || this.textIncludesOrderStatus(x, textToFilter)
        || x.orderNr.toLowerCase().includes(textToFilter)
        || x.appUser.username.toLowerCase().includes(textToFilter)
        || x.orderNr.toLowerCase().includes(textToFilter)
    );
    if (text.length === 0) {
      this.filteredOrders = this.orders;
    }
  }

  private removeFromArray(array: Order[], order): Order[] {
    return order.filter((x: Order) => x.id !== order.id);
  }

  private textIncludesOrderStatus(order: Order, text: string):boolean{
     if(order.orderStatus === 'NEW'){ return 'nowe'.toLowerCase().includes(text.toLowerCase())}
     if(order.orderStatus === 'REALISE'){ return 'realizowane'.includes(text.toLowerCase())}
     if(order.orderStatus === 'FINISHED'){ return 'zakończone'.includes(text.toLowerCase())}

    return false;
  }

  public goToOrderDetails(orderId: number){
    this.router.navigate(['order-details', orderId]);
  }
}
