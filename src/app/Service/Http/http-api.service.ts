import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
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

  public delete(endpoint, id) {
    return this.httpClient.delete<any>(URL + endpoint + "/" + id);
  }

  public getElement(endpoint, id) {
    return this.httpClient.get<any>(URL + endpoint + "/" + id);
  }

  public patchWithParams(endpoint, id, body, paramName, paramValue) {
    let params = new HttpParams()
      .set(paramName, paramValue);
    return this.httpClient
      .patch(URL + endpoint + "/" + id, body, { params: params });
  }
}
