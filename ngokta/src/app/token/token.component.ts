import { Component, OnInit } from '@angular/core';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {
  public claims: Array<Array<string>> = [];
  public errorMessage: string = null;

  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
    let authClaims: object = this.oauthService.getIdentityClaims();
    for (let key in authClaims) {
      this.claims.push([key, authClaims[key]]);
    }
  }

}
