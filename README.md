
  1) Banking Integration
  2) Yodlee Overview
     2.1) Services
     2.2) Clients (Mint?)
     2.3) APIs
  3) Banking Gateway (my API)
     3.1) Architecture
     3.2) Services
  4) Show Banking Gateway
     4.1) Consult accounts
     4.2) Aggregate accounts with Yodlee FastLink for Aggregation
     4.3) Consult new accounts
  5) Show Code
  
------------------------------------------------------------------------------------------------------------------------
https://developer.yodlee.com/api-dashboard
https://developer.yodlee.com/API_Resources/Integration_Guide
https://developer.yodlee.com/Account_Verification_EAP/Integration_Guide

  1) Yodlee APIs Overview:
  https://developer.yodlee.com/Yodlee_API

  2) Integration Guide:
  https://developer.yodlee.com/API_Resources/Integration_Guide

    a) Yodlee Instant Account Verification (IAV):
       - Use Cases
             https://developer.yodlee.com/Account_Verification/Use_Cases
       - Integration Steps
             https://developer.yodlee.com/Account_Verification/Getting_Started
       - FAQs
       - Sample Code
       - Best Practices

  3) Aggregation API:
  https://developer.yodlee.com/Aggregation_API/

------------------------------------------------------------------------------------------------------------------------
Test API:

https://developer.yodlee.com/api-dashboard
https://developer.yodlee.com/apidocs/index.php

APP:
  - [OK] Login
  - Query:
    - [OK] Providers
    - [OK] Accounts
    - [OK] Transactions
    - Accounts + Transactions
  - Create - FastLink for Aggregation:
    - [OK] Providers
    - [OK] Accounts
    - [OK] Transactions
  - [OK] Error handling: send response with JSON { errorMessage: "xxx" }

  - UI Angular 2
    - [OK] Login
    - [OK] Accounts
    - [OK] Transactions
    - [OK] Accounts x Transactions (JOIN)
    - Order by Provider, Account ID

------------------------------------------------------------------------------------------------------------------------
FastLink

FastLink for Aggregation.
  a) Credentials: catalog username and password (specific for the Site)
  b) Get multi level authentication for the site (XML of the Site)
  
FastLink for Instant Account Verification (IAV).
  a) Credentials
  b) Routing Number:
       https://developer.yodlee.com/Aggregation_API/Aggregation_Services_Guide/Sample_Data/Yodlee_Dummy_Account_Generator

------------------------------------------------------------------------------------------------------------------------

Catalog:
https://dag2.yodlee.com/dag/dhaction.do
https://developer.yodlee.com/Aggregation_API/Aggregation_Services_Guide/Sample_Data/Yodlee_Dummy_Account_Generator

------------------------------------------------------------------------------------------------------------------------

https://yieapstage.api.yodlee.com/ysl
https://yieapstage.api.yodlee.com/ysl/restserver/v1/cobrand/login
https://yieapstage.api.yodlee.com/ysl/restserver/v1/providers/

------------------------------------------------------------------------------------------------------------------------

https://www.mint.com/how-mint-works
https://thefinancialbrand.com/62560/best-mobile-banking-apps/
https://play.google.com/store/apps/details?id=com.immunebot.easybanking&hl=en

------------------------------------------------------------------------------------------------------------------------
Tutorial:

  1) Create a Yodlee account at Developer Portal:
      https://developer.yodlee.com/api-dashboard

     Developer portal (sandbox)
     Data Model
     API
     Fast Link
     Use Cases
