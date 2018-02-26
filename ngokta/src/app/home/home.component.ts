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
    this.getValues();
  }

  get isValidLogin(): boolean {
    return this.oauthService.hasValidAccessToken(); 
  }

  getValues(): void {
    this.values = [];

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json');

    // return observable
    let webObservable = this.http.get(this.valuesUrl, { headers: headers });

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
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json');

    // post new value
    let webObservable = this.http.post(this.valuesUrl, '"' + this.newValue + '"', { headers: headers });

    webObservable.subscribe(
      (v) => {
        this.newValue = null;
      },
      (err) => {
        this.errorMessage = err.message;
        console.log(JSON.stringify(err));
      });
  }
}
