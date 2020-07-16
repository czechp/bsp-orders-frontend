import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ItemInOrder } from 'src/app/Model/ItemInOrder';

@Component({
  selector: 'app-order-details-item-list',
  templateUrl: './order-details-item-list.component.html',
  styleUrls: ['./order-details-item-list.component.css']
})
export class OrderDetailsItemListComponent implements OnInit, OnChanges {

  @Input()
  public itemsInOrderList: ItemInOrder[];

  constructor() {
    this.itemsInOrderList=[];
   }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.itemsInOrderList);
  }

  ngOnInit(): void {
  }

}
