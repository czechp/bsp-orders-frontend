import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { fade } from '../animations/fade';

@Component({
  selector: 'app-crud-statement',
  templateUrl: './crud-statement.component.html',
  styleUrls: ['./crud-statement.component.css'],
  animations: [fade]
})
export class CrudStatementComponent implements OnInit {

  @Input()
  public statement: string;

  constructor() {
  }


  ngOnInit(): void {
  }

}
