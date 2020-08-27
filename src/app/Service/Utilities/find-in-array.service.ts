import {Injectable} from '@angular/core';
import {Item} from 'src/app/Model/Item';

@Injectable({
  providedIn: 'root'
})
export class FindInArrayService {

  constructor() {
  }

  public findByKey(array: Item[], key: string): Item[] {
    key = key.toLowerCase();
    let result: Item[] = [];
    for (let item of array) {
      if (item.name.toLowerCase().includes(key) ||
        item.serialNumber.toLowerCase().includes(key) ||
        item.description.toLowerCase().includes(key) ||
        item.url.toLowerCase().includes(key) ||
        item.producer.name.toLowerCase().includes(key) ||
        item.provider.name.toLowerCase().includes(key) ||
        item.itemCategory.name.toLowerCase().includes(key)
      ) {
        result.push(item);
      }
    }
    return result;
  }
}
