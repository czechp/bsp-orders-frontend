import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/Service/Authorization/authorization.service';
import { CurrentUser } from 'src/app/Service/Authorization/CurrentUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthorizationService) { }

  ngOnInit(): void {
    
  }

  public login(username: string, password: string){
    this.authService.login(username, password);
  }

  public logout(){
    this.authService.logout();
  }


}
