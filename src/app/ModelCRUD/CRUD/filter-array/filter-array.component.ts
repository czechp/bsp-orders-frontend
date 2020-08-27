import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter-array',
  templateUrl: './filter-array.component.html',
  styleUrls: ['./filter-array.component.css']
})
export class FilterArrayComponent implements OnInit {

  @Input()
  items: any[];

  @Output()
  itemsEmitter = new EventEmitter();

  @Input()
  public filteredElement: any[];

  constructor() {
    this.filteredElement = [];
  }

  ngOnInit(): void {
  }

  public filter(text: string) {
    let lowerText = text.toLowerCase();
    let result: any[] = [];
    for (let item of this.items) {
      if (item.name.toLowerCase().includes(lowerText) ||
        item.description.toLowerCase().includes(lowerText) ||
        item.url.toLowerCase().includes(lowerText) ||
        item.serialNumber.toLowerCase().includes(lowerText) ||
        item.producer.name.toLowerCase().includes(lowerText) ||
        item.provider.name.toLowerCase().includes(lowerText) ||
        item.itemCategory.name.toLowerCase().includes(lowerText)
      ) {
        result.push(item);
      }
    }
    this.itemsEmitter.emit(result);
  }


}
