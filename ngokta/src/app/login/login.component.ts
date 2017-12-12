import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
  }
  
    login() : void {
      this.oauthService.initImplicitFlow();
    }
  
    logout() : void  {
      this.oauthService.logOut();
    }

  get givenName(): string {
    if (!this.isLoggedIn) {
      return null;
    } else {
      const claims = this.oauthService.getIdentityClaims();
      return claims['name'];
    }
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
