# Getting Started

## #1 Get client ID and client secret

PayPal integrations use a client ID and client secret to authenticate API calls:

- A client ID identifies an app. You only need a client ID to get a PayPal payment button and standard credit and debit card fields.
- A client secret authenticates a client ID. To call PayPal APIs, you'll exchange your client ID and client secret for an access token. Keep this secret safe.

Here's how to get your client ID and client secret:

1. Select [Log in to Dashboard](https://developer.paypal.com/dashboard/) and log in or sign up.
2. Select **Apps & Credentials**.
3. New accounts come with a Default Application in the REST API apps section. To create a new project, select Create App.
4. Copy the client ID and client secret for your app.

## #2 Get access token

Exchange your client ID and client secret for an access token. The access token authenticates your app when calling PayPal REST APIs. You can call the PayPal OAuth API in any language. The following examples show you how to get your access token using cURL or Postman:

```bash
cURL
curl -v -X POST "https://api-m.sandbox.paypal.com/v1/oauth2/token"\
 -u "CLIENT_ID:CLIENT_SECRET"\
 -H "Content-Type: application/x-www-form-urlencoded"\
 -d "grant_type=client_credentials"
```

**Modify the code**

1. Change CLIENT_ID to your client ID.
2. Change CLIENT_SECRET to your client secret.

> Note: Encode CLIENT_ID:CLIENT_SECRET in Base64 before sending it in the API call.

### Sample response

PayPal returns an access token and the number of seconds the access token is valid.

```bash
{
  "scope": "https://uri.paypal.com/services/invoicing https://uri.paypal.com/services/disputes/read-buyer https://uri.paypal.com/services/payments/realtimepayment https://uri.paypal.com/services/disputes/update-seller https://uri.paypal.com/services/payments/payment/authcapture openid https://uri.paypal.com/services/disputes/read-seller https://uri.paypal.com/services/payments/refund https://api-m.paypal.com/v1/vault/credit-card https://api-m.paypal.com/v1/payments/.* https://uri.paypal.com/payments/payouts https://api-m.paypal.com/v1/vault/credit-card/.* https://uri.paypal.com/services/subscriptions https://uri.paypal.com/services/applications/webhooks",
  "access_token": "A21AAFEpH4PsADK7qSS7pSRsgzfENtu-Q1ysgEDVDESseMHBYXVJYE8ovjj68elIDy8nF26AwPhfXTIeWAZHSLIsQkSYz9ifg",
  "token_type": "Bearer",
  "app_id": "APP-80W284485P519543T",
  "expires_in": 31668,
  "nonce": "2020-04-03T15:35:36ZaYZlGvEkV4yVSz8g6bAKFoGSEzuy3CQcz3ljhibkOHg"
}
```

#### Make API calls

When you make API calls, replace `ACCESS-TOKEN` with your access token in the authorization header: -H Authorization: Bearer `ACCESS-TOKEN`. When your access token expires, call `/v1/oauth2/token` again to request a new access token.

## #3 Get sandbox account credentials

The PayPal sandbox is a test environment that mirrors real-world transactions. By default, PayPal developer accounts have 2 sandbox accounts: a personal account for buying and a business account for selling. You'll get the login information for both accounts. Watch sandbox money move between accounts to test API calls.

Take the following steps to get sandbox login information for business and personal accounts:

1. Log into the [Developer Dashboard](https://developer.paypal.com/dashboard/).
2. Select Testing Tools > Sandbox Accounts. You can create more sandbox accounts by selecting Create account.
3. Locate the account you want to get credentials for and select ⋮
4. Select View/Edit Account to see mock information such as the account email and system-generated password.
5. Go to [sandbox.paypal.com/signin](https://sandbox.paypal.com/signin?_ga=2.203120850.296988191.1712813576-2035978202.1711570967&_gac=1.215166693.1712813576.CjwKCAjw8diwBhAbEiwA7i_sJcV_Tq0rN5juYZ75SrFxctlDEBololcODamT2d44FyaVBdlZXB8NhBoCWVYQAvD_BwE) and sign in with the personal sandbox credentials. In a separate browser, sign in with the business sandbox credentials.
Make API calls with your app's access token to see sandbox money move between personal and business accounts.
