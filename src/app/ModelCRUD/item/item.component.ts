import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryEndpoint, itemEndpoint, producerEndpoint, providerEndpoint } from '../../Service/Http/URL';
import { Item } from 'src/app/Model/Item';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { Producer } from 'src/app/Model/Producer';
import { Provider } from 'src/app/Model/Provider';
import { Category } from 'src/app/Model/Category';
import { FilterArrayComponent } from '../CRUD/filter-array/filter-array.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public items: Item[];
  public filteredItems: Item[];
  public statement: string;

  public producers: Producer[];
  public providers: Provider[];
  public itemCategories: Category[];

  public itemToModify: Item;
  public modifyVisibility: boolean = false;

  public itemToDelete: Item;
  public deleteVisbility: boolean = false;

  @ViewChild(FilterArrayComponent)
  private filterArrayComponentRef: FilterArrayComponent;

  constructor(private httpApi: HttpApiService) {
    this.items = [];
    this.statement = '';
    this.producers = [];
    this.providers = [];
    this.itemCategories = [];
  }


  ngOnInit(): void {
    this.getItems();
    this.httpApi.get(producerEndpoint)
      .subscribe(
        data => {
          this.producers = data.sort((x1, x2) => x1.name.localeCompare(x2.name));
          this.producers = this.producers.slice();

        },
        error => this.statement = 'Błąd podczas pobierania danych z serwera'
      );

    this.httpApi.get(providerEndpoint)
      .subscribe(
        data => {
          this.providers = data.sort((x1, x2) => x1.name.localeCompare(x2.name));
          this.providers = this.providers.slice();
        },
        error => this.statement = 'Błąd podczas pobierania danych z serwera'
      );

    this.httpApi.get(categoryEndpoint)
      .subscribe(
        data => {
          this.itemCategories = data.sort((x1, x2) => x1.name.localeCompare(x2.name));
          this.itemCategories = this.itemCategories.slice();
        },
        error => this.statement = 'Błąd podczas pobierania danych z serwera'
      );

  }

  public createItem(item: Item) {
    this.httpApi.post(itemEndpoint, item)
      .subscribe(
        data => {
          this.statement = 'Sukces! Obiekt zapisany poprawnie';
          this.getItems();
        },
        error => this.statement = 'Błąd podczas zapisywania obiektu!!! Sprawdź połączenie z serwerm lub poprawność danych.'
      );
  }

  public getItemToModify(id) {
    this.itemToModify = this.findItemById(id);
    this.modifyVisibility = !this.modifyVisibility;
  }

  public modifyItem(item: Item) {
    if (item !== null) {
      this.httpApi.patch(itemEndpoint, item.id, item)
        .subscribe(
          data => {
            this.statement = 'Sukces! Obiekt zmodyfikowany poprawnie';
            this.getItems();
          },
          error => {
            this.statement = 'Błąd podczas modyfikowania obiektu!!! Sprawdź połączenie z serwerm lub poprawność danych.';
          }
        );
    }
    this.modifyVisibility = !this.modifyVisibility;
  }

  public getItemToDelete(id) {
    this.itemToDelete = this.findItemById(id);
    this.deleteVisbility = !this.deleteVisbility;
  }

  public deleteItem(item: Item) {
    if (item !== null) {
      this.httpApi.delete(itemEndpoint, item.id)
        .subscribe(
          data => {
            this.statement = 'Sukces! Obiekt usunięty';
            this.getItems();
          },
          error => this.statement = 'Błąd! Nie udało się usunąć obiektu'
        );
    }
    this.deleteVisbility = !this.deleteVisbility;
  }

  public filterItems(filteredItems: Item[]) {
    this.filteredItems = filteredItems;
  }

  public getItemsAfterUploadFile() {
    this.getItems();
  }

  private getItems() {
    this.httpApi.get(itemEndpoint)
      .subscribe(
        data => {
          this.items = data;
          this.filteredItems = data;
          this.filterAfterGetting();
          this.itemToModify = this.findById(this.itemToModify.id);

        },
        error => this.statement = 'Błąd podczas pobierania danych z serwera');
  }

  private findItemById(id) {
    for (let item of this.items) {
      if (item.id === parseInt(id)) {
        return item;
      }
    }
  }

  private filterAfterGetting() {
    if (this.filterArrayComponentRef.filterText !== undefined
      && this.filterArrayComponentRef.filterText.length > 0) {
      this.filterArrayComponentRef.filter();
    }
  }

  public addAccessory(accessory: any): void {
    this.statement = '';
    this.httpApi.get(itemEndpoint + '/' + accessory.id + '/accessory/' + accessory.accessoryId)
      .subscribe(
        (next: any) => {
          this.statement = "Sukces! Akcesorium dodane";
          this.getItems();
        },
        (error: any) => this.statement = 'Błąd! Nie udało się dodać akcesorium'
      );
  }

  private findById(id: number): Item {
    if (id !== undefined) {
      for (let item of this.items) {
        if (id === item.id) {
          return item;
        }
      }
    }

    return undefined;
  }

  public deleteAccessory(accessoryId: number) {
    this.httpApi.delete(itemEndpoint + '/accessory', accessoryId)
      .subscribe(
        (next: any) => {
          this.statement = 'Sukces! Akcesorium usunięte';
          this.getItems();
        },
        (error: any) => this.statement = 'Błąd! Nie udało się usunąć akcesorium'
      );
  }

}

