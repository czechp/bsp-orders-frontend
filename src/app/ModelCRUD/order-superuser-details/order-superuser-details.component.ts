import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import {
  itemInOrderChangeStatusToDeliveredEndpoint,
  itemInOrderChangeStatusToOrderedEndpoint,
  itemInOrderEndpoint,
  orderEndpoint
} from 'src/app/Service/Http/URL';
import { Order } from 'src/app/Model/Order';
import { SortItemsInOrderComponent } from 'src/app/UI/sort-items-in-order/sort-items-in-order.component';

@Component({
  selector: 'app-order-superuser-details',
  templateUrl: './order-superuser-details.component.html',
  styleUrls: ['./order-superuser-details.component.css']
})
export class OrderSuperuserDetailsComponent implements OnInit {
  public statement = '';
  public order: Order;
  private id = 0;

  @ViewChild("sortingItems")
  public sortItemsInOrderComponent: SortItemsInOrderComponent;


  constructor(private activatedRoute: ActivatedRoute,
    private httpApi: HttpApiService,
    private router: Router) {
  }


  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    this.getOrder();
  }

  public orderItem(id: number) {
    this.statement = '';
    this.httpApi.patch(itemInOrderEndpoint + itemInOrderChangeStatusToOrderedEndpoint, id, {})
      .subscribe(
        response => {
          this.getOrder();
        },
        error => {
          this.statement = 'Błąd! Nie udało się zmienić statusu ';
        }
      );
  }

  public deliverItem(id: number) {
    this.statement = '';
    this.httpApi.patch(itemInOrderEndpoint + itemInOrderChangeStatusToDeliveredEndpoint, id, {})
      .subscribe(
        response => {
          this.getOrder();
        },
        error => {
          this.statement = 'Błąd! Nie udało się zmienić statusu ';
        }
      );
  }

  public goToItemDetails(id: number): void {
    this.router.navigate(['/item-details', id]);
  }

  public getOrder() {
    this.httpApi.getElement(orderEndpoint, this.id)
      .subscribe(
        response => {
          this.order = response;
        },
        error => {
          this.statement = 'Błąd! Nie udało się pobrać elementu z serwera';
        },
        () => 
        {this.sort();}
      );
  }



  public sort() {
    switch (this.sortItemsInOrderComponent.option) {
      case 'Nazwa':
        this.order.itemsInOrder.sort((x1, x2) => x1.name.localeCompare(x2.name));
        break;
      case 'Producent':
        {
          this.order.itemsInOrder.sort((x1, x2) =>
          {
            if(x1.producer.name.localeCompare(x2.producer.name) !== 0){
              return x1.producer.name.localeCompare(x2.producer.name)
            }
            return  x1.serialNumber.localeCompare(x2.serialNumber)
          } );

        }
        break;
      case 'Dostawca':
        this.order.itemsInOrder.sort((x1, x2) => x1.provider.name.localeCompare(x2.provider.name));
        break;
      case 'Kategoria':
        this.order.itemsInOrder.sort((x1, x2) => x1.itemCategory.name.localeCompare(x2.itemCategory.name));
        break;
      case 'Zamówione':
        break;
    }
  }
}
