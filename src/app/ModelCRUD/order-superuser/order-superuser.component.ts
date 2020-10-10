import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Model/Order';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { orderEndpoint, superuserOrderStatusEndpoint } from 'src/app/Service/Http/URL';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-superuser',
  templateUrl: './order-superuser.component.html',
  styleUrls: ['./order-superuser.component.css']
})
export class OrderSuperuserComponent implements OnInit {

  public currentOrders: Order[] = [];
  public finishedOrders: Order[] = [];
  public statement: string = '';

  constructor(private httpApiService: HttpApiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCurrentOrders();
    this.getFinishedOrders();
  }

  public goToOrderDetails(id: number) {
    this.router.navigate(['/order-superuser-details', id]);
  }

  public goToFinishedOrderDetails(id: number) {
    this.router.navigate(['/order-details', id]);
  }

  private getCurrentOrders(): void {
    this.httpApiService.get(orderEndpoint + '/' + superuserOrderStatusEndpoint + 'REALISE')
      .subscribe(
        response => {
          this.currentOrders = response.sort((x1: Order, x2: Order) =>-1 * (x1.id - x2.id));

        },
        error => {
          this.statement = 'Błąd!!! Nie udało się pobrać zamówień z serwera';
        }
      );
  }

  private getFinishedOrders(): void {
    this.httpApiService.get(orderEndpoint + '/' + superuserOrderStatusEndpoint + 'FINISHED')
      .subscribe(
        response => {
          this.finishedOrders = response.sort((x1: Order, x2: Order) =>-1 * (x1.id - x2.id));
        },
        error => {
          this.statement = 'Błąd!!! Nie udało się pobrać zamówień z serwera';
        }
      );
  }


}
