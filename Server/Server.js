"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var path = require('path');

var mainApp = require(path.resolve('MainApp.js'));
let main = new mainApp.MainApp();

let app = express();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//Middleware setup
app.use(cors()); //Need cors library because post request
//does a preflight, so need more sosphisticates COR handling
app.use(bodyParser.json()); // for parsing application/json

//LOGIN
app.post('/login', cors(corsOptions), (req, res) => {

    let userCredentials = req.body;
    console.log('Login request: ' + userCredentials);

    main.loginYodlee(userCredentials.userName, userCredentials.password).then((response) => {
        res.send(JSON.stringify(response));
        console.log("User logged in successfully: " + JSON.stringify(response));
    }).catch((err) => {
        res.status(404);
    });

})


// LOGIN GET
app.get('/loginGet', cors(corsOptions), (req, res) => {
    
    main.loginYodlee().then((response) => {
        res.send(JSON.stringify(response));
        console.log('');
        console.log(" Login OK: " + JSON.stringify(response));
    }).catch((err) => {
        console.log('');
        console.log("  >>>>> Login Error: " + err);
        res.status(404);
    });
})

// accounts
app.get('/accounts', cors(corsOptions), (req, res) => {
    
    main.getAccounts().then((response) => {
        res.send(JSON.stringify(response));
        console.log('');
        console.log(" >>>>> Accounts: " + JSON.stringify(response));
    }).catch((err) => {
        console.log('');
        console.log("  >>>>> Accounts Error: " + err);
        res.status(404);
    });
})

// transactions
app.get('/transactions', cors(corsOptions), (req, res) => {
    
    var accountId = req.query.accountId;
    var fromDate = '2011-01-01';
    var toDate = '';
    
    main.getTransactions(accountId, fromDate, toDate).then((response) => {
        res.send(JSON.stringify(response));
        console.log('');
        console.log(" >>>>> Transactions: " + JSON.stringify(response));
    }).catch((err) => {
        console.log('');
        console.log("  >>>>> Transactions Error: " + err);
        res.status(404);
    });
})

app.listen(4000, function () {
	console.log('Listening to port 4000...');
});

