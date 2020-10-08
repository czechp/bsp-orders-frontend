import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ModifyObjectComponent} from '../modify-object/modify-object.component';
import {CreateObjectComponent} from '../create-object/create-object.component';
import {DeleteObjectComponent} from '../delete-object/delete-object.component';

@Component({
  selector: 'app-crud-basic',
  templateUrl: './crud-basic.component.html',
  styleUrls: ['./crud-basic.component.css']
})
export class CrudBasicComponent implements OnInit, OnChanges {

  @Input('objects')
  public objects: any[];

  @Input('objectName')
  public objectName: string;

  @Input('fieldsNames')
  public fieldsNames: string[];

  @Input('statement')
  public statement: string;

  @ViewChild(ModifyObjectComponent)
  public modifyObjectComponent: ModifyObjectComponent;

  @ViewChild(CreateObjectComponent)
  public createObjectComponent: CreateObjectComponent;

  @ViewChild(DeleteObjectComponent)
  public deleteObjectComponent: DeleteObjectComponent;


  @Output()
  public modifyObjectEmitter = new EventEmitter();


  @Output()
  public createObjectEmitter = new EventEmitter();

  @Output()
  deleteObjectEmitter = new EventEmitter();

  public filteredObjects: any[]=[];

  public objectToModify: any;
  public objectToDelete: any;

  public visibilityModifyPanel: boolean = false;
  public visibilityDeletePanel: boolean = false;

  constructor() {
    this.statement = '';
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filteredObjects = this.objects;
  }

  ngOnInit(): void {
  }

  public filterObjects(filterText: string):void{
    this.filteredObjects = [];
    for(let object of this.objects){
      if(object.name.toLowerCase().includes(filterText.toLowerCase())){
        this.filteredObjects.push(object);
      }
    }
   }

  public readObjectToModify(i) {
    this.objectToModify = this.findElementById(i);
    this.visibilityModifyPanel = !this.visibilityModifyPanel;
    this.statement = '';
  }

  public modifyObject(success) {
    if (success === true) {
      this.modifyObjectEmitter.emit(this.modifyObjectComponent.valuesArray);
    }
    this.visibilityModifyPanel = false;
  }

  public createObject(success) {
    if (success) {
      this.createObjectEmitter.emit(this.createObjectComponent.valuesArray);
    }
  }

  public deleteObject(success) {
    if (success) {
      this.deleteObjectEmitter.emit(this.deleteObjectComponent.values[0]);
    }
    this.visibilityDeletePanel = !this.visibilityDeletePanel;
  }

  public readObjectToDelete(i) {
    this.objectToDelete = this.findElementById(i);
    this.visibilityDeletePanel = !this.visibilityDeletePanel;
    this.statement = '';
  }

  private findElementById(id: number) {
    for (let object of this.objects) {
      if (object.id === id) {
        return object;
      }
    }
  }

}
