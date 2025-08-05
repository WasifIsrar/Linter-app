async function AuthorizeAndCaptureFlow(workflowCtx, portal) {
    return {
      "Step 1": {
        name: "Get Access Token",
        stepCallback: async (stepState) => {
          return workflowCtx.showContent(`## Introduction
This guided walkthrough showcases how to create and fetch a payment token.
        
### Getting Started

In order to invoke the API, you will need an Access token.

### Generating an access token

1. Navigate to Step 2
2. Expand the ‘Authentication’ section.
3. Provide the ‘OAuthClientId’ and ‘OAuthClientSecret’.
4. Click ‘Get Token’ Button to add the generated Authentication token to this Portal so you can make API calls.
5. This is a Test Text with this link <a href="#/rest/welcome-to-payrix-pro/api-endpoints/api-keys/overview" target="_blank">TEST TEXT</a>.

CRICINFO WITH BLANK <a href="https://www.espncricinfo.com/" target="_blank">CRICINFO WITH BLANK</a>.

CRICINFO WITHOUT BLANK <a href="https://www.espncricinfo.com/">CRICINFO WITHOUT BLANK</a>.

![Auth GIF](./static/guided-walkthrough-scripts/auth-paypal.gif) `);
        },
      },
      "Step 2": {
        name: "Create Order",
        stepCallback: async (stepState) => {
          await portal.setConfig((defaultConfig) => {
            return {
              ...defaultConfig,
            };
          });
          return workflowCtx.showEndpoint({
            description:
              "This endpoint creates an order. Merchants and partners can add Level 2 and 3 data to payments to reduce risk and payment processing costs.",
            endpointPermalink: "$e/orders/orders.create",
            args:{
              "PayPal-Request-Id": Math.floor(Math.random() * 10000000),
              body: {
                "intent": "AUTHORIZE",
                "purchase_units": [
                    {
                        "description": "Clothing Shop",
                        "amount": {
                            "currency_code": "USD",
                            "value": "25.00",
                            "breakdown": {
                                "item_total": {
                                    "currency_code": "USD",
                                    "value": "25.00"
                                },
                                "shipping": {
                                    "currency_code": "USD",
                                    "value": "0"
                                },
                                "tax_total": {
                                    "currency_code": "USD",
                                    "value": "0"
                                }
                            }
                        },
                        "items": [
                            {
                                "name": "Levis 501",
                                "sku": "5158936",
                                "unit_amount": {
                                    "currency_code": "USD",
                                    "value": "25.00"
                                },
                                "tax": {
                                    "currency_code": "USD",
                                    "value": "0.00"
                                },
                                "quantity": "1"
                            }
                        ]
                    }
                ],
                "payment_source": {
                    "paypal": {
                        "experience_context": {
                            "locale": "en-US",
                            "landing_page": "LOGIN",
                            "return_url": "https://example.com/returnUrl",
                            "cancel_url": "https://example.com/cancelUrl"
                        }
                    }
                }
              }
            },
            verify: (response, setError) => {
              if (response.StatusCode == 200 || response.StatusCode == 201) {
                return true;
              } else {
                setError(
                  "API Call wasn't able to get a valid repsonse. Please try again."
                );
                return false;
              }
            },
          });
        },
      },
      "Step 3": {
        name: "Authorize Order",
        stepCallback: async (step2State) => {
          await portal.setConfig((defaultConfig) => {
            return {
              ...defaultConfig,
            };
          });
          window.open(step2State?.["Step 2"]?.data?.links[1].href, "Example", "width=500,height=500");
          return workflowCtx.showEndpoint({
            description: "This endpoint authorizes payment for an order. To successfully authorize payment for an order, the buyer must first approve the order or a valid payment_source must be provided in the request. A buyer can approve the order upon being redirected to the rel:approve URL that was returned in the HATEOAS links in the create order response.",
            endpointPermalink: "$e/orders/orders.authorize",
            args: {
              id: step2State?.["Step 2"]?.data?.id,
              "PayPal-Request-Id": Math.floor(Math.random() * 10000000),
              Prefer: "return=representation"
            },
            verify: (response, setError) => {
              if (response.StatusCode == 200 || response.StatusCode == 201) {
                return true;
              } else {
                setError(
                  "API Call wasn't able to get a valid repsonse. Please try again."
                );
                return false;
              }
            },
          });
        },
      }
    };
  }
  