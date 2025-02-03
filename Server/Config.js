exports.properties = {
    baseURL : 'https://developer.api.yodlee.com/ysl/restserver/v1/',
    cobrandParam : {
        "cobrand":      {
            "cobrandLogin": "sbCobrafael.soares",
            "cobrandPassword": "0e64ba25-74a4-4f25-87e4-9cadd917c896",
            "locale": "en_US"
        }
    },
    userParam: {
        "user":      {
            //"loginName": "sbMemrafael.soares1",
            //"password": "sbMemrafael.soares1#123",
            //"loginName": "rafael.soares.site16441.2",
            //"password": "site16441.2",
            //"loginName": "sbMemrafael.soares3",
            //"password": "sbMemrafael.soares3#123",
            "loginName": "",
            "password": "",
            "locale": "en_US"
        }
    },
    headers  :  {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json; charset=utf-8'
        //'Content-Type':'text/plain;charset=UTF-8'
        //'Content-Type' : 'application/x-www-form-urlencoded' 
    },
    options  :  {
        url: '',
        method:  '',
        headers: '',
        form:  '',
        json: ''
    },
    userSessionToken : '',
    cobSessionToken : '',
    post : 'POST',
    get : 'GET',
    put : 'PUT',
    cobrandLoginURL : 'cobrand/login',
    userLoginURL : 'user/login',
    accountURL : 'accounts',
    statementsURL : 'statements',
    transactionsURL : 'transactions'  
}


