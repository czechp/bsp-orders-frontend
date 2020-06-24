import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-object',
  templateUrl: './delete-object.component.html',
  styleUrls: ['./delete-object.component.css']
})
export class DeleteObjectComponent implements OnInit {

  @Input()
  public objectToDelete:any;

  @Input()
  public fieldsName:any[];

  @Output()
  public acceptDeleting = new EventEmitter();

  public reducedFieldsName:string[];
  public values: string[];

  constructor() { }

  ngOnInit(): void {
    this.reducedFieldsName = Object.assign([], this.fieldsName);
    this.reducedFieldsName.pop();
    this.reducedFieldsName.pop();
    this.values = Object.values(this.objectToDelete);
  }

  public deleteObject(){
      this.acceptDeleting.emit(true);
  }

  public cancelDeleteObject(){
    this.acceptDeleting.emit(false);
  }

}
