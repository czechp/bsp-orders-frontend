import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {

  @Input('fieldsNames')
  public fieldsName: string[];


  @Output()
  public acceptCreating = new EventEmitter();

  public valuesArray: string[];
  public reducedFieldsName: string[];


  constructor() {
  }

  ngOnInit(): void {
    this.reducedFieldsName = Object.assign([], this.fieldsName);
    this.valuesArray = [];
    for (let i = 0; i < this.reducedFieldsName.length; i++) {
      this.valuesArray.push('');
    }
  }


  public createObject() {
    this.acceptCreating.emit(true);
  }

}
