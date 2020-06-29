import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/Model/Item';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.css']
})
export class ItemDeleteComponent implements OnInit {

  @Input()
  public item: Item;

  @Output()
  public deleteItemEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public deleteItem(status) {
    if (status) {
      this.deleteItemEmitter.emit(this.item);
    } else {
      this.deleteItemEmitter.emit(null);
    }
  }

}
