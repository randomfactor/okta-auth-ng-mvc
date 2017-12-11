import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class MoktaService {

  constructor() { }

  loadDiscoveryDocumentAndTryLogin() { }
  hasValidAccessToken(): boolean { return true; }
  getIdentityClaims(): object { return { name: "Mokta Tester" } }
  get events() { return new Subject(); }
}
