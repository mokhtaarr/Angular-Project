import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'B-TECH';


currentCulture:string='ar';
textDir: string = 'rtl';

constructor(private translate: TranslateService) {

//this is to determine the text direction depending on the selected language

    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      
      if(this.currentCulture == 'ar')
      {
        this.textDir = 'rtl';
      } 
      else
      {
        this.textDir = 'ltr';
      }
    });
  }
  ngOnDestroy(){
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      
      this.currentCulture = event.lang;
    });
  }
}
