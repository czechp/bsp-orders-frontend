import {Component, OnInit} from '@angular/core';
import {HttpApiService} from '../../Service/Http/http-api.service';
import {Item} from '../../Model/Item';
import {itemBorrowedEndpoint, itemEndpoint} from '../../Service/Http/URL';
import {ItemBorrowed} from '../../Model/ItemBorrowed';

@Component({
  selector: 'app-item-borrowed',
  templateUrl: './item-borrowed.component.html',
  styleUrls: ['./item-borrowed.component.css']
})
export class ItemBorrowedComponent implements OnInit {

  public items: Item[] = [];
  public itemsBorrowed: ItemBorrowed[] = [];

  statement = '';

  constructor(
    private httpApiService: HttpApiService
  ) {
  }

  ngOnInit(): void {
    this.getItems();
    this.getBorrowedItems();
  }


  public createNewItemBorrowed(item: any) {
    if (item.amount > 0 &&
      item.amount < 100 &&
      item.receiver.length > 0) {
      const params = [
        {name: 'amount', value: item.amount},
        {name: 'receiver', value: item.receiver}
      ];
      this.httpApiService.postWithParams(itemBorrowedEndpoint + '/' + item.id, {}, params)
        .subscribe(
          response => {
            this.statement = 'Sukces! Element został dodany';
            this.getBorrowedItems();
          },
          error => {
            this.statement = 'Błąd! Podczas dodawania elemenetu';
          }
        );
    } else {
      this.statement = 'Błąd! Ilość musi być w zakresie 1..99 i pobierający nie może być pusty';
    }
  }

  private getItems(): void {
    this.httpApiService.get(itemEndpoint).subscribe(
      response => {
        this.items = response;
      },
      error => this.statement = 'Błąd! Nie można pobrać danych z serwera'
    );
  }

  private getBorrowedItems(): void {
    this.httpApiService.get(itemBorrowedEndpoint)
      .subscribe(
        response => {
          this.itemsBorrowed = response;
        },
        error => {
          this.statement = 'Błąd podczas pobierania elementów';
        }
      );
  }


  delete(id: number) {
    this.httpApiService.delete(itemBorrowedEndpoint, id)
      .subscribe(
        response => {
          this.statement = 'Sukces! ELement usunięty';
          this.getBorrowedItems();
        },
        error => {
          this.statement = 'Błąd! Nie udało się usunąć elementu';
        }
      )
    ;
  }
}
