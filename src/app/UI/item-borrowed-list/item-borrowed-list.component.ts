import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemBorrowed} from '../../Model/ItemBorrowed';

@Component({
  selector: 'app-item-borrowed-list',
  templateUrl: './item-borrowed-list.component.html',
  styleUrls: ['./item-borrowed-list.component.css']
})
export class ItemBorrowedListComponent implements OnInit {

  @Input()
  public itemsBorrowed: ItemBorrowed[];

  @Output()
  public deleteEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public delete(id: number): void {
    this.deleteEmitter.emit(id);
  }
}
