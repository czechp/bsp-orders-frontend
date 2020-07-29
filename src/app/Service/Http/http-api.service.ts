import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { URL, orderEndpoint } from "./URL";
import { ItemInOrder } from 'src/app/Model/ItemInOrder';
@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  put(endpoint: string, object: any) {
    return this.httpClient.put<any>(URL + endpoint, object);
  }

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

  public addItemToOrder(orderId , itemId , amount){
    let params = new HttpParams()
    .set("amount", amount.toString());
     return this.httpClient.get(URL + orderEndpoint + "/" + orderId + "/item/" + itemId, {params: params}  );
  }
}
