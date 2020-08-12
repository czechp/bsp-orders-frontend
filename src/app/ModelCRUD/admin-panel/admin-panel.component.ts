import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { AppUser } from 'src/app/Model/AppUser';
import { userEndpoint } from 'src/app/Service/Http/URL';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public appUsers: AppUser[]=[];
  public statement="";
  constructor(private httpApi: HttpApiService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers():void{
    this.httpApi.get(userEndpoint)
    .subscribe(
      response=>this.appUsers = response,
      error=>this.statement = "Błąd podczas pobierania elementów z serwera"
    );
  }

  public changeRole(userId: number, role:string){
    this.httpApi.changeUserRole(userId, role)
    .subscribe(
      response => this.getAllUsers(),
      error=>this.statement = "Błąd podczas zmiany uprawnień"
    );
  }

  public deleteUser(userId: number){
    this.httpApi.delete(userEndpoint, userId)
    .subscribe(
      response =>{this.getAllUsers(); this.statement="Sukces! Użytkownik usunięty"} ,
      error => this.statement = "Błąd! Nie udało się usunąć użytkownika"
    );
  }

}
