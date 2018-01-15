import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasketComponent } from './components/basket/basket.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CookieService } from "ngx-cookie-service";
import { RouterModule, Routes } from "@angular/router";
import { ShopComponent } from './components/shop/shop.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {ApiService} from "./shared/ApiService";
import {AuthorizationService} from "./shared/AuthorizationService";
import {CryptoApiService} from "./shared/CryptoApiService";
import {HttpClientModule} from "@angular/common/http";
import { SignupComponent } from './components/signup/signup.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';

const appRoutes: Routes=[
  {path: '', component: MainPageComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];



@NgModule({
  exports: [
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BasketComponent,
    MainPageComponent,
    ShopComponent,
    LoginComponent,
    SignupComponent,
    ShopItemComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CookieService,ApiService,AuthorizationService,CryptoApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
