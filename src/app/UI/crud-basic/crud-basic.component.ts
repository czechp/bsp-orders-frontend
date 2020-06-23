import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModifyObjectComponent } from '../modify-object/modify-object.component';
import { CreateObjectComponent } from '../create-object/create-object.component';

@Component({
  selector: 'app-crud-basic',
  templateUrl: './crud-basic.component.html',
  styleUrls: ['./crud-basic.component.css']
})
export class CrudBasicComponent implements OnInit {

  @Input("objects")
  public objects: any[];

  @Input("objectName")
  public objectName: string;

  @Input("fieldsNames")
  public fieldsNames: string[];

  @Input("statement")
  public statement: string;

  @ViewChild(ModifyObjectComponent)
  public modifyObjectComponent: ModifyObjectComponent;

  @ViewChild(CreateObjectComponent)
  public createObjectComponent: CreateObjectComponent;


  @Output()
  public modifyObjectArrayEmitter = new EventEmitter();


  @Output()
  public createObjectArrayEmitter = new EventEmitter();

  public objectToModify: any;
  public visibilityModifyPanel: boolean = false;

  constructor() {
    this.statement = "";
  }

  ngOnInit(): void {
  }

  public readObjectToModify(i) {
    this.objectToModify = this.objects[i];
    this.visibilityModifyPanel = !this.visibilityModifyPanel;
    this.statement = "";
  }

  public modifyObject(success) {
    if (success === true) {
      this.modifyObjectArrayEmitter.emit(this.modifyObjectComponent.valuesArray);
    }
    this.visibilityModifyPanel = false;
  }

  public createObject(success) {
    if (success) {
      this.createObjectArrayEmitter.emit(this.createObjectComponent.valuesArray);
    }
  }

}
