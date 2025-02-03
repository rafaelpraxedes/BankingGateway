import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppMainComponent } from './app.main';
import { LoginComponent } from './app.login';
import { ResultComponent } from "./app.result";

const routes: Routes = [
		{ path: '', redirectTo: '/login', pathMatch: 'full' },
		{ path: 'login',  component: LoginComponent },
		{ path: 'queryAccounts',  component: AppMainComponent },
		{ path: 'result/:message',  component: ResultComponent }
	];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
