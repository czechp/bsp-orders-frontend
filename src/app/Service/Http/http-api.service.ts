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
}
