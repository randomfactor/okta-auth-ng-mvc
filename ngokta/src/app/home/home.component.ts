import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { OAuthService } from 'angular-oauth2-oidc';
import 'rxjs/add/operator/mergeMap';

import { HeldValue } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public values: HeldValue[] = [];
  public errorMessage: string = null;
  public newValue: string = null;

  private valuesUrl = 'http://localhost:5000/api/values';

  constructor(private oauthService: OAuthService, private http: HttpClient) { }

  ngOnInit() {
    this.oauthService.events.subscribe(e => {
      console.debug('oauth/oidc event', e);
      if (e.type == 'token_received') {
        this.getValues();
      }
    });

    this.getValues();
  }

  get isValidLogin(): boolean {
    return this.oauthService.hasValidAccessToken(); 
  }

  public get ownerEmail(): string {
    let claims = this.oauthService.getIdentityClaims();
    if (claims['email']) {
      return claims['email'];
    }

    return "xyzzy plugh";    // random string that does not match email address or null
  }

  getValues(): void {
    this.values = [];
    this.errorMessage = null;

    // return observable
    let webObservable = this.http.get(this.valuesUrl, { headers: this.jsonHeaders() });

    webObservable.flatMap((x: any) => x).subscribe(
      (v) => {
        this.values.push(v as HeldValue);
      },
      (err) => {
        this.errorMessage = err.message;
        console.log(JSON.stringify(err));
      });;
  }

  addNewValue(): void {
    // post new value
    let webObservable = this.http.post(this.valuesUrl, '"' + this.newValue + '"', { headers: this.jsonHeaders() });
    this.handleResponse(webObservable);
  }

  deleteValue(valu: string): void {
    let webObservable = this.http.delete(this.valuesUrl + '/' + valu, { headers: this.jsonHeaders() });
    this.handleResponse(webObservable);
  }

  handleResponse(obs: Observable<object>): void {
    obs.subscribe(
      (v) => {
        this.newValue = null;
        this.getValues();
      },
      (err) => {
        this.errorMessage = err.message;
        console.log(JSON.stringify(err));
      });
  }

  jsonHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json');

    return headers;
  }
}
