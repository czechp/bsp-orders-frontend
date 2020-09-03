import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpApiService} from 'src/app/Service/Http/http-api.service';
import {Order} from 'src/app/Model/Order';
import {itemInOrderEndpoint, orderEndpoint} from 'src/app/Service/Http/URL';
import {ItemInOrder} from 'src/app/Model/ItemInOrder';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public statement: string;
  public id: number;
  public order: Order;

  constructor(private activatedRoute: ActivatedRoute, private httpApiService: HttpApiService) {
    this.statement = '';
    this.order = {name: ''};
  }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getOrder();
  }

  public changeName(name: string) {
    if (name.length > 3) {
      this.httpApiService
        .patchWithParams(orderEndpoint + '/name', this.order.id, {}, 'name', name)
        .subscribe(
          data => {
            this.statement = 'Sukces! Nazwa została zmieniona';
            this.getOrder();
          },
          error => {
            this.statement = 'Błąd podczas zmiany nazwy';
          }
        );
    } else {
      this.statement = 'Błąd! Za krótka nazwa zamówienia';
    }
  }

  public changeStatus(status: string) {
    this.httpApiService.patchWithParams(orderEndpoint + '/status', this.order.id, {}, 'status', status)
      .subscribe(
        data => {
          this.statement = 'Sukces! Status został zmieniony';
          this.getOrder();
        },
        error => {
          this.statement = 'Błąd podczas zmiany statusu';
        }
      );
  }

  changeCommentary(commentary: string) {
    this.statement = '';
    if (commentary.length > 5) {
      this.httpApiService.patchWithParams(orderEndpoint + '/commentary', this.order.id, {}, 'commentary', commentary)
        .subscribe(
          response => {
            this.statement = 'Sukces! Komentarz został zmieniony';
            this.getOrder();
          },
          error => {
            'Błąd! Wystąpił błąd podczas zmiany komentarza';
          }
        );
    } else {
      this.statement = 'Błąd! Komentarz jest za krótki';
    }
  }

  public modifiyItemAmount(itemInOrder: ItemInOrder) {
    this.httpApiService.put(itemInOrderEndpoint, itemInOrder)
      .subscribe(
        data => {
          this.statement = 'Sukces! Ilość została zmieniona';
          this.getOrder();
        },
        error => {
          this.statement = 'Błąd! Nie udało się zmienić ilości';
        }
      );
  }

  public delete(id: number) {
    if (this.existsById(id)) {
      this.httpApiService.delete(itemInOrderEndpoint, id)
        .subscribe(
          data => {
            this.statement = 'Sukces! Element usunięty';
            this.getOrder();
          },
          error => {
            this.statement = 'Błąd podczas usuwania elementu';
          }
        );

    } else {
      this.statement = 'Błąd! Taki element nie isnieje';
    }

  }

  public refresh() {
    this.getOrder();
  }

  private getOrder() {
    this.httpApiService.getElement(orderEndpoint, this.id)
      .subscribe(
        data => {
          this.order = data;
          this.statement = '';
        },
        error => {
          this.statement = 'Błąd! Takie zamówienie nie istnieje';
        }
      );
  }

  private existsById(id: number) {
    for (let item of this.order.itemsInOrder) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  }


}
