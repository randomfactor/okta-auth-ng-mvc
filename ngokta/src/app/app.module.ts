import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TokenComponent } from './token/token.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard, OktaAuthInterceptor } from './shared';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TokenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthGuard,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: OktaAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
