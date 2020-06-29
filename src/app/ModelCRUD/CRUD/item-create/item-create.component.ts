import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/Model/Item';
import { ProducerComponent } from '../../producer/producer.component';
import { Producer } from 'src/app/Model/Producer';
import { Provider } from 'src/app/Model/Provider';
import { Category } from 'src/app/Model/Category';
import { SelectObjectComponent } from 'src/app/UI/select-object/select-object.component';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {


  @Input()
  public producers: Producer[];

  @Input()
  public providers: Provider[];

  @Input()
  public itemCategories: Category[];

  @ViewChild("selectProducer")
  public selectProducer: SelectObjectComponent;

  @ViewChild("selectProvider")
  public selectProvider: SelectObjectComponent;

  @ViewChild("selectItemCategory")
  public selectItemCategory: SelectObjectComponent;

  @Output()
  public createItemEmitter = new EventEmitter();

  public item: Item;

  constructor() {
    this.item = {
      id: null,
      name: "",
      serialNumber: "",
      description: "",
      url: "",
      producer: null,
      provider: null,
      itemCategory: null
    }
  }

  ngOnInit(): void {
  }

  public createItem(){
    this.item.producer = this.selectProducer.result;
    this.item.provider = this.selectProvider.result;
    this.item.itemCategory = this.selectItemCategory.result;
    this.createItemEmitter.emit(this.item);
  }
}
