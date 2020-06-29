import { Component, OnInit } from '@angular/core';
import { itemEndpoint, producerEndpoint, providerEndpoint, categoryEndpoint } from "../../Service/Http/URL";
import { Item } from 'src/app/Model/Item';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { Producer } from 'src/app/Model/Producer';
import { Provider } from 'src/app/Model/Provider';
import { Category } from 'src/app/Model/Category';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public items: Item[];
  public statement: string;
  public fieldsName = [
    "Id",
    "Nazwa",
    "Nr. seryjny",
    "Opis",
    "Url",
    "Producent",
    "Dostawca",
    "Kategoria"
  ];
  public producers: Producer[];
  public providers: Provider[];
  public itemCategories: Category[];

  public flatItemArray: ItemFlat[];
  public itemToModify: Item;
  public modifyVisibility: boolean = false;

  public itemToDelete: Item;
  public deleteVisbility: boolean = false;



  constructor(private httpApi: HttpApiService) {
    this.items = [];
    this.statement = "";
    this.flatItemArray = [];
    this.producers = [];
    this.providers = [];
    this.itemCategories = [];
  }

  ngOnInit(): void {
    this.getItems();
    this.httpApi.get(producerEndpoint)
      .subscribe(
        data => { this.producers = data; this.producers = this.producers.slice() },
        error => this.statement = "Błąd podczas pobierania danych z serwera"
      );

    this.httpApi.get(providerEndpoint)
      .subscribe(
        data => { this.providers = data; this.providers = this.providers.slice() },
        error => this.statement = "Błąd podczas pobierania danych z serwera"
      );

    this.httpApi.get(categoryEndpoint)
      .subscribe(
        data => { this.itemCategories = data; this.itemCategories = this.itemCategories.slice() },
        error => this.statement = "Błąd podczas pobierania danych z serwera"
      );

  }

  private getItems() {
    this.httpApi.get(itemEndpoint)
      .subscribe(
        data => { this.items = data; this.flatItemArray = this.itemArrayToItemFlatArray(this.items) },
        error => this.statement = "Błąd podczas pobierania danych z serwera");
  }

  private itemToItemFlat(item: Item): ItemFlat {
    return {
      id: item.id.toString(),
      name: item.name,
      serialNumber: item.serialNumber,
      description: item.description,
      url: item.url,
      producer: item.producer.name,
      provider: item.provider.name,
      category: item.itemCategory.name
    };
  }

  private itemArrayToItemFlatArray(itemArray: Item[]): ItemFlat[] {
    let result: ItemFlat[] = [];
    for (let item of itemArray) {
      result.push(this.itemToItemFlat(item));
    }
    return result;

  }

  public createItem(item: Item) {
    this.httpApi.post(itemEndpoint, item)
      .subscribe(
        data => { this.statement = "Sukces! Obiekt zapisany poprawnie"; this.getItems() },
        error => this.statement = "Błąd podczas zapisywania obiektu!!! Sprawdź połączenie z serwerm lub poprawność danych."
      );
  }

  public getItemToModify(i) {
    this.itemToModify = this.items[parseInt(i)];
    this.modifyVisibility = !this.modifyVisibility;
  }

  public modifyItem(item: Item) {
    if (item !== null) {
      this.httpApi.patch(itemEndpoint, item.id, item)
        .subscribe(
          data => { this.statement = "Sukces! Obiekt zmodyfikowany poprawnie"; this.getItems() },
          error => { this.statement = "Błąd podczas modyfikowania obiektu!!! Sprawdź połączenie z serwerm lub poprawność danych." }
        );
    }
    this.modifyVisibility = !this.modifyVisibility;
  }

  public getItemToDelete(i) {
    this.itemToDelete = this.items[i];
    this.deleteVisbility = !this.deleteVisbility;
  }

  public deleteItem(item: Item){
    if(item !== null){
      this.httpApi.delete(itemEndpoint, item.id)
      .subscribe(
        data => {this.statement = "Sukces! Obiekt usunięty"; this.getItems()},
        error => this.statement = "Błąd! Nie udało się usunąć obiektu"
      );
    }
    this.deleteVisbility = !this.deleteVisbility;
  }
}

interface ItemFlat {
  id: string;
  name: string;
  serialNumber: string;
  description: string;
  url: string;
  producer: string;
  provider: string;
  category: string;
}