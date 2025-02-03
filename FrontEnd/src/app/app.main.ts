import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BankingService } from './app.service';
import { UserCredentials } from './bankingsystem';
import { Account } from './bankingsystem';
import { Transaction } from './bankingsystem';

@Component({
	selector: 'app-main',
	template: `
				<h1 class="h1-Main"> {{name}} </h1>
				<div class="commandMenu" onload>
					<label> Welcome <b> {{userCredentials.userName}} </b>!</label>
					<input type="button" value="Consult Accounts" (click)="getAccounts()">
					<input type="button" value="Logout" (click)="userLogout()">
				</div>
				<div class="accountContainer" onload>
	                <table>
	                    <tr>
	                        <th> Provider </th>
	                        <th> Account Id </th>
	                        <th> Name </th>
	                        <th> Type </th>
	                        <th> Status </th>
	                        <th> Balance </th>
	                    </tr>
	                    <tr *ngFor="let account of accounts" [class.selected]="account === selectedAccount" (click)="onSelect(account)">
	                        <td> {{account.providerName}} </td>
	                        <td class="tdNumber"> {{account.accountId}} </td>
	                        <td> {{account.accountName}} </td>
	                        <td> {{account.accountType}} </td>
	                        <td> {{account.accountStatus}} </td>
	                        <td class="tdNumber"> {{account.balance}} </td>
	                    </tr>
	                </table>
				</div>
				<transactions-list [transactions]=transactionsByAccount></transactions-list>
			`,
	styleUrls: ['./app.component.css']
})

export class AppMainComponent { 

	name: String = "Banking Gateway";

	userCredentials: UserCredentials;
	accounts: Account[];
	selectedAccount: Account;
	transactions: Transaction[];
	transactionsByAccount: Transaction[];

    constructor(private bankingService: BankingService, private router : Router) { };  //used for injection

    getOrderSystem() : void {
        this.userCredentials=this.bankingService.getUserCredentials();
        this.accounts=this.bankingService.getAccountsArray();
        this.transactions=this.bankingService.getTransactionsArray();
    };

    ngOnInit(): void {  //Called during initialization, fill in information here

    	this.getOrderSystem();

    	console.log("Main Component Init: " + this.userCredentials.userName);

    	if (this.userCredentials.userName == "") {
	    	//Call Login Window
			this.router.navigate(['/login']);		    		
    	}
    };

	onSelect(account: Account): void {
		this.selectedAccount = account;

		this.transactionsByAccount = this.transactions.filter(
			transaction => transaction.accountId === this.selectedAccount.accountId);

	}

	callResultWindow(msg: String){
		this.router.navigate(['/result', msg]);		
	}

	//
	//
	//
	getAccounts(){
	
		this.bankingService.queryAccounts().then((strJSON : string)=>{

			//this.accounts = JSON.parse(strJSON);
			console.log("getAccounts: " + strJSON);

			//Reset Accounts Array
			this.accounts.splice(0,this.accounts.length);			

			//Parse Objects
	        var obj1 = JSON.parse(strJSON);
	        console.log(obj1);

	        for(var key1 in obj1) {
	          var obj2 = obj1[key1];
	          console.log("key1: " + key1);
	          console.log("obj2: " + obj2.providerName);
	          console.log("obj2: " + obj2.accountId);
	          console.log("obj2: " + obj2.accountName);
	          console.log("obj2: " + obj2.accountType);
	          console.log("obj2: " + obj2.accountStatus);
	          console.log("obj2: " + obj2.balance);
	          var balance: String = '' + obj2.balance.amount + ' ' + obj2.balance.currency;
	          this.accounts.push(new Account(obj2.providerName, obj2.accountId, obj2.accountName, obj2.accountType, obj2.accountStatus, balance));
	        }

	        this.getTransactions();

		}).catch((err : string)=> {
			let errMsg: String = "Server error on query Accounts: " + err;
			console.log(errMsg);
			this.callResultWindow(errMsg);
		}); 
	}

	//
	//
	//
	getTransactions(){
	
		this.bankingService.queryTransactions().then((strJSON : string)=>{

			//this.transactions = JSON.parse(strJSON);
			console.log("getTransactions: " + strJSON);

			//Reset Transactions Array
			this.transactions.splice(0,this.transactions.length);			

			//Parse Objects
	        var obj1 = JSON.parse(strJSON);
	        console.log(obj1);

	        for(var key1 in obj1){
	          var obj2 = obj1[key1];
	          console.log("key1: " + key1);
	          console.log("obj2: " + obj2.accountId);
	          console.log("obj2: " + obj2.container);
	          console.log("obj2: " + obj2.baseType);
	          console.log("obj2: " + obj2.category);
	          console.log("obj2: " + obj2.date);
	          console.log("obj2: " + obj2.amount);
	          var amount: String = '' + obj2.amount.amount + ' ' + obj2.amount.currency;
	          this.transactions.push(new Transaction(obj2.accountId, obj2.container, obj2.baseType, obj2.category, obj2.date, amount));
	        }

		}).catch((err : string)=> {
			let errMsg: String = "Server error on query Transactions: " + err;
			console.log(errMsg);
			this.callResultWindow(errMsg);
		}); 
	}

	userLogout() {

    	this.userCredentials.userName = "";

		//Reset Accounts Array
		this.accounts.splice(0,this.accounts.length);			
		//Reset Transactions Array
		this.transactions.splice(0,this.transactions.length);			

		this.router.navigate(['/login']);		    		
	}

	onChange(selMenu) {
	}

}
