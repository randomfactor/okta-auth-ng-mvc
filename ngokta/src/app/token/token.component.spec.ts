import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuthService } from 'angular-oauth2-oidc';
import { MoktaService } from '../shared/test';
import { TokenComponent } from './token.component';

describe('TokenComponent', () => {
  let component: TokenComponent;
  let fixture: ComponentFixture<TokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenComponent ],
      providers: [
        {
          provide: OAuthService,
          useClass: MoktaService,
          multi: false
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
