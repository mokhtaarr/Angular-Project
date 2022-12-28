import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { CarouselBodyComponent } from './Components/carousel-body/carousel-body.component';
import { ImagesSideBySideComponent } from './Components/images-side-by-side/images-side-by-side.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CardBodyComponent } from './Components/card-body/card-body.component';
import { PhoneCardComponent } from './Components/phone-card/phone-card.component';
import { PositiveBTECHComponent } from './Components/positive-btech/positive-btech.component';
import { ProductComponent } from './Components/product/product.component';
import {HttpClient, HttpClientModule} from  '@angular/common/http';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { MainComponent } from './Components/main/main.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LogInFormComponent } from './Components/log-in-form/log-in-form.component';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductByCatIdComponent } from './Components/product-by-cat-id/product-by-cat-id.component';
import { CardComponent } from './Components/card/card.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { OrderComponent } from './Components/order/order.component';
import { PaypalComponent } from './Components/paypal/paypal.component';
import { UpdateOrderComponent } from './Components/update-order/update-order.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselBodyComponent,
    ImagesSideBySideComponent,
    FooterComponent,
    CardBodyComponent,
    PhoneCardComponent,
    PositiveBTECHComponent,
    ProductComponent,
    MainLayoutComponent,
    MainComponent,
    NotFoundComponent,
    LogInFormComponent,
    CreateAccountComponent,
    ProductDetailsComponent,
    ProductByCatIdComponent,
    CardComponent,
    OrderComponent,
    PaypalComponent,
    UpdateOrderComponent,
  

  ],
  imports: [
    NgxPaginationModule,
    NgxPayPalModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage:'ar',
      loader:{
        provide:TranslateLoader,
        useFactory : httpTranslateLoader,
        deps:[HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http:HttpClient){
  return new  TranslateHttpLoader(http,'./assets/i18n/','.json')

}
