import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  @Output()
  public saveEmit = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  save(content: string) {
    this.saveEmit.emit(content);
  }
}
