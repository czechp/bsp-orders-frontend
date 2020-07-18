import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ItemInOrder } from 'src/app/Model/ItemInOrder';

@Component({
  selector: 'app-order-details-item-list',
  templateUrl: './order-details-item-list.component.html',
  styleUrls: ['./order-details-item-list.component.css']
})
export class OrderDetailsItemListComponent implements OnInit, OnChanges {

  @Input()
  public itemsInOrderList: ItemInOrder[];

  @Output()
  public modifyAmountEmit = new EventEmitter();

  constructor() {
    this.itemsInOrderList = [];
  }


  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  public changeAmount(id: number) {
    if (this.findById(id) !== null) {
      this.modifyAmountEmit.emit(this.findById(id));
    }
  }

  private findById(id: number): ItemInOrder {
    for (let item of this.itemsInOrderList) {
      if (item.id === id) {
        return item;
      }
    }
    return null;
  }

}
