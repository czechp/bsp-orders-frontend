import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { orderEndpoint, itemInOrderEndpoint, itemInOrderChangeStautsToOrderedEndpoint, itemInOrderChangeStautsToDeliveredEndpoint } from 'src/app/Service/Http/URL';
import { Order } from 'src/app/Model/Order';

@Component({
  selector: 'app-order-superuser-details',
  templateUrl: './order-superuser-details.component.html',
  styleUrls: ['./order-superuser-details.component.css']
})
export class OrderSuperuserDetailsComponent implements OnInit {
  private id: number = 0;
  public statement: string = "";
  public order: Order;
  constructor(private activatedRoute: ActivatedRoute,
    private httpApi: HttpApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.getOrder();
  }

  private getOrder() {
    this.httpApi.getElement(orderEndpoint, this.id)
      .subscribe(
        response => { this.order = response;},
        error => { this.statement = "Błąd! Nie udało się pobrać elementu z serwera" }
      );
  }

  public orderItem(id: number) {
    this.statement = "";
    this.httpApi.patch(itemInOrderEndpoint + itemInOrderChangeStautsToOrderedEndpoint, id, {})
      .subscribe(
        response => { this.getOrder(); },
        error => { this.statement = "Błąd! Nie udało się zmienić statusu " }
      );
  }

  public deliverItem(id: number) {
    this.statement = "";
    this.httpApi.patch(itemInOrderEndpoint + itemInOrderChangeStautsToDeliveredEndpoint, id, {})
      .subscribe(
        response => { this.getOrder(); },
        error => { this.statement = "Błąd! Nie udało się zmienić statusu " }
      );
  }

  public goToItemDetails(id: number):void{
    this.router.navigate(["/item-details", id]);
  }



}
