import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/Model/Provider';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { providerEndpoint } from '../../Service/Http/URL';
@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  public providers: Provider[];
  public statement: string;

  constructor(private httpApi: HttpApiService) {
    this.statement = "";
  }


  ngOnInit(): void {
    this.getProviders();
  }

  private getProviders() {
    this.httpApi.get(providerEndpoint)
      .subscribe(data => { this.providers = data; this.providers = this.providers.slice() },
        error => this.statement = "Błąd podczas pobierania dostawców z serwera");
  }

  public deleteProvider(id) {
    this.statement="";
    this.httpApi.delete(providerEndpoint, id)
      .subscribe(data => { this.getProviders(); this.statement = "Sukces! Obiekt usunięty" },
        error => this.statement = "Błąd! Nie udało się usunąć obiektu");
  }

  public modifyProvider(valueArray) {
    this.statement="";
    this.httpApi.patch(providerEndpoint, valueArray[0], this.createProviderFromArray(valueArray))
      .subscribe(data => { this.statement = "Sukces! Modyfikacja zakończona powodzeniem"; this.getProviders() },
        error => this.statement = "Błąd podczas modyfikowania obiektu");
  }

  public createProvider(valueArray) {
    this.statement="";
    let provider = this.createProviderFromArray(valueArray);
    provider.id = null;
    if (provider.name.length > 2) {
      this.httpApi.post(providerEndpoint, provider)
        .subscribe(data => { this.statement = "Sukces! Obiekt dodany"; this.getProviders() },
          error => this.statement = "Błąd! Problem podczas zapisywania obiektu");
    } else {
      this.statement = "Błąd !!! Za krótka nazwa";
    }

  }

  private createProviderFromArray(valueArray) {
    return { id: valueArray[0], name: valueArray[1] };
  }

}
