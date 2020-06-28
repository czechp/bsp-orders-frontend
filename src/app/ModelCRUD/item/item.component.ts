import { Component, OnInit } from '@angular/core';
import { itemEndpoint } from "../../Service/Http/URL";
import { Item } from 'src/app/Model/Item';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
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

  public flatItemArray: ItemFlat[];

  constructor(private httpApi: HttpApiService) {
    this.items = [];
    this.statement = "";
    this.flatItemArray = [];
  }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems() {
    this.httpApi.get(itemEndpoint)
      .subscribe(
        data => { this.items = data; this.flatItemArray = this.itemArrayToItemFlatArray(this.items)},
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

  public test() { };

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