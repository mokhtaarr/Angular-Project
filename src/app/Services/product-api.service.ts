import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private httpclient:HttpClient) { }

  getAllProduct():Observable<IProduct[]>{
    // return this.httpclient.get<IProduct[]>(`${environment.APIBaseURL}/Products`)
    return this.httpclient.get<IProduct[]>(`${environment.APIBaseURL}/Product/GetAll`)
  }

  getProductById(id:number):Observable<IProduct[]>{
    // return this.httpclient.get<IProduct[]>(`${environment.APIBaseURL}/Products`)
    return this.httpclient.get<IProduct[]>(`${environment.APIBaseURL}/Product/GetProductByID?id=${id}`)
  }
  getProductCategoryId(id:number):Observable<IProduct[]>{
    // return this.httpclient.get<IProduct[]>(`${environment.APIBaseURL}/Products`)
    return this.httpclient.get<IProduct[]>(`${environment.APIBaseURL}//Product/GetProductByCats?id=${id}`)
  }
}
