import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from 'src/app/Service/Authorization/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthorizationService) {
  }

  ngOnInit(): void {
  }

  public login(username: string, password: string) {
    this.authService.login(username, password);
  }

}
