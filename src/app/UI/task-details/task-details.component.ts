import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from 'src/app/Model/Task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  @Input()
  public task: Task;

  @Output()
  public deleteEmit = new EventEmitter();

  public isAdmin = false;


  constructor() {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('role') === 'ADMIN') {
      this.isAdmin = true;
    }
  }

  public delete() {
    this.deleteEmit.emit(this.task.id);
  }


}
