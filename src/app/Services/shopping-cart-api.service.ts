import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IShoppingCart } from '../Models/ishopping-cart';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartAPIService {
  private httpOptions = {};
  
  
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }}

    Add(ShoppingCart:IShoppingCart):Observable<number>{
      return this.httpClient.post<number>(`${environment.APIBaseURL}/ShoppingCarts/Add`,JSON.stringify(ShoppingCart), this.httpOptions)
    }
}
