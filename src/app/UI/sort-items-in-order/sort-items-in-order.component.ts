import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Order} from 'src/app/Model/Order';

@Component({
  selector: 'app-sort-items-in-order',
  templateUrl: './sort-items-in-order.component.html',
  styleUrls: ['./sort-items-in-order.component.css']
})
export class SortItemsInOrderComponent implements OnInit, OnChanges {

  @Input()
  public order: Order;
  @Output()
  orderEventEmitter = new EventEmitter();


  public option: String = 'Producent';

  
  constructor() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.sort();
  }

  ngOnInit(): void {
  }

  public sort() {
    switch (this.option) {
      case 'Nazwa':
        this.order.itemsInOrder.sort((x1, x2) => x1.name.localeCompare(x2.name));
        break;
        case 'Producent':
          {
            this.order.itemsInOrder.sort((x1, x2) => {
              if (x1.producer.name.localeCompare(x2.producer.name) !== 0) {
                return x1.producer.name.localeCompare(x2.producer.name)
              }
              return x1.serialNumber.localeCompare(x2.serialNumber)
            });
  
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
