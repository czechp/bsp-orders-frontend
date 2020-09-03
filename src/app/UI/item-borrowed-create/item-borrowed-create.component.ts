import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Item} from '../../Model/Item';
import {FindInArrayService} from '../../Service/Utilities/find-in-array.service';

@Component({
  selector: 'app-item-borrowed-create',
  templateUrl: './item-borrowed-create.component.html',
  styleUrls: ['./item-borrowed-create.component.css']
})
export class ItemBorrowedCreateComponent implements OnInit, OnChanges {


  @Input()
  public items: Item[];
  @Output()
  public newItemEmitter = new EventEmitter();
  public filteredItems: Item[];

  constructor(
    private findInArrayService: FindInArrayService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.filteredItems = this.items;
  }


  addItem(id: number, amount: string, receiver: string): void {
    this.newItemEmitter.emit({id: id, amount: amount, receiver: receiver});
  }

  filterItems(phrase: string) {
    this.filteredItems = this.findInArrayService.findByKey(this.items, phrase);
  }
}
