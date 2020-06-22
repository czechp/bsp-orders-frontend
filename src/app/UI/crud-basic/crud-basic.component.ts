import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crud-basic',
  templateUrl: './crud-basic.component.html',
  styleUrls: ['./crud-basic.component.css']
})
export class CrudBasicComponent implements OnInit {

  @Input("objects")
  public objects:any[];
  
  @Input("objectName")
  public objectName: string;

  @Input("fieldsNames")
  public fieldsNames:string[];


  constructor() { 
  }

  ngOnInit(): void {
  }

}
