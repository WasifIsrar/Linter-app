async function StandardCheckoutFlow(workflowCtx, portal) {
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
            "PayPal-Request-Id": Math.floor(Math.random() * 100000000),
            body: {
              "intent": "CAPTURE",
              "purchase_units": [
                  {
                      "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b",
                      "amount": {
                          "currency_code": "USD",
                          "value": "100.00"
                      }
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
      name: "Capture Order",
      stepCallback: async (step2State) => {
        await portal.setConfig((defaultConfig) => {
          return {
            ...defaultConfig,
          };
        });
        window.open(step2State?.["Step 2"]?.data?.links[1].href, "Example", "width=500,height=500");
        return workflowCtx.showEndpoint({
          description: "To successfully capture payment for an order, the buyer must first approve the order or a valid payment_source must be provided in the request. A buyer can approve the order by following the approve URL to which they are redirected to .",
          endpointPermalink: "$e/orders/orders.capture",
          args: {
            id: step2State?.["Step 2"]?.data?.id,
            Prefer: "return=representation",
            "PayPal-Request-Id": Math.floor(Math.random() * 10000000)
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
    "Step 4": {
      name: "Get Order Details",
      stepCallback: async (step2State) => {
        await portal.setConfig((defaultConfig) => {
          return {
            ...defaultConfig,
          };
        });
        return workflowCtx.showEndpoint({
          description: "This endpoint shows details for an order, by ID.",
          endpointPermalink: "$e/orders/orders.get",
          args: {
            id: step2State?.["Step 2"]?.data?.id
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
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
