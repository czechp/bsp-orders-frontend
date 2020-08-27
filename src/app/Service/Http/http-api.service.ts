import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {orderEndpoint, URL, userChangeRoleEndpoint} from './URL';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private httpClient: HttpClient) {
  }

  put(endpoint: string, object: any) {
    return this.httpClient.put<any>(URL + endpoint, object);
  }

  public get(endpoint: string) {
    return this.httpClient.get<any[]>(URL + endpoint);
  }

  public post(endpoint, object) {
    return this.httpClient.post<any>(URL + endpoint, object);
  }

  public patch(endpoint, id, object) {
    return this.httpClient.patch<any>(URL + endpoint + '/' + id, object);
  }


  public delete(endpoint, id) {
    return this.httpClient.delete<any>(URL + endpoint + '/' + id);
  }

  public getElement(endpoint, id) {
    return this.httpClient.get<any>(URL + endpoint + '/' + id);
  }

  public patchWithParams(endpoint, id, body, paramName, paramValue) {
    let params = new HttpParams()
      .set(paramName, paramValue);
    return this.httpClient
      .patch(URL + endpoint + '/' + id, body, {params: params});
  }

  public addItemToOrder(orderId, itemId, amount) {
    let params = new HttpParams()
      .set('amount', amount.toString());
    return this.httpClient.get(URL + orderEndpoint + '/' + orderId + '/item/' + itemId, {params: params});
  }

  public changeUserRole(userId: number, role: string) {
    let params = new HttpParams().set('role', role);
    return this.httpClient.patch(
      URL + userChangeRoleEndpoint + userId.toString(),
      {},
      {params: params}
    );
  }

  public uploadFile(endpoint: string, formData: FormData): Observable<any> {
    return this.httpClient.post(URL + endpoint, formData);
  }
}
