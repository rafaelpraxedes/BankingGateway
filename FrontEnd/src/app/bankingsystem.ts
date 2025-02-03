import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class UserCredentials {

	userName: String = "";

	constructor(userName: String){
		this.userName = userName;
	}

}

export class Account {

     providerName: String;
     accountId: number;
     accountName: String;
     accountType: String;
     accountStatus: String;
     balance: String;

     constructor(providerName: String, accountId: number, accountName: String, accountType: String, accountStatus: String, balance: String){
        this.providerName = providerName;
        this.accountId = accountId;
        this.accountName = accountName;
        this.accountType = accountType;
        this.accountStatus = accountStatus;
        this.balance = balance;
    }
}

export class Transaction {

     accountId: number;
     container: String;
     baseType: String;
     category: String;
     transDate: String;
     amount: String;

     constructor(accountId: number, container: String, baseType: String, category: String, transDate: String, amount: String){
        this.accountId = accountId;
        this.container = container;
        this.baseType = baseType;
        this.category = category;
        this.transDate = transDate;
        this.amount = amount;
    }
}
