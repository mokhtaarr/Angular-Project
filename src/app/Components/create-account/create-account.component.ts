import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CreateAccount } from 'src/app/Models/create-account';
import { Isignup } from 'src/app/Models/isignup';
import { SignupService } from 'src/app/Services/signup.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  userFormGroup: FormGroup;
  newPrd:CreateAccount = {} as CreateAccount;
  
  currentCulture: string ;
  searchLanguage: string="ar";

  constructor(private formbuilder:FormBuilder ,private signUp:SignupService ,public translate: TranslateService ) {
    this.currentCulture = 'ar';

    this.userFormGroup=this.formbuilder.group({
      fullName:['', [Validators.required,Validators.minLength(5)]],
      email:['', [Validators.required ,Validators.email]],
      //reular expressin
      mobileNo:['', [Validators.required ]],
      address: ['', [Validators.required]],
      password:['', [Validators.required,Validators.minLength(6)]],
      repassword:['']
    })
   }
  
   get mobileNo(){
    return this.userFormGroup.get('mobileNo') as FormArray;
  }


 get fullName(){
    return this.userFormGroup.get('fullName');
  }

  get email(){
    return this.userFormGroup.get('email');
  }

  get address(){
    return this.userFormGroup.get('address');
  }

  get password(){
    return this.userFormGroup.get('password');
  }
  
 
  AddUser(){
    let newUser :Isignup = {userName: this.userFormGroup.value.fullName, 
      email: this.userFormGroup.value.email,
      mobileNumber: this.userFormGroup.value.mobileNo,
      address: this.userFormGroup.value.address,
      password: this.userFormGroup.value.password,dateEntered:new Date()}
      console.log(newUser);
      console.log(this.userFormGroup.value);

this.signUp.SignUp(newUser).subscribe(()=>{ })

    }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });

  }
}
