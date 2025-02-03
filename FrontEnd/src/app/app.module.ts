import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { BankingService } from './app.service';

import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main';
import { LoginComponent } from './app.login';
import { TransactionsComponent } from './app.transactions';
import { ResultComponent } from "./app.result";

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AppMainComponent,
    LoginComponent,
    TransactionsComponent,
    ResultComponent
  ],
  providers: [ BankingService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
