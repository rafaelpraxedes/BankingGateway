import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { BankingService } from './app.service';
import { UserCredentials } from './bankingsystem';

@Component({
    selector: 'message-window',
    template: 
    		`
            <h1 class="h1-Main">{{title}}</h1>
            <div class="sessionContainer" onload>
                <br />
                  <label> User Name: </label>
                  <input id="userNameID" type="text" [(ngModel)]="userName">
                  <label> Password: </label>
                  <input id="passwordID" type="text" [(ngModel)]="password">
            </div>
            <br />
            <button (click)="goLogin()">Login</button>
            `,
    styleUrls: ['./app.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  title: String = 'Login Window';
  userCredentials: UserCredentials;
  userName: String;
  password: String;

  private sub: any;

  constructor(
    private bankingService: BankingService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.userCredentials=this.bankingService.getUserCredentials();
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  goLogin(): void {

    this.bankingService.loginUser(this.userName, this.password).then((strJSON : string)=>{

      console.log("loginUser: " + strJSON);

      if (strJSON.indexOf("error") !== -1) {
        let errMsg: String = "Login error: " + strJSON;
        console.log(errMsg);
        this.router.navigate(['/result', errMsg]);
        return;        
      }

      this.userCredentials.userName = this.userName; //strJSON.userName;

      alert("User " + this.userName + " has been logged in successfully.");

      this.router.navigate(['/queryAccounts']);

    }).catch((err : string)=> {
      let errMsg: String = "Login error: " + err;
      console.log(errMsg);
      this.router.navigate(['/result', errMsg]);
    }); 

  }
  
}


