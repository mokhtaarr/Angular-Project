import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Isignup } from '../Models/isignup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private httpOptions = {};
  
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }}
  

  

  SignUp(user :Isignup):Observable<Isignup>{
    return this.httpClient.post<Isignup>(`${environment.APIBaseURL}/User/SignUp`,JSON.stringify(user), this.httpOptions)
  }
}
