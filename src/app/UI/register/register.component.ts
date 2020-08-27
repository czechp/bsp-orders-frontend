import {Component, OnInit} from '@angular/core';
import {AppUser} from 'src/app/Model/AppUser';
import {HttpApiService} from 'src/app/Service/Http/http-api.service';
import {registerEndpoint} from 'src/app/Service/Http/URL';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public statement: string;

  constructor(private httpApiService: HttpApiService) {
    this.statement = '';
  }

  ngOnInit(): void {
  }

  public register(login: string, email: string, password: string, passwordConfirm: string) {
    let user: AppUser = {username: login, role: 'USER', email: email, password: password};
    this.httpApiService.post(registerEndpoint, user)
      .subscribe(
        data => {
          this.statement = 'Sukces! Wysłano na Twój email token weryfikacyjny';
        },
        error => {
          this.statement = 'Błąd! Sprawdź poprawność danych lub połączenie z internetem';
        }
      );
  }

  public loginIsCorrect(login: string) {
    this.statement = '';
    if (!this.validData(login)) {
      this.statement = 'Błąd!!! Login musi mieć co najmniej 5 znaków';
    }
  }

  public passwordIsCorrect(password: string) {
    this.statement = '';
    if (!this.validData(password)) {
      this.statement = 'Błąd!!!  Hasło musi mieć co najmniej 5 znaków';
    }
  }

  public comparePassword(password1: string, password2: string) {
    this.statement = '';
    if (password1 !== password2) {
      this.statement = 'Błąd !!! Hasła są różne!';
    }
  }

  private validData(login: string): boolean {
    return login.length > 5 && login.length < 50;
  }
}
