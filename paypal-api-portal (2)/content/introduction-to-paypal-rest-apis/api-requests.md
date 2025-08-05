# API Requests

To make a REST API request, you combine the HTTP `GET`, `POST`, `PUT`, `PATCH`, or `DELETE` method, the URL to the API service, the URI to a resource to query, submit data to, update, or delete, and one or more [HTTP request headers](#http-request-headers).

The URL to the API service is either:

- Sandbox. `[https://api-m.sandbox.paypal.com](https://api-m.sandbox.paypal.com)`
- Live. `[https://api-m.paypal.com](https://api-m.paypal.com)`

Optionally, you can include [query parameters](#query-parameters) on `GET` calls to filter, limit the size of, and sort the data in the responses.Most `GET`, `POST`, `PUT`, and `PATCH` calls require a JSON request body.

This sample request lists invoices:

```bash
curl -v -X GET https://api-m.sandbox.paypal.com/v1/invoicing/invoices?page=3&page_size=4&total_count_required=true\
 -H "Content-Type: application/json"\
 -H "Authorization: Bearer ACCESS-TOKEN"
```

## Query parameters

For most REST `GET` calls, you can include one or more query parameters on the request URI to filter, limit the size of, and sort the data in an API response. For filter parameters, see the individual `GET` calls.To limit, or `_page_`, and sort the data that is returned in some API responses, use these, or similar, query parameters:

> **Note:** Not all pagination parameters are available for all APIs.

| Parameter | Type | Description |
|---|---|---|
| `count` | integer | The number of items to list in the response. | 
| `end_time` | integer | The end date and time for the range to show in the response, in [Internet date and time format](https://tools.ietf.org/html/rfc3339#section-5.6). For example, `end_time=2016-03-06T11:00:00Z`. |
| `page` | integer | The page number indicating which set of items will be returned in the response. So, the combination of `page=1` and `page_size=20` returns the first 20 items. The combination of `page=2` and `page_size=20` returns items 21 through 40. |
| `page_size` | integer | The number of items to return in the response. |
| `total_count_required` | boolean | Indicates whether to show the total count in the response. |
| `sort_by` | string |Sorts the payments in the response by a specified value, such as the create time or update time. |
| `sort_order` | string | Sorts the items in the response in ascending or descending order. | 
| `start_id` | string | The ID of the starting resource in the response. When results are paged, you can use the `next_id` value as the `start_id` to continue with the next set of results. |
| `start_index` | integer | The start index of the payments to list. Typically, you use the `start_index` to jump to a specific position in the resource history based on its cart. For example, to start at the second item in a list of results, specify `?start_index=2`. | 
| `start_time` | string | The start date and time for the range to show in the response, in Internet date and time format. For example, `start_time=2016-03-06T11:00:00Z`. | 

For example, the Invoicing API returns details for four invoices beginning with the third invoice and includes the total count of invoices in the response:

```bash
curl -v -X GET https://api-m.sandbox.paypal.com/v1/invoicing/invoices?page=3&page_size=4&total_count_required=true\
 -H "Content-Type: application/json"\
 -H "Authorization: Bearer ACCESS-TOKEN"
```
