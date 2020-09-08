import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpApiService} from 'src/app/Service/Http/http-api.service';
import {
  itemInOrderChangeStatusToDeliveredEndpoint,
  itemInOrderChangeStatusToOrderedEndpoint,
  itemInOrderEndpoint,
  orderEndpoint
} from 'src/app/Service/Http/URL';
import {Order} from 'src/app/Model/Order';

@Component({
  selector: 'app-order-superuser-details',
  templateUrl: './order-superuser-details.component.html',
  styleUrls: ['./order-superuser-details.component.css']
})
export class OrderSuperuserDetailsComponent implements OnInit {
  public statement: string = '';
  public order: Order;
  private id: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private httpApi: HttpApiService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
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

  private getOrder() {
    this.httpApi.getElement(orderEndpoint, this.id)
      .subscribe(
        response => {
          this.order = response;
          this.sortItemsByName();
        },
        error => {
          this.statement = 'Błąd! Nie udało się pobrać elementu z serwera';
        }
      );
  }

  private sortItemsByName(): void {
    this.order.itemsInOrder = this.order.itemsInOrder.sort((x1, x2) => {
      if (x1.name.localeCompare(x2.name) === 0) {
        return x1.serialNumber.localeCompare(x2.serialNumber);
      } else {
        return x1.name.localeCompare(x2.name);
      }
    });
  }


}
