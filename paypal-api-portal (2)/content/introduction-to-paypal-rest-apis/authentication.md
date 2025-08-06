# Authentication

PayPal REST APIs use OAuth 2.0 access tokens to authenticate requests. Your access token authorizes you to use the PayPal REST API server.

To call a REST API in your integration, you'll need to exchange your client ID and client secret for an access token. You can find your client ID and client secret by following the instructions in Get started with PayPal APIs.

You can make the API call in any programming language. The following examples show you how to get your access token using cURL or Postman.

Copy the following code and modify it:

```bash
curl -v -X POST "https://api-m.sandbox.paypal.com/v1/oauth2/token"\
 -u "CLIENT_ID:CLIENT_SECRET"\
 -H "Content-Type: application/x-www-form-urlencoded"\
 -d "grant_type=client_credentials"
 ```

1. Change CLIENT_ID to your client ID.
2. Change CLIENT_SECRET to your secret.

> Note: Encode CLIENT_ID:CLIENT_SECRET in Base64 before sending it in the API call.

## Postman

In the Postman app, complete the following:

1. Set the verb to POST.
2. Enter `https://api-m.sandbox.paypal.com/v1/oauth2/token` as the request URL.
3. Select the Authorization tab.
4. From the TYPE list, select Basic Auth.
5. In the Username field, enter your client ID.
6. In the Password field, enter your secret.
7. Select the Body tab.
8. Select the x-www-form-urlencoded option.
9. In the KEY field, enter grant_type.
10. In the VALUE field, enter client_credentials.
11. Select Send.

### Step result

PayPal returns an access token and the number of seconds the access token is valid. When you make calls to a REST API, include the access token in the authorization header: -H Authorization: Bearer 14. ACCESS-TOKEN. When your access token expires, call /v1/oauth2/token again to request a new access token.

#### Sample response

```json
{
  "scope": "https://uri.paypal.com/services/invoicing https://uri.paypal.com/services/disputes/read-buyer https://uri.paypal.com/services/payments/realtimepayment https://uri.paypal.com/services/disputes/update-seller https://uri.paypal.com/services/payments/payment/authcapture openid https://uri.paypal.com/services/disputes/read-seller https://uri.paypal.com/services/payments/refund https://api-m.paypal.com/v1/vault/credit-card https://api-m.paypal.com/v1/payments/.* https://uri.paypal.com/payments/payouts https://api-m.paypal.com/v1/vault/credit-card/.* https://uri.paypal.com/services/subscriptions https://uri.paypal.com/services/applications/webhooks",
  "access_token": "A21AAFEpH4PsADK7qSS7pSRsgzfENtu-Q1ysgEDVDESseMHBYXVJYE8ovjj68elIDy8nF26AwPhfXTIeWAZHSLIsQkSYz9ifg",
  "token_type": "Bearer",
  "app_id": "APP-80W284485P519543T",
  "expires_in": 31668,
  "nonce": "2020-04-03T15:35:36ZaYZlGvEkV4yVSz8g6bAKFoGSEzuy3CQcz3ljhibkOHg"
}
```
