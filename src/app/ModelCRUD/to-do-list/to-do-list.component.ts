import {Component, OnInit} from '@angular/core';
import {HttpApiService} from '../../Service/Http/http-api.service';
import {Task} from 'src/app/Model/Task';
import {taskEndpoint} from '../../Service/Http/URL';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  public statement = '';
  public tasks: Task[] = [];

  constructor(private httpApiService: HttpApiService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(): void {
    this.httpApiService.get(taskEndpoint)
      .subscribe(
        response => this.tasks = response,
        error => this.statement = 'Błąd! Nie można pobrać dannych z serwer'
      );
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
}
