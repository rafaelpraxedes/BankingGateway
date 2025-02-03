var path = require('path');
var configApp = require(path.resolve('Config.js'));
var request = require('request');
//var readlineSync = require('readline-sync');
//var async = require('async');

class MainApp {

    
    constructor() {
    }
        
    testConn() {
        return new Promise((resolve, reject) => {            
            resolve('{"ID": 1001}');
        });
    };

    loginYodlee(userName, password) {

        return new Promise((resolve, reject) => {
        
            //Setting input parameters for cobrand login API call
            configApp.properties.options.url = configApp.properties.baseURL	+ configApp.properties.cobrandLoginURL;
            configApp.properties.options.method = configApp.properties.post;
            configApp.properties.options.headers = configApp.properties.headers;
            configApp.properties.options.json = configApp.properties.cobrandParam;

            console.log(configApp.properties.baseURL);
            console.log(configApp.properties.cobrandLoginURL);

            console.log(configApp.properties.options.url);
            console.log('------------------------------------------------------------------------------------');
            console.log('  > Cobrand login... ' + configApp.properties.cobrandParam.cobrand.cobrandLogin);

            //Invoking Cobrand login API
            request(configApp.properties.options, function(error, response, body) {

                //console.log("Cobrand login - response: " + JSON.stringify(response));

                if (error) {
                    console.log('  > Error in Cobrand Login: ', error);
                    reject(error);
                    return;
                }

                if (response.statusCode != 200) {
                    var errorResponse = {   "statusCode": response.statusCode,
                                            "errorCode": response.body.errorCode,
                                            "errorMessage": response.body.errorMessage
                                        };
                    console.log(errorResponse);
                    resolve(errorResponse);
                    return;
                } 

                console.log("  > Cobrand login OK");

                //Setting input parameters for user login API call
                configApp.properties.cobSessionToken = body.session.cobSession;
                configApp.properties.options.url = configApp.properties.baseURL+configApp.properties.userLoginURL;
                configApp.properties.options.method = configApp.properties.post;
                configApp.properties.headers.Authorization = 'cobSession=' + configApp.properties.cobSessionToken;
                configApp.properties.options.json = configApp.properties.userParam;

                configApp.properties.userParam.user.loginName = userName;
                configApp.properties.userParam.user.password = password;

                console.log("");
                console.log('  > User login... ' + configApp.properties.userParam.user.loginName);

                //Invoking user login API
                request(configApp.properties.options, function(error, response, body) {

                    //console.log("User login API -  response: " + JSON.stringify(response));

                    if (error) {
                        console.log('  > Error in User Login: ', error);
                        reject(error);
                        return;
                    }

                    if (response.statusCode != 200) {                        
                        var errorResponse = {   "statusCode": response.statusCode,
                                                "errorCode": response.body.errorCode,
                                                "errorMessage": response.body.errorMessage
                                            };
                        console.log(errorResponse);
                        resolve(errorResponse);
                        return;
                    } 

                    //var jsonObj = JSON.parse(body);
                    console.log("  > User Login OK");
                    configApp.properties.userSessionToken = response.body.user.session.userSession;
                    
                    var loginData = {
                        cobrandParam: configApp.properties.cobrandParam,
                        userParam: configApp.properties.userParam,
                        userSessionToken: configApp.properties.userSessionToken
                    };

                    //console.log(loginData);
                    resolve(loginData);            

                })
                
            })

        });
            
    };
    
    //
    //
    //
    
    getAccounts() {
    
        return new Promise((resolve, reject) => {
        
            //Setting the input parameters for Account API Call
            configApp.properties.options.url = configApp.properties.baseURL + configApp.properties.accountURL;
            configApp.properties.options.method = configApp.properties.get;
            configApp.properties.options.headers.Authorization = 'userSession='+configApp.properties.userSessionToken+', cobSession='+configApp.properties.cobSessionToken;

            //Invoking the Account API Call
            console.log('');
            console.log('----------------------------------------------------------------------------------');
            console.log(' Provider | Account ID |    Account Name    | Account Type | Status |   Balance   ');
            console.log('----------------------------------------------------------------------------------');

            request(configApp.properties.options,  function  (error,  response,  body)  {

                if (error) {
                    console.log('  > Error retrieving Accounts: ', error);
                    reject(error);
                    return;
                }
                
                if (response.statusCode != 200) {
                    var errorResponse = {   "statusCode": response.statusCode,
                                            "errorCode": response.body.errorCode,
                                            "errorMessage": response.body.errorMessage
                                        };
                    console.log(errorResponse);
                    resolve(errorResponse);
                    return;
                } 

                //var resJSON = JSON.parse(response.body);
                var resJSON = response.body;

                if (resJSON.account.length == 0) {
                    var errorResponse = {   "statusCode": 400,
                                            "errorCode": "US901",
                                            "errorMessage": "No account data found."
                                        };
                    console.log(errorResponse);
                    resolve(errorResponse);
                    return;
                }
                
                var resData = [];

                for(var i = 0; i< resJSON.account.length; i++) {
                    
                    resData.push( { "providerName": resJSON.account[i].providerName,
                                    "accountId": resJSON.account[i].id,
                                    "accountName": resJSON.account[i].accountName,
                                    "accountType": resJSON.account[i].accountType,
                                    "accountStatus": resJSON.account[i].accountStatus,
                                    "balance": resJSON.account[i].balance
                                } );
                    
                    console.log(' ' + lpad(resJSON.account[i].providerName, 8, ' ') + ' | ' + 
                                lpad(resJSON.account[i].id, 10, ' ') + ' | ' +
                                lpad(resJSON.account[i].accountName, 18, ' ') + ' | ' + 
                                lpad(resJSON.account[i].accountType, 12, ' ') + ' | ' + 
                                lpad(resJSON.account[i].accountStatus, 6, ' ') + ' | ' + 
                                rpad((resJSON.account[i].balance !== undefined ? resJSON.account[i].balance.amount : '0'), 11, ' ')
                                );
                }

                console.log('----------------------------------------------------------------------------------');
                console.log('');
                
                resolve(resData);

            })

        });
            
    };
    
