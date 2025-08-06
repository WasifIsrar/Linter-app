# Responses

PayPal API calls return HTTP status codes. Some API calls also return JSON response bodies that include information about the resource including one or more contextual HATEOAS links. Use these links to request more information about and construct an API flow that is relative to a specific request. Each REST API request returns an HTTP status code.

## HTTP status codes

### Successful requests

For successful requests, PayPal returns HTTP `2XX` status codes.

| Status code    | Description                                                                                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200 OK`       | The request succeeded.                                                                                                                                                                          |
| `201 Created`  | A `POST` method successfully created a resource. If the resource was already created by a previous execution of the same method, for example, the server returns the HTTP `200 OK` status code. |
| `202 Accepted` | The server accepted the request and will execute it later.`204 No Content`The server successfully executed the method but returns no response body.                                             |

### Failed requests

---

For failed requests, PayPal returns HTTP `4XX` status codes if something passed in the request has an error or `5XX` status codes when something is wrong on our end with a server or service.For authentication specific HTTP `4XX` status codes, see [Authorization errors](#authorization-errors).### [](#link-httpxxstatuscodes)

#### HTTP 4XX status codes

| Status code        | Description                                                                                  | Possible causes and solutions                                                                                                                                                                                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ` 400 Bad Request` | `INVALID_REQUEST `. Request is not well-formed, syntactically incorrect, or violates schema. | See [Validation errors](#validation-errors). The server could not understand the request. Indicates one of these conditions:- The API cannot convert the payload data to the underlying data type.\n - The data is not in the expected data format. \n - A required field is not available. \n - A simple data validation error occurred. |
| ` 404 Not Found`   | `RESOURCE_NOT_FOUND `. The specified resource does not exist.                                | The server did not find anything that matches the request URI. Either the URI is incorrect or the resource is not available. For example, no data exists in the database at that key.                                                                                                                                                     |

#### HTTP 5XX status codes

> **Note:** An HTTP `5xx` or network timeout from an `/execute` or `/capture` endpoint could have resulted in the creation of a PayPal transaction. To be informed of the transaction, it is recommended that you repeat the same `/execute` or `/capture` call at least once, with the same `PayPal-Request-Id` HTTP header as before. See: [ API idempotency](/reference/guidelines/idempotency)

| Status code                  | Description               | Possible causes and solutions                                                                                                                                                        |
| ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ` 500 Internal Server Error` | `INTERNAL_SERVER_ERROR `. | An internal server error has occurred.A system or application error occurred. Although the client appears to provide a correct request, something unexpected occurred on the server. |
| ` 503 Service Unavailable`   | `SERVICE_UNAVAILABLE `.   | Service Unavailable.The server cannot handle the request for a service due to temporary maintenance.                                                                                 |

##### Examples

For all errors except Identity errors, PayPal returns an error response body that includes additional error details in this format.

> **Note:**The fields returned in the `details` array vary by error.

```json
{
  "name": "ERROR_NAME",
  "message": "Error message.",
  "debug_id": "debug_ID",
  "details": [
    {
      "field": "field_name",
      "value": "value_passed",
      "location": "field_location",
      "issue": "problem_with_field",
      "description": "Error description."
    }
  ],
  "links": [
    {
      "https://error_documentation_link",
      "rel": "information_link",
      "encType": "application/json"
    }
  ]
}
```

The response body for Identity errors includes additional error details in this format:

```json
{
  "error": "ERROR_NAME",
  "error_description": "ERROR_DESCRIPTION"
}
```

#### Validation errors

For validation errors, PayPal returns the HTTP `400 Bad Request` status code.To prevent validation errors, ensure that parameters are the right type and conform to constraints:

| Parameter type | Description                                                                                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Character      | Names, addresses, and phone numbers have maximum character limits.                                                                                                                                                              |
| Numeric        | Credit cards, amounts, and card verification value (CVV) must use non-negative numeric values and have required formats. For example, a CVV must be three or four numbers while a credit card number must contain only numbers. |
| Monetary       | Use the right currency.                                                                                                                                                                                                         |
| Format         | Properly format the JSON sent in the body of your request. For example, no trailing commas.                                                                                                                                     |

#### Authorization errors

Paypal follows industry standard [OAuth 2.0 authorization protocol](https://oauth.net/2/) and returns the HTTP `400`, `401`, and `403` status code for authorization errors.> **Tip:** These are usually access token-related issues and can be cleared by making sure that the token is present and hasn't expired.

| Status code        | Description                                                                    | Possible causes and solutions                                                                       |
| ------------------ | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `400 Bad Request`  | `INVALID_REQUEST `.                                                            | Invalid scope requested.Resend with a valid scope.                                                  |
| ` 400 Bad Request` | `INVALID_REQUEST `. The `refresh_token` is a required parameter                | Add the `refresh_token` parameter and value.`                                                       |
| 400 Bad Request`   | `INVALID_REQUEST `. Current version only supports `token` for `response_type`. | Incorrect response type sent.                                                                       |
| ` 400 Bad Request` | `INVALID_REQUEST `. No permissions to set `target_client_id`.                  | The `client_id` should have the `GRANT_PROXY_CLIENT` scope to use the `target_client_id` parameter. |
| ` 400 Bad Request` | `INVALID_REQUEST `. The `redirect_uri` is a required parameter.                | Resend with this parameter and its value.                                                           |

##### Example

In this example, an invalid client ID is passed in the request to get an access token.

###### Request

```bash
curl -v https://api-m.sandbox.paypal.com/v1/oauth2/token   -H "Accept: application/json"   -H "Accept-Language: en_US"   -u "bad_client_id:secret"   -d "grant_type=client_credentials"
```

###### Response

This unsuccessful request returns the HTTP `401 Unauthorized` status code and a JSON response body that lists the error name and the error description.

```json
{
  "error": "invalid_client",
  "error_description": "Client Authentication failed"
}
```

## HATEOAS links

Hypermedia as the Engine of Application State (HATEOAS) is a constraint of the REST application architecture that distinguishes it from other network application architectures.

This excerpt from a sample response shows an array of HATEOAS links:

```json
{
  "links": [
    {
      "href": "https://api-m.paypal.com/v1/payments/sale/36C38912MN9658832",
      "rel": "self",
      "method": "GET"
    },
    {
      "href": "https://api-m.paypal.com/v1/payments/sale/36C38912MN9658832/refund",
      "rel": "refund",
      "method": "POST"
    },
    {
      "href": "https://api-m.paypal.com/v1/payments/payment/PAY-5YK922393D847794YKER7MUI",
      "rel": "parent_payment",
      "method": "GET"
    }
  ]
}
```

Use the links in this example, as follows:

- To get more information about the request, combine the `GET` method and the target `href` of the `self` link.
- To request a refund, combine the `POST` method and the target `href` of the `refund` link.
- To get information about the parent payment, combine the `GET` method and the target `href` of the `parent_payment` link.

The elements in each `link` object in the `links` array are:
| Element | Required | Description|
|---|---|---|
| `href`| Required | The complete target URL, or link, to combine with the HTTP `method` to make the related call. `href` is the key HATEOAS component that links a completed call with a subsequent call. |
| `rel` | Required | The link relationship type, or how the `href` link relates to the previous call. For a complete list of the link relationship types, see [Link Relationship Types](https://www.iana.org/assignments/link-relations/link-relations.xhtml#link-relations-1) |
| `method` | Optional | The HTTP method. If present, use this method to make a request to the target URL. If absent, the default method is `GET`. |
