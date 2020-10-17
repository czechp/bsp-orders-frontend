import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from 'src/app/Model/Order';

@Component({
  selector: 'app-sort-items-in-order',
  templateUrl: './sort-items-in-order.component.html',
  styleUrls: ['./sort-items-in-order.component.css']
})
export class SortItemsInOrderComponent implements OnInit {

  @Input()
  public order: Order;
  @Output()
  orderEventEmitter = new EventEmitter();
  public option: String = 'Producent';

  
  constructor() {
  }

  ngOnInit(): void {
  }

  public sort() {
    switch (this.option) {
      case 'Nazwa':
        this.order.itemsInOrder.sort((x1, x2) => x1.name.localeCompare(x2.name));
        break;
      case 'Producent':
        this.order.itemsInOrder.sort((x1, x2) => x1.producer.name.localeCompare(x2.producer.name));
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
