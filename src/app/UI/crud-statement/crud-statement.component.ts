import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-crud-statement',
  templateUrl: './crud-statement.component.html',
  styleUrls: ['./crud-statement.component.css']
})
export class CrudStatementComponent implements OnInit {

  @Input()
  public statement: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
