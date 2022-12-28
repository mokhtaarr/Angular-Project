import { Component, inject, OnInit } from '@angular/core';
import { Isignin } from 'src/app/Models/isignin';
import { Loggeduser } from 'src/app/Models/loggeduser';
import { SigninService } from 'src/app/Services/signin.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})


export class LogInFormComponent implements OnInit {

Email:string =""
Password:string =""
isErorr:Boolean=false;
currentCulture: string ;
searchLanguage: string="ar";

  constructor(private signIn:SigninService,private cookieService:CookieService,private route: Router
    ,public translate: TranslateService ) {
      this.currentCulture = 'ar';

     }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
    
  }
SignIn(){

  let User:Isignin ={email:this.Email ,password:this.Password } ;

  this.signIn.SignIn(User).subscribe( 
    next=>{
    this.cookieService.set("Id", next.id,14);
    this.cookieService.set("UserName", next.userName,14);
    this.cookieService.set("UserAddress", next.address,14);
    this.route.navigate(['Home']);},
error=>{
  this.isErorr=true;

}

  )

}}
