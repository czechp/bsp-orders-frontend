import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Item } from 'src/app/Model/Item';

@Component({
  selector: 'app-show-table-item',
  templateUrl: './show-table-item.component.html',
  styleUrls: ['./show-table-item.component.css']
})
export class ShowTableItemComponent implements OnInit {

  @Input()
  public items: Item[];

  @Output()
  public getItemIdToModifyEventEmitter = new EventEmitter();

  
  @Output()
  public getItemIdToDeleteEventEmitter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public getItemIdToModify(id: number){
    this.getItemIdToModifyEventEmitter.emit(id);
  }

  public getItemIdToDelete(id: number){
    this.getItemIdToDeleteEventEmitter.emit(id);
  }

}
