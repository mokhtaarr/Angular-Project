import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Isignin } from '../Models/isignin';
import { Loggeduser } from '../Models/loggeduser';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private httpOptions = {};
  
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }}
  

  

  SignIn(user :Isignin):Observable<Loggeduser>{
    return this.httpClient.post<Loggeduser>(`${environment.APIBaseURL}/User/SignIn`,JSON.stringify(user), this.httpOptions)
  }
}