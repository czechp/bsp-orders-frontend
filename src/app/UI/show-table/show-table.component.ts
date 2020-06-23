import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.css']
})
export class ShowTableComponent implements OnInit {

  @Input("objects")
  public objects: any[];

  @Input("objectName")
  public objectName: string;

  @Input("fieldsName")
  public fieldsName: string[];

  @Output()
  public modifyChanges = new EventEmitter();

  public objectMatrix: string[][];

  constructor() {
    this.objectMatrix=[];
  }

  ngOnInit(): void {
    this.fieldsName.push("Modyfikuj");
    this.fieldsName.push("Usuń");
    this.convertObjArrayToMatrixArray();
  }

  private convertObjArrayToMatrixArray() {
    for (let iterator in this.objects) {
      this.objectMatrix[iterator] = Object.values(this.objects[iterator]); 
    }
  }

  public emitObjectToModify(i:string){
    this.modifyChanges.emit(i);
  }
}
