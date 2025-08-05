async function SampleWorkflow(workflowCtx, portal) {
  return {
    "Step 1": {
      name: "Step 1",
      stepCallback: async () => {
        return workflowCtx.showContent(`# Recipe
PayPal integrations use a client ID and client secret to authenticate API calls:

`);
      },
    },
  };
}
