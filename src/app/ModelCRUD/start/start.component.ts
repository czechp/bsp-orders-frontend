import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { fade } from 'src/app/UI/animations/fade';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  animations: [fade]
})
export class StartComponent implements OnInit {
  public  message = "Uruchamianie aplikacji... Czekaj...";
  public applicationReady = 0;
  public loader = ".";

  constructor(
  private router: Router,
  private httpApiService: HttpApiService
  ) { }

  ngOnInit(): void {
    this.loaderHandler();
    this.httpApiService.get('start')
    .subscribe(
      (next: any)=>{this.message = "Aplikacja gotowa do pracy"; 
      this.applicationReady=1;
      setTimeout(()=> this.router.navigate(['/item']), 2000)
    },
      (error: any) =>{this.message = "Błąd!"; this.applicationReady=2}
    );
  }

  public loaderHandler(){
    setInterval(()=>{
      this.loader +='.';
      if(this.loader.length >= 20){this.loader=''}
    }, 500);    
  }

}
