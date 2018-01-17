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
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import {ResponseUtil} from "./shared/ResponseUtil";
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { HoverBasketComponent } from './components/hover-basket/hover-basket.component';
import {BasketService} from "./shared/BasketService";
import { HoverBasketItemComponent } from './components/hover-basket-item/hover-basket-item.component';

const appRoutes: Routes=[
  {path: '', component: MainPageComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'user-info', component: UserInfoComponent},
  {path: 'basket', component: BasketComponent}
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
    ShopItemComponent,
    AdminPanelComponent,
    UserInfoComponent,
    BasketItemComponent,
    HoverBasketComponent,
    HoverBasketItemComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CookieService,ApiService,AuthorizationService,CryptoApiService,ResponseUtil,BasketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
