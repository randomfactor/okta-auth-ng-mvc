import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OktaAuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var oauthService = this.injector.get(OAuthService);

        if (oauthService.hasValidAccessToken()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${oauthService.getAccessToken()}`
                }
            });
        }
        return next.handle(request);
    }
}