import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../Models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  constructor(private httpClient : HttpClient) {
   }

   getAllGategory():Observable<ICategory[]>{
    // return this.httpClient.get<ICategory[]>(` ${environment.APIBaseURL}/categories`);
    return this.httpClient.get<ICategory[]>(`${environment.APIBaseURL}/categories/GetAll`)
   }

   getGategoryById(CatId:number):Observable<ICategory>{
    return this.httpClient.get<ICategory>(`${environment.APIBaseURL}/categories/GetByID?id=${CatId}`)
   }

}
