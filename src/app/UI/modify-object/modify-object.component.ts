import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modify-object',
  templateUrl: './modify-object.component.html',
  styleUrls: ['./modify-object.component.css']
})
export class ModifyObjectComponent implements OnInit {

  @Input()
  public objectToModify: any;

  @Input()
  public fieldsName: string[];

  @Output()
  public acceptModifiying = new EventEmitter();

  public reducedFieldsName:string[];
  public valuesArray:string[];

  constructor() { }

  ngOnInit(): void {
    this.reducedFieldsName = Object.assign([], this.fieldsName);
    this.reducedFieldsName.pop();
    this.reducedFieldsName.pop();
    this.valuesArray = Object.values(this.objectToModify);
  }

  public modifyObject(){
    this.acceptModifiying.emit(true);
  }

  public cancelModifing(){
    this.acceptModifiying.emit(false);
  }

}
