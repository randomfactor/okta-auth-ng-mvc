import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { MoktaService } from '../shared/test';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
