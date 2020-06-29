import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUser } from 'src/app/Model/AppUser';
import { URL, loginEndpoint } from '../Http/URL';
import { CurrentUser } from './CurrentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public static username;

  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string){
    let appUser: AppUser = {
      id:0,
      username: username,
      role: "",
      email: ""
    }
    const credentials = "Basic " + btoa(username + ":" + password);
    const httpHeaders = new HttpHeaders().set("Authorization", credentials);
    this.httpClient.post<AppUser>(URL + loginEndpoint, appUser,{headers: httpHeaders})
    .subscribe(
      data => {
        sessionStorage.setItem("isLogin", "true");
        sessionStorage.setItem("credentials", credentials);
        CurrentUser.appUser = data;
      },
      error => {}
    );
  }

  public logout(){
    sessionStorage.setItem("isLogin", "false");
  }

  public isLogin():boolean{
    return sessionStorage.getItem("isLogin") === "true" ? true : false;
  }
}
