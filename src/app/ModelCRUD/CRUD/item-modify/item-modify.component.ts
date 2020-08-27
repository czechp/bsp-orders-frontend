import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Item} from 'src/app/Model/Item';
import {Producer} from 'src/app/Model/Producer';
import {Provider} from 'src/app/Model/Provider';
import {Category} from 'src/app/Model/Category';
import {SelectObjectComponent} from 'src/app/UI/select-object/select-object.component';

@Component({
  selector: 'app-item-modify',
  templateUrl: './item-modify.component.html',
  styleUrls: ['./item-modify.component.css']
})
export class ItemModifyComponent implements OnInit {

  @Input()
  public item: Item;

  @Input()
  public producers: Producer[];

  @Input()
  public providers: Provider[];

  @Input()
  public itemCategories: Category[];

  @ViewChild('selectProducer')
  public selectProducer: SelectObjectComponent;

  @ViewChild('selectProvider')
  public selectProvider: SelectObjectComponent;

  @ViewChild('selectItemCategory')
  public selectItemCategory: SelectObjectComponent;

  @Output()
  public modifyItemEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public modifyItem(status: boolean) {
    if (status) {
      this.item.producer = this.selectProducer.result;
      this.item.provider = this.selectProvider.result;
      this.item.itemCategory = this.selectItemCategory.result;
      this.modifyItemEmitter.emit(this.item);
    } else {
      this.modifyItemEmitter.emit(null);
    }
  }


}
