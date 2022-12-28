import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPayment } from '../Models/ipayment';
@Injectable({
  providedIn: 'root'
})
export class PaymentAPIService {

  private httpOptions = {};
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }}

    Add(Payment:IPayment):Observable<number>{
      return this.httpClient.post<number>(`${environment.APIBaseURL}/Payment/Add`,JSON.stringify(Payment), this.httpOptions)
    }
  }