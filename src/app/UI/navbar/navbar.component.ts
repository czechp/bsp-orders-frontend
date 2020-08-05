import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/Service/Authorization/authorization.service';
import { CurrentUser } from 'src/app/Service/Authorization/CurrentUser';
import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loginFormVisibility: boolean = true;
  public loginSubscription: Subscription;
  public currentUsername;

  constructor(private authService: AuthorizationService) {
    this.loginSubscription = this.authService.getSubscription().subscribe(
      x => {
        this.loginFormVisibility = false;
        this.currentUsername = CurrentUser.appUser.username;

      }
    );
  }

  ngOnInit(): void {
    this.currentUsername = sessionStorage.getItem("username");
    this.loginFormVisibility = !this.authService.isLogin();
  }

  public login(username: string, password: string) {
    this.authService.login(username, password);
  }

  public logout() {
    this.authService.logout();
    this.loginFormVisibility = true;
  }

}
