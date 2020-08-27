import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpApiService} from '../../Service/Http/http-api.service';
import {Task} from 'src/app/Model/Task';
import {taskEndpoint} from '../../Service/Http/URL';
import {TaskCreateComponent} from '../../UI/task-create/task-create.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, AfterViewInit {
  public statement = '';
  public tasks: Task[] = [];

  @ViewChild(TaskCreateComponent)
  public taskComponentRef: TaskCreateComponent;

  ngAfterViewInit(): void {
    this.taskComponentRef.saveEmit.subscribe(
      response => this.save(response)
    );
  }


  constructor(private httpApiService: HttpApiService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }


  public delete(event): void {
    this.httpApiService.delete(taskEndpoint, event)
      .subscribe(
        response => {
          this.statement = 'Sukces! ELement usunięty';
          this.getTasks();
        },
        error => this.statement = 'Błąd! Podczas usuwania'
      );

  }

  public save(content: string): void {
    this.cleatStatement();
    const task: Task = {name: content};
    if (task.name.length > 10) {
      this.httpApiService.post(taskEndpoint, task)
        .subscribe(
          response => {
            this.statement = 'Sukces! Zadanie zostało dodane';
            this.getTasks();
          },
          error => this.statement = 'Błąd! podczas dodawania zadania'
        );
    } else {
      this.statement = 'Błąd! Za krótka treść zadania';
    }
  }


  private getTasks(): void {
    this.httpApiService.get(taskEndpoint)
      .subscribe(
        response => this.tasks = response,
        error => this.statement = 'Błąd! Nie można pobrać dannych z serwer'
      );
  }

  private cleatStatement() {
    this.statement = '';
  }
}
