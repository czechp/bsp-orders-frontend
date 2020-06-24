import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { URL } from "./URL";
@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private httpClient: HttpClient) { }

  public get(endpoint: string) {
    return this.httpClient.get<any[]>(URL + endpoint);
  }

  public post(endpoint, object) {
    return this.httpClient.post<any>(URL + endpoint, object);
  }

  public patch(endpoint, id, object) {
    return this.httpClient.patch<any>(URL + endpoint + "/" + id, object);
  }
}
