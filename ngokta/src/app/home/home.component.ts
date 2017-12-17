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

  constructor(private oauthService: OAuthService, private http: HttpClient) { }

  ngOnInit() {
    this.getValues().subscribe(
      (v) => {
        this.values.push(v as HeldValue);
      },
      (err) => {
        this.errorMessage = err.message;
        console.log(JSON.stringify(err));
      });
  }

  get isValidLogin(): boolean {
    return this.oauthService.hasValidAccessToken(); 
  }

  getValues(): Observable<object> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/json');

    // return observable
    let webObservable = this.http.get('http://localhost:5000/api/values', { headers: headers });

    return webObservable.flatMap((x: any) => x);
  }
}
