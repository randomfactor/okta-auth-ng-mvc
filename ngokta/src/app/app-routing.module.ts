import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

import { HomeComponent } from './home/home.component';
import { TokenComponent } from './token/token.component';

const routes: Routes = [
  {path: 'token', component: TokenComponent, canActivate: [AuthGuard]},
  {path: 'home', redirectTo: ''},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
