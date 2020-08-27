import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ItemInOrder} from 'src/app/Model/ItemInOrder';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-details-item-list',
  templateUrl: './order-details-item-list.component.html',
  styleUrls: ['./order-details-item-list.component.css']
})
export class OrderDetailsItemListComponent implements OnInit, OnChanges {

  @Input()
  public orderStatus: string;

  @Input()
  public itemsInOrderList: ItemInOrder[];

  @Output()
  public modifyAmountEmit = new EventEmitter();

  @Output()
  public deleteEmit = new EventEmitter();

  constructor(private router: Router) {
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

  public delete(id: number) {
    this.deleteEmit.emit(id);
  }

  public goToItemDetails(id: number) {
    this.router.navigate(['/item-details', id]);
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
