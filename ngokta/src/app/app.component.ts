import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static Title = 'Okta Auth';
  title = AppComponent.Title;

  constructor(private oauthService: OAuthService) {
    this.oauthService.redirectUri = window.location.origin;
    this.oauthService.scope = 'openid profile email';
    this.oauthService.clientId = '0oact59pdyldq27vE0h7';
    this.oauthService.issuer = 'https://dev-601445.oktapreview.com/oauth2/auscqc57v9LeLr25T0h7';
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
