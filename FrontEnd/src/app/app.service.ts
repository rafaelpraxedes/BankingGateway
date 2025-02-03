import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { UserCredentials } from './bankingsystem';
import { Account } from './bankingsystem';
import { Transaction } from './bankingsystem';

const SERVER_URL = "http://localhost:4000";
const LOGIN_EP = "/login";
const QUERY_ACCOUNTS_EP = "/accounts";
const QUERY_TRANS_EP = "/transactions";

@Injectable()
export class BankingService {

	userCredentials: UserCredentials = new UserCredentials("");
	getUserCredentials(): UserCredentials {
		return this.userCredentials;
	}

	accountsArray: Array <Account> = [];
	getAccountsArray(): Array <Account> {
		return this.accountsArray;
	}

	transactionsArray: Array <Transaction> = [];
	getTransactionsArray(): Array <Transaction> {
		return this.transactionsArray;
	}

	constructor (private http: Http) {}

	loginUser(userName: String, password: String):Promise<String>{
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let URL = SERVER_URL + LOGIN_EP;
		console.log("Login user: " + URL);
		return this.http.post(URL, {userName: userName, password: password}, options).toPromise().then(this.handleSuccess).catch(this.handleError);
	}	

	queryAccounts():Promise<String>{
		let URL = SERVER_URL + QUERY_ACCOUNTS_EP;
		console.log("querying accounts on the server: " + URL);
		return this.http.get(URL).toPromise().then(this.handleSuccess).catch(this.handleError);
	}

	queryTransactions():Promise<String>{
		let URL = SERVER_URL + QUERY_TRANS_EP;
		console.log("querying transactions on the server: " + URL);
		return this.http.get(URL).toPromise().then(this.handleSuccess).catch(this.handleError);
	}

	private handleSuccess(response:any) {
		//console.log("handleSuccess: " + response.text());
		return response.text();
	}

	private handleError (error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return errMsg;
	}

  
};