    getTransactions(accountId, fromDate, toDate) {

        return new Promise((resolve, reject) => {
        
            //Setting the input parameters for Transactions API Call
            configApp.properties.options.url = configApp.properties.baseURL + configApp.properties.transactionsURL;

            var paramSep = '?';
            
            if (accountId) {
                configApp.properties.options.url += paramSep + 'accountId=' + accountId;
                paramSep = '&';
            }
            if (fromDate) {
                configApp.properties.options.url += paramSep + 'fromDate=' + fromDate;                
                paramSep = '&';
            }
            if (toDate) {
                configApp.properties.options.url += paramSep + 'toDate=' + toDate;                
                paramSep = '&';
            }
            
            console.log("Transactions URL: " + configApp.properties.options.url);

            configApp.properties.options.method = configApp.properties.get;
            configApp.properties.options.headers.Authorization = 'userSession=' + configApp.properties.userSessionToken +
                                                                 ',cobSession=' + configApp.properties.cobSessionToken;

            console.log('---------------------------------------------------------------------------------------------------');
            console.log(' Account ID | Container  |  Type   |           Category              |    Date    |     Amount     ');
            console.log('---------------------------------------------------------------------------------------------------');

            //Invoking the Transactions API Call
            request(configApp.properties.options, function (error, response, body) {

                if (error) {
                    console.log('  > Error retrieving Transactions: ', error);
                    reject(error);
                    return;
                }
                
                if (response.statusCode != 200) {
                    var errorResponse = {   "statusCode": response.statusCode,
                                            "errorCode": response.body.errorCode,
                                            "errorMessage": response.body.errorMessage
                                        };
                    console.log(errorResponse);
                    resolve(errorResponse);
                    return;
                }   
                
                //var resJSON = JSON.parse(response.body);
                var resJSON = response.body;
                var resJSONLen = JSON.stringify(resJSON).length;

                if (resJSON == null || resJSONLen <= 2 ) {
                    var errorResponse = {   "statusCode": 400,
                                            "errorCode": "US902",
                                            "errorMessage": "No transactions found."
                                        };
                    console.log(errorResponse);
                    resolve(errorResponse);
                    return;
                }
                
                if (resJSON.transaction.length == 0) {
                    var errorResponse = {   "statusCode": 400,
                                            "errorCode": "US903",
                                            "errorMessage": "No transactions found."
                                        };
                    console.log(errorResponse);
                    resolve(errorResponse);
                    return;
                }
                
                var resData = [];

                for(var i = 0; i < resJSON.transaction.length; i++) {
                    
                    resData.push( { "accountId": resJSON.transaction[i].accountId,
                                    "container": resJSON.transaction[i].CONTAINER,
                                    "baseType": resJSON.transaction[i].baseType,
                                    "category": resJSON.transaction[i].category,
                                    "date": resJSON.transaction[i].date,
                                    "amount": resJSON.transaction[i].amount
                                } );

                    console.log(' ' + lpad(resJSON.transaction[i].accountId, 10, ' ') + ' | ' +
                                lpad(resJSON.transaction[i].CONTAINER, 10, ' ') + ' | ' + 
                                lpad(resJSON.transaction[i].baseType, 7, ' ') + ' | ' + 
                                lpad(resJSON.transaction[i].category, 31, ' ') + ' | ' + 
                                lpad(resJSON.transaction[i].date != undefined ? resJSON.transaction[i].date : ' ', 9, ' ') + ' | ' +
                                rpad(resJSON.transaction[i].amount.amount+'('+resJSON.transaction[i].amount.currency+')', 14, ' ')
                                );            
                }

                console.log('---------------------------------------------------------------------------------------------------');
                console.log('');
                
                resolve(resData);

            })

        });
            
      }    
    
    
}
exports.MainApp = MainApp;

function lpad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : n + new Array(width - n.length + 1).join(z);
}

function rpad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

